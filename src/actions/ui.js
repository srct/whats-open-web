import { TOGGLE_DRAWER,SET_SIDEBAR,SET_SEARCH_TERM } from './action-types';

export const toggleDrawer =  () => ({
    type:TOGGLE_DRAWER,
});

export const setSidebar = (facility) => ({
    type:SET_SIDEBAR,
    facility,
})

export const setSearchTerm = (term) => {
    return {
        type:SET_SEARCH_TERM,
        term,
    }
}

