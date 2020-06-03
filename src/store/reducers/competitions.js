import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    competitions: []
}

const setCompetitions = (state, action) => {
    return updateObject(state, {
        competitions: action.competitions
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COMPETITIONS:
            return setCompetitions(state, action);
        default:
            return state;
     }
}

export default reducer;