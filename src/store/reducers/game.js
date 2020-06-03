import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    previousGames: [],
    upcomingGames: [],
    game: {},
    scoreByQuarter: [],
    gameActions: [],
    gameStandings: {}
}

const setGames = (state, action) => {
    return updateObject(state, {
        previousGames: action.prevGames,
        upcomingGames: action.upcomingGames,
    });
}

const setGame = (state, action) => {
    return updateObject(state, {
        game: action.game.game,
        scoreByQuarter: action.game.scoreByQuarter,
        gameActions: action.game.gameActions,
        gameStandings: action.game.gameStandings
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GAMES_SUCCESS:
            return setGames(state, action);
        case actionTypes.FETCH_GAME_SUCCESS:
            return setGame(state, action);
        default:
            return state;
     }
}

export default reducer;