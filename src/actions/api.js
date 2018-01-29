import {GET_ALERTS, GET_FACILITIES, SET_ALERTS, SET_FACILITIES, SORT_FACILITY_CARDS, VIEW_ALERT } from './action-types';

const API_GET_FACILITIES = 'https://api.srct.gmu.edu/whatsopen/v2/facilities/';
const API_GET_ALERTS = 'https://api.srct.gmu.edu/whatsopen/v2/alerts/?ordering=urgency_tag';
// SHOP MASON ONLY
//const API_GET_FACILITIES = 'https://api.srct.gmu.edu/whatsopen/v2/facilities/?facility_classifier=shopmason';
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
        //Empty
    }

    return {
        type: SET_FACILITIES,
        facilities: JSON.parse(facilities)
    };
};

export const sortFacilityCards = () => ({
    type: SORT_FACILITY_CARDS
});

export const getAlerts = () => (dispatch) => {
    dispatch({
        type: GET_ALERTS
    });

    const request = new Request(API_GET_ALERTS, {
        method: 'GET'
    });

    return fetch(request)
        .then((res) => {
            if (res.status < 200 || res.status >= 300) {
                throw new Error(res.statusText);
            }

            return res.json();
        }).then((json) => {
            dispatch(setAlerts(json));
        });
};

export const setAlerts = (alerts) => {
    const viewedAlerts = JSON.parse(localStorage.getItem('viewedAlerts'));

    if (viewedAlerts) {
        alerts.forEach((alert) => {
            alert['viewed'] = viewedAlerts.includes(alert.id);
        });
    }

    return {
        type: SET_ALERTS,
        alerts: alerts
    };
};

export const viewAlert = (alert) => {
    try {
        let viewedAlerts = JSON.parse(localStorage.getItem('viewedAlerts'));
        if (!viewedAlerts) {
            viewedAlerts = [];
        }

        if (!viewedAlerts.includes(alert.id)) {
            viewedAlerts.push(alert.id);
        }

        localStorage.setItem('viewedAlerts', JSON.stringify(viewedAlerts));
    } catch (e) {
        //Empty
    }

    return {
        type: VIEW_ALERT,
        alert
    };
};
