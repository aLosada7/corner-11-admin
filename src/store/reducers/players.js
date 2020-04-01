import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    teamPlayers: null,
    loading: false
}

const setTeamPlayers = (state, action) => {
    return updateObject(state, {
        teamPlayers: action.teamPlayers
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GENERATE_PLAYER_SUCCESS:
            return {
                ...state
            }
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