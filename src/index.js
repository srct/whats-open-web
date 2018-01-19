import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import './index.css';
import Layout from './containers/Layout';
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers/index';
import {MuiThemeProvider} from 'material-ui/styles';
import theme from './theme';
import './styles/build/whatsOpen.css';
import 'typeface-roboto';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
const extension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const isProduction = process.env.NODE_ENV === 'production';

const enhance = compose(applyMiddleware(ReduxThunk, routerMiddleware(history)), !isProduction && extension);

if (isProduction) {
    window.dataLayer = window.dataLayer || [];
    const gtag = (args) => {
        window.dataLayer.push(args);
    };
    gtag('js', new Date());
    gtag('config', 'UA-112607180-1');
}

const store = createStore(reducers, enhance);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
                <Layout />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));

registerServiceWorker();
