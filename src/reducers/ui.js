import {TOGGLE_DRAWER,SET_SIDEBAR } from '../actions/action-types'

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
const ui = (state={},action) =>({
    drawer:drawer(state.drawer,action),
    sidebar:sidebar(state.sidbar,action),
})
export default ui;
