import {TOGGLE_DRAWER } from '../actions/action-types'

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
const ui = (state={},action) =>({
    drawer:drawer(state.drawer,action),
})
export default ui;
