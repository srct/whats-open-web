import {GET_FACILITIES, SET_FACILITIES} from './action-types'

export const apiTest = () => {
    return (dispatch) => {

        return fetch('/api/facilities', {'method': 'get'}).then((res) => {
            return res.json()
        }, (error) => {
            console.log(error)
        }).then(json => {
            console.log(json[0])
        })
    }
};

export const getFacilities = () => dispatch => {
    dispatch({
        type: GET_FACILITIES
    });

    //A request for all the open facilities
    const requestOpen = new Request('https://api.srct.gmu.edu/whatsopen/v2/facilities/?open_now=True&format=json', {
        method: 'GET'
    });

    //A request for all the closed facilities
    const requestClosed = new Request('https://api.srct.gmu.edu/whatsopen/v2/facilities/?closed_now=True&format=json', {
        method: 'GET'
    });

    /**
     * Merges the two promises (returned from the fetch operations) in order to dispatch only when both the
     * open and closed requests are completed.
     */
    return Promise.all([
        fetch(requestOpen)
            .then(res => {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error(res.statusText);
                }
                return res.json();
            }),
        fetch(requestClosed)
            .then(res => {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })])
        .then(facilitiesByStatus => { //facilitiesByStatus is in the format: [[openFacilities], [closedFacilities]]

            /**
             * Iterates over the open and closed facility arrays and adds the isOpen property which drives styling
             * in the view.
             */
            facilitiesByStatus[0].forEach(openFacility => {
                openFacility.isOpen = true;
            });

            facilitiesByStatus[1].forEach(closedFacility => {
                closedFacility.isOpen = false;
            });

            //Merges the two facility status arrays and sorts by alphabetical order.
            const allFacilities = facilitiesByStatus[0].concat(facilitiesByStatus[1])
                .sort((a, b) => a.facility_name > b.facility_name ? 1 : -1);
            dispatch(setFacilities(JSON.stringify(allFacilities)));
        });
};

export const setFacilities = (facilities) => {
    localStorage.setItem('facilities', facilities);
    return {
        type: SET_FACILITIES,
        facilities: JSON.parse(facilities)
    }
};