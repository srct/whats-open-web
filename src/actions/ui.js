import {
    ADD_FAVORITE_FACILITY,
    REMOVE_FAVORITE_FACILITY,
    SET_SEARCH_TERM,
    SET_SIDEBAR,
    TOGGLE_DRAWER
} from './action-types';

export const toggleDrawer = () => ({
    type: TOGGLE_DRAWER,
});

export const setSidebar = (facility) => ({
    type: SET_SIDEBAR,
    facility,
});

export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    term,
});

export const addFavoriteFacility = slug => ({
    type: ADD_FAVORITE_FACILITY,
    slug
});

export const removeFavoriteFacility = slug => ({
    type: REMOVE_FAVORITE_FACILITY,
    slug
});

