import * as actionTypes from './actionTypes';

export const fetchGames = () => {
    return {
        type: actionTypes.FETCH_GAMES
    }
}

export const fetchGamesSuccess = (prevGames, upcomingGames) => {
    return {
        type: actionTypes.FETCH_GAMES_SUCCESS,
        prevGames,
        upcomingGames
    }
}

export const fetchGame = (gameId) => {
    return {
        type: actionTypes.FETCH_GAME,
        gameId
    }
}

export const fetchGameSuccess = (game) => {
    return {
        type: actionTypes.FETCH_GAME_SUCCESS,
        game
    }
}

export const createGame = (local, visitor, token) => {
    return {
        type: actionTypes.CREATE_GAME,
        local,
        visitor,
        token
    }
}

export const createGameSuccess = () => {
    return {
        type: actionTypes.CREATE_GAME_SUCCESS
    }
}