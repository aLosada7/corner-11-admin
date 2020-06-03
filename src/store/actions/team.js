import * as actionTypes from './actionTypes';
import axios from '../../axios-teams';

export const fetchTeam = (teamId) => {
    return {
        type: actionTypes.FETCH_TEAM,
        teamId
    }
}

export const fetchTeamSuccess = (teamInfo) => {
    return {
        type: actionTypes.FETCH_TEAM_SUCCESS,
        teamInfo
    }
};

export const fetchTeamFail = () => {
    return {
        type: actionTypes.FETCH_TEAM_FAIL
    }
};

export const fetchTeamPlayersSuccess = (teamPlayers) => {
    return {
        type: actionTypes.FETCH_TEAM_PLAYERS_SUCCESS,
        teamPlayers
    }
};

export const fetchTeamPlayersFail = () => {
    return {
        type: actionTypes.FETCH_TEAM_PLAYERS_FAIL
    }
};

export const loadStandings = (country) => {
    return {
        type: actionTypes.LOAD_TEAM_STANDINGS,
        league: country
    }
}

export const loadStandingsSuccess = (teamStandings) => {
    return {
        type: actionTypes.LOAD_TEAM_STANDINGS_SUCCESS,
        standings: teamStandings
    }
};

export const loadStandingsFail = () => {
    return {
        type: actionTypes.LOAD_TEAM_STANDINGS_FAIL,
    }
};

export const loadGamesSuccess = (teamGames) => {
    return {
        type: actionTypes.LOAD_TEAM_GAMES_SUCCESS,
        games: teamGames
    }
};

export const loadGamesFail = () => {
    return {
        type: actionTypes.LOAD_TEAM_GAMES_FAIL,
    }
};

export const setAllTeams = (teams) => {
    return {
        type: actionTypes.SET_TEAMS,
        teams: teams
    }
}

export const fetchTeams = () => {
    return dispatch => {
        axios.get('http://localhost:5000/api/v1/teams')
            .then(response => {
                const fetchedTeams = response.data.data;
                console.log(fetchedTeams);
                dispatch(setAllTeams(fetchedTeams));
            })
            .catch(err => {
                console.log(err)
            });
    }
}