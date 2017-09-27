import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ui from './ui';
import {facilities} from './api'

const reducers = combineReducers({
    router:routerReducer,
    ui,
<<<<<<< HEAD
    facilities,
})
=======
    facilities
});
>>>>>>> c3abe9389ebadac8437111d3fa63f4ac278bb160

export default reducers;
