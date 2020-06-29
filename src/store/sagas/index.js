import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { getGeneratedPlayers, createTeamSaga } from './newTeam';
import { loadStandingsSaga, fetchTeamInfoSaga, loadGamesSaga } from './team'; 
import { fetchPlayers, fetchTeamPlayers } from './player';
import { getGames, getGame, createGame, simulateGame } from './game';

//yield means execute this and wait to finish
export function* watchTeam() {
    yield takeEvery(actionTypes.FETCH_TEAM, fetchTeamInfoSaga);
    yield takeEvery(actionTypes.FETCH_TEAM, loadStandingsSaga);
    yield takeEvery(actionTypes.FETCH_TEAM, loadGamesSaga);
}

export function* watchPlayer() {
    yield takeEvery(actionTypes.FETCH_PLAYERS, fetchPlayers);
    yield takeEvery(actionTypes.FETCH_TEAM, fetchTeamPlayers);
}

export function* watchNewTeam() {
    yield takeEvery(actionTypes.GET_GENERATED_PLAYERS, getGeneratedPlayers);
    yield takeEvery(actionTypes.CREATE_TEAM, createTeamSaga);
}

export function* watchGame() {
    yield takeEvery(actionTypes.FETCH_GAMES, getGames);
    yield takeEvery(actionTypes.FETCH_GAME, getGame);
    yield takeEvery(actionTypes.CREATE_GAME, createGame);
    yield takeEvery(actionTypes.SIMULATE_GAME, simulateGame);
}