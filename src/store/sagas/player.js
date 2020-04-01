import axios from '../../axios-teams';
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
        const response = yield axios.get('/players.json?orderBy="teamId"&equalTo="' + action.userId + '"');
        const fetchedTeamPlayers = [];
        for (let key in response.data) {
            fetchedTeamPlayers.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchPlayersSuccess(fetchedTeamPlayers));
    } catch (error) {
        yield put(actions.fetchPlayersFail( error ));
    }
}