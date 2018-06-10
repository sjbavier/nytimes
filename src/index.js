import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import './index.css'
// components takes precedence over default styles.

// Import components here
import App from './App'

// creating with middleware, redux and router
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import  createSagaMiddleware from 'redux-saga'
import { Router, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import history from './components/history/history'

// Import combined reducer and saga
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

// for production environment cache ready https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
import registerServiceWorker from './registerServiceWorker'

// initiate sagaMiddleware
const sagaMiddleware = createSagaMiddleware()

// eslint disable
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

// create store and the combined reducers from IndexReducer
const store = createStore( 
    IndexReducer, 
    composeSetup(applyMiddleware(sagaMiddleware))
);

// Initiate Index Saga
sagaMiddleware.run(IndexSagas);

// Setup top level router for React Router
let root = document.getElementById('root')

ReactDOM.render(
    <Provider store={ store }>
          <BrowserRouter>
                <Router history={ history }>
                      <Switch>
                            <Route path="/" component={ App } />
                            <Redirect to="/" />
                      </Switch>
                </Router>
          </BrowserRouter>
    </Provider>,
    root  
 )
 
 // see documentation for service workers
 registerServiceWorker();
 