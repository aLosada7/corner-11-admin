import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { createTeamSaga, loadStandingsSaga } from './team'; 
import { generatePlayer, fetchPlayers } from './player';

//yield means execute this and wait to finish
export function* watchTeam() {
    yield takeEvery(actionTypes.CREATE_TEAM, createTeamSaga);
    yield takeEvery(actionTypes.LOAD_TEAM_STANDINGS, loadStandingsSaga);
}

export function* watchPlayer() {
    yield takeEvery(actionTypes.GENERATE_PLAYER, generatePlayer);
    yield takeEvery(actionTypes.FETCH_PLAYERS, fetchPlayers);
}

export function* watchNewTeam() {
}