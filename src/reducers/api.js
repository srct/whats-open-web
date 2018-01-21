import {GET_ALERTS, GET_FACILITIES, SET_ALERTS, SET_FACILITIES, SORT_BY_FAVORITES} from '../actions/action-types';
import cloneDeep from 'lodash/cloneDeep';

const defaultFacilityState = {
    isLoading: false,
    data: []
};

export const facilities = (state = defaultFacilityState, action, ui) => {
    const sortFunc = (a, b) => {
        const favoriteCheck = ui.favorites.includes(b.slug) - ui.favorites.includes(a.slug);

        if (favoriteCheck !== 0) {
            return ui.favorites.includes(b.slug) - ui.favorites.includes(a.slug);
        }

        if (a.slug < b.slug) {
            return -1;
        }

        if (a.slug > b.slug) {
            return 1;
        }

        return 0;
    };

    switch (action.type) {
        case GET_FACILITIES:
            return Object.assign({}, state, {
                isLoading: true
            });
        case SET_FACILITIES:
            return Object.assign({}, state, {
                data: action.facilities.sort(sortFunc),
                isLoading: false
            });
        case SORT_BY_FAVORITES:
            const newData = cloneDeep(state.data);
            return Object.assign({}, state, {
                data: newData.sort(sortFunc)
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
        default:
            return state;
    }
};
