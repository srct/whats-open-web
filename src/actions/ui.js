import {
    ADD_FAVORITE_FACILITY, REMOVE_FAVORITE_FACILITY, SET_ALL_FAVORITES, SET_CAMPUS_REGION, SET_SEARCH_TERM,
    SET_SELECTED_FACILITY, SET_SIDEBAR
} from './action-types';

export const setSidebar = (setOpen) => ({
    type: SET_SIDEBAR,
    setOpen
});

export const setSelectedFacility = (facility) => ({
    type: SET_SELECTED_FACILITY,
    facility
});

export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    term
});

export const setCampusRegion = (campusRegion) => ({
    type: SET_CAMPUS_REGION,
    campusRegion
});

export const addFavoriteFacility = slug => ({
    type: ADD_FAVORITE_FACILITY,
    slug
});

export const removeFavoriteFacility = slug => ({
    type: REMOVE_FAVORITE_FACILITY,
    slug
});

export const setAllFavorites = (favorites) => ({
    type: SET_ALL_FAVORITES,
    favorites
});
