import {
    ADD_FAVORITE_FACILITY,
    REMOVE_FAVORITE_FACILITY,
    SET_SEARCH_TERM,
    TOGGLE_SIDEBAR,
    TOGGLE_SIDEBAR_MAP,
    SET_ALL_FAVORITES, SET_SELECTED_FACILITY, SET_SIDEBAR
} from './action-types';

export const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR,
});

export const setSidebar = (setOpen) => ({
    type: SET_SIDEBAR,
    setOpen,


});

export const toggleSidebarMap = () => ({
   type: TOGGLE_SIDEBAR_MAP,
});

export const setSelectedFacility = (facility) => ({
   type: SET_SELECTED_FACILITY,
   facility
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


