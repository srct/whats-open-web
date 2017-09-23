import {TOGGLE_DRAWER,SET_SIDEBAR,SET_SEARCH_TERM } from '../actions/action-types'

function isOpen(state=false,action){
    switch (action.type) {
        case TOGGLE_DRAWER:
            return !state
        default:
            return state
    }
}

const drawer = (state={},action) => ({
    isOpen:isOpen(state.isOpen,action)
})

const sidebar = (state={},action) => {
    switch(action.type){
        case SET_SIDEBAR:
            return action.facility
        default:
            return {}
    }
}

const searchbarState = {
    term:'',
}

const search = (state=searchbarState,action) =>{
    switch(action.type){
        case SET_SEARCH_TERM:
            return Object.assign({},state,{
                term:action.term,
            });
        default:
            return state;
    }
}

const ui = (state={},action) =>({
    drawer:drawer(state.drawer,action),
    sidebar:sidebar(state.sidbar,action),
    search: search(state.search,action),
})
export default ui;
