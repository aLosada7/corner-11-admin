import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    players: null,
    generatedPlayers: [],
    loading: false
}

const setTeamPlayers = (state, action) => {
    return updateObject(state, {
        players: action.players
    });
}

const setGeneratedPlayers = (state, action) => {
    return updateObject(state, {
        generatedPlayers: action.players
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GENERATED_PLAYERS_SUCCESS:
            return setGeneratedPlayers(state, action)
        case actionTypes.FETCH_PLAYERS_SUCCESS:
            return setTeamPlayers(state, action)
        case actionTypes.FETCH_PLAYERS_FAIL:
            return {
                ...state
            }
        case actionTypes.GENERATE_PLAYER_FAIL:
            return {
                ...state
            }
        default:
            return state;
     }
}

export default reducer;