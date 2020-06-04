import axios from '../../axios-manager';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* generatePlayer(action) {
    try {
        const player = yield action.playerData;
        yield player.team = action.teamId;
        const response = yield axios.post( '/players.json', action.playerData)
        yield put(actions.generatePlayerSuccess( response.data.name, action.playerData ));
    } catch (error) {
        yield put(actions.generatePlayerFail( error ));
    }
};

export function* fetchPlayers(action) {
    try {
        const response = yield axios.get(`/api/v1/players`);
        console.log(response);
        const fetchedPlayers = response.data.data;
        yield put(actions.fetchPlayersSuccess(fetchedPlayers));
    } catch (error) {
        yield put(actions.fetchPlayersFail( error ));
    }
}

export function* fetchTeamPlayers(action) {
    try {
        const response = yield axios.get(`/api/v1/teams/${action.teamId}/players`);
        console.log(response);
        const fetchedTeamPlayers = response.data.data;
        yield put(actions.fetchTeamPlayersSuccess(fetchedTeamPlayers));
    } catch (error) {
        yield put(actions.fetchTeamPlayersFail( error ));
    }
}