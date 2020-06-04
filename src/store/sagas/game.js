import axios from '../../axios-manager';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* getGames(action) {
    console.log(action.gameId)
    try {
        const response = yield axios.get(`/api/v1/games`);
        const fetchedGames = response.data.data;
        const previousGames = fetchedGames.filter(game => game.homePoints !== 0);
        const upcomingGames = fetchedGames.filter(game => game.homePoints === 0);
        yield put(actions.fetchGamesSuccess(previousGames, upcomingGames));
    } catch (error) {
        console.log(error)
    }
}

export function* getGame(action) {
    console.log(action.gameId)
    try {
        const response = yield axios.get(`/api/v1/games/${action.gameId}`);
        console.log(response);
        const fetchedGame = response.data.data;
        const game = {
            game: fetchedGame,
            scoreByQuarter: fetchedGame.scoreByQuarter,
            gameActions: fetchedGame.gameActions,
            gameStandings: fetchedGame.gameStandings
        }
        yield put(actions.fetchGameSuccess(game));
    } catch (error) {
        console.log(error)
    }
}


export function* createGame(action) {
    console.log(action.local, action.visitor)
    try {
        axios.defaults.headers.common = {'Authorization': `Bearer ${action.token}`}
        const response = yield axios.post('/api/v1/games', { home: action.local, visitor: action.visitor });
        console.log(response);
        yield put(actions.createGameSuccess());
    } catch (error) {
        console.log(error)
    }
}