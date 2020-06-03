import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    teams: [],
    teamInfo: {},
    teamPlayers: [],
    standings: [],
    games: []
}

const setTeams = (state, action) => {
    return updateObject(state, {
        teams: action.teams
    });
}

const setTeamInfo = (state, action) => {
    return updateObject(state, {
        teamInfo: action.teamInfo
    });
}

const setTeamPlayers = (state, action) => {
    return updateObject(state, {
        teamPlayers: action.teamPlayers
    });
}

const setStandings = (state, action) => {
    return updateObject(state, {
        standings: action.standings
    });
}

const setGames = (state, action) => {
    return updateObject(state, {
        games: action.games
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TEAMS:
            return setTeams(state, action);
        case actionTypes.FETCH_TEAM_SUCCESS:
            return setTeamInfo(state, action);
        case actionTypes.FETCH_TEAM_PLAYERS_SUCCESS:
            return setTeamPlayers(state, action)
        case actionTypes.LOAD_TEAM_STANDINGS_SUCCESS:
            return setStandings(state, action);
        case actionTypes.LOAD_TEAM_GAMES_SUCCESS:
            return setGames(state, action);
        default:
            return state;
     }
}

export default reducer;