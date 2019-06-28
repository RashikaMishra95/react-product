import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {configureStore} from '../src/helpers/store';
import {BrowserRouter} from 'react-router-dom';
import {history} from "./helpers/history";


ReactDOM.render(
    <Provider store={configureStore}>
        <BrowserRouter history={history}>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*To Make use of Browser Router
1. create a history using createBrowserHistory()
2. pass a props for the main wrapped component as above
3. Thus Every child component will make use by this.props.history.push('/route')
4. If in-turn child component has any other child then
    a) again either pass history as props
    b) or wrap the child component (3rd level) using withRouter
* */

/*
1. Pagination
2. Edit
3. Delete
4. Multi-Single Select
* */
