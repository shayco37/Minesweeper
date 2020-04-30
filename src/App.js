import React from 'react';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { gameActionsMiddleware } from './middlewares';
import { WelcomePage, SetupPage, GamePage } from './pages';
import * as reducers from './reducers';
import './App.css';

export default function (){
    const rootReducers = combineReducers({
        ...reducers,
    });

    const store = createStore(rootReducers,
                {},
                              compose(
                                    applyMiddleware(
                                        gameActionsMiddleware
                                    ),
                                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                              ));

    return (
            <Provider store={store}>
                <BrowserRouter>
                    <Route path={'/setup'} component={SetupPage} exact/>
                    <Route path={'/game'} component={GamePage} exact/>
                    <Route path={'/'} component={WelcomePage}  exact/>
                </BrowserRouter>
            </Provider>
    );
}
