import * as actionTypes from './actionTypes';
import axios from '../../axios-teams';

export const generateTeamSuccess = (id, teamData) => {
    return {
        type: actionTypes.CREATE_TEAM_SUCCESS,
        teamId: id,
        teamData: teamData
    }
}

export const generateTeamFailed = (error) => {
    return {
        type: actionTypes.CREATE_TEAM_FAIL,
        error: error
    }
}

export const endGenerateTeam = () => {
    return {
        type: actionTypes.END_CREATE_TEAM,
    }
};

export const createNewTeam = ( teamData, teamPlayers ) => {
    return {
        type: actionTypes.CREATE_TEAM,
        teamData: teamData,
        players: teamPlayers
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

export const setAllTeams = (teams) => {
    return {
        type: actionTypes.SET_TEAMS,
        teams: teams
    }
}

export const initTeams = (userId) => {
    return dispatch => {
        axios.get('/teams.json?orderBy="userId"&equalTo="' + userId + '"')
            .then(response => {
                console.log(response);
                const fetchedTeams = [];
                for (let key in response.data) {
                    fetchedTeams.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(setAllTeams(fetchedTeams));
            })
            .catch(err => {
                console.log(err)
            });
    }
}