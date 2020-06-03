import axios from '../../axios-teams';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* fetchTeamInfoSaga(action) {
    try {
        const response = yield axios.get(`http://localhost:5000/api/v1/teams/${action.teamId}`);
        console.log(response.data);
        yield put(actions.fetchTeamSuccess(response.data.data));

    } catch (error) {
        yield put(actions.loadStandingsFail(error));
    }
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

export function* loadGamesSaga(action) {
    try {
        const response = yield axios.get(`http://localhost:5000/api/v1/teams/${action.teamId}/games`);
        console.log(response.data.data)
        yield put(actions.loadGamesSuccess(response.data.data));

    } catch (error) {
        yield put(actions.loadGamesFail(error));
    }
}