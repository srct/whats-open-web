import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import './index.css';
import Layout from './containers/Layout';
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware} from 'react-router-redux'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers/index';
import { MuiThemeProvider,createMuiTheme,createPalette } from 'material-ui/styles';
import theme from './theme';
import  blue  from 'material-ui/colors/blue';
// import  fullWhite  from 'material-ui/colors/common';
// import  grey  from 'material-ui/colors/grey';
import  amber  from 'material-ui/colors/amber';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
const extension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let enhance;

if(extension) {
    enhance = compose(
        applyMiddleware(ReduxThunk,routerMiddleware(history))
        ,extension);
} else {
    enhance = compose(
        applyMiddleware(ReduxThunk,routerMiddleware(history)));
}

const store = createStore(reducers,enhance);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme={createMuiTheme(theme)}>
                <Layout />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
