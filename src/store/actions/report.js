import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchReport = (token) => {
    return dispatch => {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get('http://localhost:5000/api/v1/report')
            .then(response => {
                const fetchReport = response.data.data;
                dispatch(fetchReportSuccess(fetchReport));
            })
            .catch(err => {
                dispatch(fetchReportFail(err));
            });
    }
}

export const fetchReportSuccess = (data) => {
    return {
        type: actionTypes.FETCH_REPORT_SUCCESS,
        totals: data.totals,
        expensivePlayers: data.players.expensivePlayers,
        topPlayers: data.players.topPlayers
    }
}

export const fetchReportFail = (error) => {
    return {
        type: actionTypes.FETCH_REPORT_FAIL,
        error
    }
}