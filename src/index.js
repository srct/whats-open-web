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
import  blue  from 'material-ui/colors/blue';
// import  fullWhite  from 'material-ui/colors/common';
// import  grey  from 'material-ui/colors/grey';
import  amber  from 'material-ui/colors/amber';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
const extension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if(extension){
    const enhance = compose(
        applyMiddleware(ReduxThunk,routerMiddleware(history))
        ,extension);
}
const enhance = compose(
        applyMiddleware(ReduxThunk,routerMiddleware(history)));
const store = createStore(reducers,enhance);

const theme = createMuiTheme({
    palette: {primary:blue,secondary:green,warn:amber,error:red,type:'light'}
});

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
                <Layout />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
