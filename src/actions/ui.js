import { TOGGLE_DRAWER,SET_SIDEBAR,SET_SEARCH_TERM,SET_FILTERED_LIST } from './action-types';

export const toggleDrawer =  () => ({
    type:TOGGLE_DRAWER,
});

export const setSidebar = (facility) => ({
    type:SET_SIDEBAR,
    facility,
})

export const setSearchTerm = (term) => ({
    type:SET_SEARCH_TERM,
    term,
})

