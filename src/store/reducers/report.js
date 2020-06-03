import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    totals: {},
    expensivePlayers: [],
    topPlayers: []
}

const setReport = (state, action) => {
    return updateObject(state, {
        totals: action.totals,
        expensivePlayers: action.expensivePlayers,
        topPlayers: action.topPlayers
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REPORT_SUCCESS:
            return setReport(state, action);
        default:
            return state;
     }
}

export default reducer;