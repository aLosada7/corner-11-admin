import * as actionTypes from './actionTypes';

export const initGeneratedPlayers = (token) => {
    console.log(token)
    return {
        type: actionTypes.GET_GENERATED_PLAYERS,
        token
    }
}

export const initGeneratedPlayersSuccess = (players) => {
    return {
        type: actionTypes.GET_GENERATED_PLAYERS_SUCCESS,
        players
    }
}

export const addPlayerToNewTeam = (player) => {
    return {
        type: actionTypes.ADD_PLAYER_NEW_TEAM,
        player
    }
}

export const removePlayerToNewTeam = (playerId) => {
    return {
        type: actionTypes.REMOVE_PLAYER_NEW_TEAM,
        playerId
    }
}

/**
 * Start creating new team
 * @param {string} token 
 * @param {*} teamData 
 * @param {*} selectedPlayers 
 */
export const createNewTeam = ( token, teamData, selectedPlayers ) => {
    console.log(selectedPlayers)
    return {
        type: actionTypes.CREATE_TEAM,
        token,
        teamData,
        selectedPlayers
    }
};

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