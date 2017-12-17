import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ui from './ui';
import {facilities} from './api'

const reducers = (state = {},action) => ({
    router:routerReducer(state.router,action),
    ui:ui(state.ui,action),
    facilities:facilities(state.facilities,action,state.ui),
})

export default reducers;
