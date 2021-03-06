import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import App from './components/App';
import authReducer from './store/reducers/auth';
import teamReducer from './store/reducers/team';
import playerReducer from './store/reducers/players';
import newTeamReducer from './store/reducers/newTeam';
import reportReducer from './store/reducers/report';
import gameReducer from './store/reducers/game';
import { watchTeam, watchPlayer, watchNewTeam, watchGame } from './store/sagas';
import { CssBaseline } from '@material-ui/core';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    teams: teamReducer,
    players: playerReducer,
    newTeam: newTeamReducer,
    report: reportReducer,
    game: gameReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchTeam);
sagaMiddleware.run(watchPlayer);
sagaMiddleware.run(watchNewTeam);
sagaMiddleware.run(watchGame);


const app = (
    <Provider store={store}>  
        <CssBaseline />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
