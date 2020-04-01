import axios from '../../axios-teams';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* createTeamSaga(action) {
    try {
        const response = yield axios.post( '/teams.json', action.teamData);
        yield put(actions.generateTeamSuccess( response.data.name, action.teamData));
        for(let teamPlayer in action.players) {
            let player = {
                ...action.players[teamPlayer],
                teamId: response.data.name
            }
            try {
                const response = yield axios.post( '/players.json', player)
                yield put(actions.generatePlayerSuccess( response.data.name, player ));
            } catch (error) {
                yield put(actions.generatePlayerFail( error ));
            }
        }
    } catch (error) {
        yield put(actions.generateTeamFailed(error));
    }
    yield put(actions.endGenerateTeam());
}

export function* loadStandingsSaga(action) {
    try {
        console.log(action.league)
        const response = yield axios.get('/teams.json?orderBy="country"&equalTo="' + action.league + '"');
        const leagueTeams = [];
        for (let key in response.data) {
            leagueTeams.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.loadStandingsSuccess(leagueTeams));

    } catch (error) {
        yield put(actions.loadStandingsFail(error));
    }
}