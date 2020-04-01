import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    players: [],
    selectedPlayers: [],
    loading: false
}

const setPlayers = (state, action) => {
    return updateObject(state, {
        players: action.players,
    });
}

const reducer = (state = initialState, action) => {
    console.log(action.id);
    switch (action.type) {
        case actionTypes.SET_GENERATED_PLAYERS:
            return setPlayers(state, action);
        case actionTypes.ADD_PLAYER_NEW_TEAM:
            return {
                ...state,
                players: state.players.filter((item, index) => index !== parseFloat(action.id)),
                selectedPlayers: state.selectedPlayers.concat(state.players[action.id])
            }
        case actionTypes.REMOVE_PLAYER_NEW_TEAM:
            return {
                ...state,
                players: state.players.concat(state.selectedPlayers[action.id]),
                selectedPlayers: state.selectedPlayers.filter((item, index) => index !== parseFloat(action.id))
            }
        default:
            return state;
     }
}

export default reducer;