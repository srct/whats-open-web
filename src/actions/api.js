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

    const request = new Request('https://api.srct.gmu.edu/whatsopen/v2/facilities/', {
        method: 'GET'
    });

    return fetch(request)
        .then(res => {
            if (res.status < 200 || res.status >= 300) {
                throw new Error(res.statusText);
            }

            return res.json();
        })
        .then(json => {
            dispatch(setFacilities(JSON.stringify(json)));
        });
};

export const setFacilities = (facilities) => {
    localStorage.setItem('facilities', facilities);
    return {
        type: SET_FACILITIES,
        facilities: JSON.parse(facilities)
    }
};