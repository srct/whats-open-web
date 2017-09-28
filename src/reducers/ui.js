import {
    TOGGLE_DRAWER, SET_SIDEBAR, SET_SEARCH_TERM, SET_FILTERED_LIST,
    ADD_FAVORITE_FACILITY, REMOVE_FAVORITE_FACILITY,SET_ALL_FAVORITES
} from '../actions/action-types'

function isOpen(state=false,action){
    switch (action.type) {
        case TOGGLE_DRAWER:
            return !state;
        default:
            return state;
    }
}

const drawer = (state={},action) => ({
    isOpen:isOpen(state.isOpen,action)
});

const sidebar = (state={},action) => {
    switch(action.type){
        case SET_SIDEBAR:
            return action.facility;
        default:
            return {};
    }
};

const searchbarState = {
    term:'',
    filteredList:[],
};

const filterList = (state) =>{

};
const search = (state=searchbarState,facilities=[],action) =>{
    switch(action.type){
        case SET_SEARCH_TERM:
            return Object.assign({},state,{
                term:action.term,
            });
        default:
            return state;
    }
};

//TODO: Favorites should be stored in a cookie, not in the redux store.
const favorites = (state = [], action) => {
    let newState;
    switch(action.type) {
        case ADD_FAVORITE_FACILITY:
            newState = [...state,action.slug]
            localStorage.setItem('favorites',JSON.stringify(newState))
            return newState;
        case REMOVE_FAVORITE_FACILITY:
            newState = state.filter(slug => slug !== action.slug); 
            localStorage.setItem('favorites',JSON.stringify(newState))
            return newState;
        case SET_ALL_FAVORITES:
            return action.favorites;
        default:
            return state;
    }
};


const ui = (state={},action) =>({
    drawer:drawer(state.drawer,action),
    sidebar:sidebar(state.sidebar,action),
    search: search(state.search,state.facilities,action),
    favorites: favorites(state.favorites, action),
});
export default ui;
