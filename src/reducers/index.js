import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ui from './ui';

const reducers = combineReducers({
    router:routerReducer,
    ui
})

export default reducers;
