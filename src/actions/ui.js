import {
    ADD_FAVORITE_FACILITY,
    REMOVE_FAVORITE_FACILITY,
    SET_SEARCH_TERM,
    SET_SIDEBAR,
    TOGGLE_SIDEBAR,
    SET_ALL_FAVORITES
} from './action-types';

export const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR,
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

export const setAllFavorites = (favorites) => ({
    type: SET_ALL_FAVORITES,
    favorites,
})


