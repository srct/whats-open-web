import {GET_FACILITIES, SET_FACILITIES, SORT_BY_FAVORITES} from './action-types';

const API_GET_FACILITIES = 'https://api.srct.gmu.edu/whatsopen/v2/facilities/';

export const getFacilities = () => (dispatch) => {
    dispatch({
        type: GET_FACILITIES
    });

    const request = new Request(API_GET_FACILITIES, {
        method: 'GET'
    });

    return fetch(request)
        .then((res) => {
            if (res.status < 200 || res.status >= 300) {
                throw new Error(res.statusText);
            }

            return res.json();
        }).then((json) => {
            dispatch(setFacilities(JSON.stringify(json)));
        });
};

export const setFacilities = (facilities) => {
    try {
        localStorage.setItem('facilities', facilities);
    } catch (e) {
        console.error('Set localstorage fail for facilities.');
    }
    return {
        type: SET_FACILITIES,
        facilities: JSON.parse(facilities)
    };
};

export const sortByFavorites = () => ({
    type: SORT_BY_FAVORITES
});