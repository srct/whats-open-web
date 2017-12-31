import {
    ADD_FAVORITE_FACILITY, REMOVE_FAVORITE_FACILITY, SET_ALL_FAVORITES, SET_CAMPUS_REGION, SET_SEARCH_TERM,
    SET_SELECTED_FACILITY, SET_SIDEBAR
} from '../actions/action-types';

const selectedFacility = (state = {}, action) => {
    switch (action.type) {
        case SET_SELECTED_FACILITY:
            return Object.assign({}, action.facility);
        default:
            return state;
    }
};

const sidebarDefault = {
    isOpen: false
};

const sidebar = (state = sidebarDefault, action) => {
    switch (action.type) {
        case SET_SIDEBAR:
            return Object.assign({}, state, {
                isOpen: action.setOpen
            });
        default:
            return state;
    }
};

const searchbarState = {
    term: '',
    campusRegion: 'fairfax',
    filteredList: []
};

const search = (state = searchbarState, facilities = [], action) => {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return Object.assign({}, state, {
                term: action.term
            });
        case SET_CAMPUS_REGION:
            return Object.assign({}, state, {
                campusRegion: action.campusRegion
            });
        default:
            return state;
    }
};

const favorites = (state = [], action) => {
    let newState;
    switch (action.type) {
        case ADD_FAVORITE_FACILITY:
            newState = [...state, action.slug];
            localStorage.setItem('favorites', JSON.stringify(newState));
            return newState;
        case REMOVE_FAVORITE_FACILITY:
            newState = state.filter((slug) => slug !== action.slug);
            localStorage.setItem('favorites', JSON.stringify(newState));
            return newState;
        case SET_ALL_FAVORITES:
            return action.favorites;
        default:
            return state;
    }
};


const ui = (state = {}, action) => ({
    selectedFacility: selectedFacility(state.selectedFacility, action),
    sidebar: sidebar(state.sidebar, action),
    search: search(state.search, state.facilities, action),
    favorites: favorites(state.favorites, action)
});

export default ui;
