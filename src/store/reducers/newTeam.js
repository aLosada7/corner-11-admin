import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    players: [],
    selectedPlayers: [],
    loading: false,
    teamCreated: false
}

const setPlayers = (state, action) => {
    return updateObject(state, {
        players: action.players,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TEAM: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.CREATE_TEAM_SUCCESS: {
            return {
                ...state
            }
        }
        case actionTypes.CREATE_TEAM_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.END_CREATE_TEAM: {
            return {
                ...state,
                loading: false,
                teamCreated: true
            }
        }
        case actionTypes.SET_GENERATED_PLAYERS:
            return setPlayers(state, action);
        case actionTypes.ADD_PLAYER_NEW_TEAM:
            return {
                ...state,
                selectedPlayers: state.selectedPlayers.concat(action.player)
            }
        case actionTypes.REMOVE_PLAYER_NEW_TEAM:
            return {
                ...state,
                selectedPlayers: state.selectedPlayers.filter((item, index) => index !== parseFloat(action.playerId))
            }
        default:
            return state;
     }
}

export default reducer;