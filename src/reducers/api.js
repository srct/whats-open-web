import {GET_ALERTS, GET_FACILITIES, SET_ALERTS, SET_FACILITIES, SORT_FACILITY_CARDS, VIEW_ALERT} from '../actions/action-types';
import cloneDeep from 'lodash/cloneDeep';
import facilityUtils from '../utils/facilityUtils';
const defaultFacilityState = {
    isLoading: false,
    data: []
};

export const facilities = (state = defaultFacilityState, action, ui) => {
    const facilitySort = (a, b) => {
        const favoriteCheck = ui.favorites.includes(b.slug) - ui.favorites.includes(a.slug);

        if (favoriteCheck !== 0) {
            return favoriteCheck;
        }
        const openCheck = facilityUtils.isFacilityOpen(b) - facilityUtils.isFacilityOpen(a);

        if (openCheck !== 0) {
            return openCheck;
        }

        if (a.facility_name < b.facility_name) {
            return -1;
        }

        if (a.facility_name > b.facility_name) {
            return 1;
        }


        return 0;
    };

    const newData = cloneDeep(state.data);
    switch (action.type) {
        case GET_FACILITIES:
            return Object.assign({}, state, {
                isLoading: true
            });
        case SET_FACILITIES:
            return Object.assign({}, state, {
                data: action.facilities.sort(facilitySort),
                isLoading: false
            });
        case SORT_FACILITY_CARDS:
            return Object.assign({}, state, {
                data: newData.sort(facilitySort)
            });
        default:
            return state;
    }
};

export const alerts = (state = [], action) => {
    switch (action.type) {
        case GET_ALERTS:
            return state;
        case SET_ALERTS:
            return [...state, ...action.alerts];
        case VIEW_ALERT:
            const index = state.findIndex((alert) => alert.id === action.alert.id);

            const alert = cloneDeep(state[index]);
            alert.viewed = true;

            const stateClone = state.slice();
            stateClone[index] = alert;

            return stateClone;
        default:
            return state;
    }
};
