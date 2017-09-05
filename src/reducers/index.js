import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ui from './ui';
import {facilities} from './api'

const reducers = combineReducers({
    router:routerReducer,
    ui,
    facilities
})

export default reducers;
