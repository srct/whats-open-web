import {routerReducer} from 'react-router-redux';
import ui from './ui';
import {facilities, alerts} from './api';

const reducers = (state = {}, action) => ({
    router: routerReducer(state.router, action),
    ui: ui(state.ui, action),
    facilities: facilities(state.facilities, action, state.ui),
    alerts: alerts(state.alerts, action)
});

export default reducers;
