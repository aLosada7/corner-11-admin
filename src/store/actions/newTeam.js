import * as actionTypes from './actionTypes';

export const initGeneratedPlayers = (generatedPlayers) => {
    return {
        type: actionTypes.SET_GENERATED_PLAYERS,
        players: generatedPlayers
    }
}

export const addPlayerToNewTeam = (playerId) => {
    return {
        type: actionTypes.ADD_PLAYER_NEW_TEAM,
        id: playerId
    }
}

export const removePlayerToNewTeam = (playerId) => {
    return {
        type: actionTypes.REMOVE_PLAYER_NEW_TEAM,
        id: playerId
    }
}