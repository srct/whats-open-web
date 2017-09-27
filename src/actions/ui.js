<<<<<<< HEAD
import { TOGGLE_DRAWER,SET_SIDEBAR,SET_SEARCH_TERM } from './action-types';
=======
import {
    ADD_FAVORITE_FACILITY,
    REMOVE_FAVORITE_FACILITY,
    SET_SEARCH_TERM,
    SET_SIDEBAR,
    TOGGLE_DRAWER
} from './action-types';
>>>>>>> c3abe9389ebadac8437111d3fa63f4ac278bb160

export const toggleDrawer = () => ({
    type: TOGGLE_DRAWER,
});

export const setSidebar = (facility) => ({
    type: SET_SIDEBAR,
    facility,
});

<<<<<<< HEAD
export const setSearchTerm = (term) => {
    return {
        type:SET_SEARCH_TERM,
        term,
    }
}
=======
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
>>>>>>> c3abe9389ebadac8437111d3fa63f4ac278bb160

