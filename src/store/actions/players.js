import * as actionTypes from './actionTypes';

export const generatePlayer = ( playerData, teamId ) => {
    return {
        type: actionTypes.GENERATE_PLAYER,
        playerData: playerData,
        teamId: teamId
    }
};

export const generatePlayerSuccess = (id, playerData) => {
    return {
        type: actionTypes.GENERATE_PLAYER_SUCCESS,
        playerId: id,
        playerData: playerData
    }
}

export const generatePlayerFail = (error) => {
    return {
        type: actionTypes.GENERATE_PLAYER_FAIL,
        error: error
    }
}

export const fetchPlayersSuccess = (players) => {
    return {
        type: actionTypes.FETCH_PLAYERS_SUCCESS,
        players
    }
}

export const fetchPlayersFail = (error) => {
    return {
        type: actionTypes.FETCH_PLAYERS_FAIL,
        error: error
    }
}

export const fetchPlayers = (userId) => {
    return {
        type: actionTypes.FETCH_PLAYERS,
        userId: userId
    }
}

/*export const updatePlayer = (playerId, playerData) => {
    return dispatch => {
        axios.put( '/players/' + playerId +'.json', playerData)
        .then( response => {
            console.log( response.data );
        } )
        .catch( err => {
        } );
    }
}*/


