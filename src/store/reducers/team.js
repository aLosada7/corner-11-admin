import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    teams: [],
    teamPlayers: [],
    standings: [],
    loading: false
}

const setTeams = (state, action) => {
    return updateObject(state, {
        teams: action.teams
    });
}

const setStandings = (state, action) => {
    return updateObject(state, {
        standings: action.standings
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TEAMS:
            return setTeams(state, action);
        case actionTypes.CREATE_TEAM: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.END_CREATE_TEAM: {
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.CREATE_TEAM_SUCCESS: {
            const newTeam = updateObject(action.teamData, {
                id: action.teamId
            });
            console.log(newTeam);
            console.log(state.teams)
            return updateObject(state, {
                teams: state.teams.concat(newTeam)
            })
        }
        case actionTypes.CREATE_TEAM_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.LOAD_TEAM_STANDINGS_SUCCESS:
            return setStandings(state, action);
        default:
            return state;
     }
}

export default reducer;