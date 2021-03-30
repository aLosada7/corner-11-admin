import axios from '../../axios-manager';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* getGames(action) {
    try {
        const response = yield axios.get(`/api/v1/games`);
        const fetchedGames = response.data.data;
        const previousGames = fetchedGames.filter(game => game.homePoints !== 0);
        const upcomingGames = fetchedGames.filter(game => game.homePoints === 0);
        yield put(actions.fetchGamesSuccess(previousGames, upcomingGames));
    } catch (error) {
        // TODO launch error action
    }
}

export function* getGame(action) {
    try {
        const response = yield axios.get(`/api/v1/games/${action.gameId}`);
        const fetchedGame = response.data.data;
        const game = {
            game: fetchedGame,
            scoreByQuarter: fetchedGame.scoreByQuarter,
            gameActions: fetchedGame.gameActions,
            gameStandings: fetchedGame.gameStandings
        }
        yield put(actions.fetchGameSuccess(game));
    } catch (error) {
        // TODO launch error action
    }
}


export function* createGame(action) {
    try {
        axios.defaults.headers.common = {'Authorization': `Bearer ${action.token}`}
        const response = yield axios.post('/api/v1/games', { home: action.local, visitor: action.visitor });
        yield put(actions.createGameSuccess());
    } catch (error) {
        // TODO launch error action
    }
}

export function* simulateGame(action) {
    console.log('gameId: ', action.gameId)
    try {
        axios.defaults.headers.common = {'Authorization': `Bearer ${action.token}`}
        const response = yield axios.put(`/api/v1/games/${action.gameId}/simulate`);
        const fetchedGame = response.data.data;
        const game = {
            game: fetchedGame,
            scoreByQuarter: fetchedGame.scoreByQuarter,
            gameActions: fetchedGame.gameActions,
            gameStandings: fetchedGame.gameStandings
        }
        yield put(actions.simulateGameSuccess(game));
    } catch (error) {
        // TODO launch error action
    }
}