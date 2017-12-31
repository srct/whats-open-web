import {GET_FACILITIES, SET_FACILITIES, SORT_BY_FAVORITES} from '../actions/action-types';
import cloneDeep from 'lodash/cloneDeep';

const defaultState = {
    isLoading: false,
    data: []
};

export const facilities = (state = defaultState, action, ui) => {
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
