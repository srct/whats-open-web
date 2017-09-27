<<<<<<< HEAD
import {TOGGLE_DRAWER,SET_SIDEBAR,SET_SEARCH_TERM } from '../actions/action-types'
=======
import {
    TOGGLE_DRAWER, SET_SIDEBAR, SET_SEARCH_TERM, SET_FILTERED_LIST,
    ADD_FAVORITE_FACILITY, REMOVE_FAVORITE_FACILITY
} from '../actions/action-types'
>>>>>>> c3abe9389ebadac8437111d3fa63f4ac278bb160

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
<<<<<<< HEAD
}

const search = (state=searchbarState,action) =>{
=======
    filteredList:[],
};

const filterList = (state) =>{

};
const search = (state=searchbarState,facilities=[],action) =>{
>>>>>>> c3abe9389ebadac8437111d3fa63f4ac278bb160
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
    switch(action.type) {
        case ADD_FAVORITE_FACILITY:
            return [...state, action.slug];
        case REMOVE_FAVORITE_FACILITY:
            return state.filter(slug => slug !== action.slug);
        default:
            return state;
    }
};


const ui = (state={},action) =>({
    drawer:drawer(state.drawer,action),
<<<<<<< HEAD
    sidebar:sidebar(state.sidbar,action),
    search: search(state.search,action),
})
=======
    sidebar:sidebar(state.sidebar,action),
    search: search(state.search,state.facilities,action),
    favorites: favorites(state.favorites, action),
});
>>>>>>> c3abe9389ebadac8437111d3fa63f4ac278bb160
export default ui;
