import axios from '../../axios-manager';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* getGeneratedPlayers(action) {
    try {
        console.log(action.token)
        axios.defaults.headers.common = {'Authorization': `Bearer ${action.token}`}
        const response = yield axios.get(`/api/v1/players/newplayers`);
        console.log(response);
        const fetchedPlayers = response.data.data;
        yield put(actions.initGeneratedPlayersSuccess(fetchedPlayers));
    } catch (error) {
        yield put(actions.fetchPlayersFail( error ));
    }
}

export function* createTeamSaga(action) {
    try {
        axios.defaults.headers.common = {'Authorization': `Bearer ${action.token}`}
        const response = yield axios.post( '/api/v1/teams', action.teamData);
        let teamData = response.data;
        yield put(actions.generateTeamSuccess( teamData.data._id, action.teamData));
        /*const competition = {
            id: "sp1",
            wins: 0,
            losses: 0,
            streak: 'W0',
            winPercentage: '0',
            team: response.data.name,
        }
        console.log(competition);
        try {
            const response2 = yield axios.post( '/competitions.json', competition);
            
            console.log(response2);
            //yield put(actions.generatePlayerSuccess( response.data.name, player ));
        } catch (error) {
            //yield put(actions.generatePlayerFail( error ));
        }*/
        console.log(action.selectedPlayers)
        for(let teamPlayer of action.selectedPlayers) {
            console.log(teamPlayer)
            let player = {
                ...teamPlayer,
                transferable: false
            }
            try {
                const response2 = yield axios.post( `/api/v1/teams/${teamData.data._id}/players`, player)
                //yield put(actions.generatePlayerSuccess( response2.data.name, player ));
            } catch (error) {
                //yield put(actions.generatePlayerFail( error ));
            }
        }
        yield put(actions.endGenerateTeam());
    } catch (error) {
        yield put(actions.generateTeamFailed(error));
    }
}