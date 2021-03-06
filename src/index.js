import React from 'react';
import ReactDOM from 'react-dom';
import ReactPiwik from 'react-piwik';
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
import './styles/whatsOpen.scss';
import 'typeface-roboto';
import '../public/manifest.json';
import '../public/favicon.png';
import '../public/apple-app-site-association';

const piwik = new ReactPiwik({
    url: 'matomo.srct.gmu.edu/',
    siteId: 2,
    trackErrors: true,
    enableLinkTracking: true,
    trackDocumentTitle: true
});

// Create a history of your choosing (we're using a browser history in this case)
const history = piwik.connectToHistory(createHistory());
// const history = createHistory();
const extension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const isProduction = process.env.NODE_ENV === 'production';

let enhance;
if (isProduction || !extension) {
    enhance = compose(applyMiddleware(ReduxThunk, routerMiddleware(history)));
} else {
    enhance = compose(applyMiddleware(ReduxThunk, routerMiddleware(history)), extension);
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
