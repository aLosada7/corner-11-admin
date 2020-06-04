import * as actionTypes from './actionTypes';
import axios from '../../axios-manager';

export const fetchCompetitions = () => {
    return dispatch => {
        axios.get('/api/v1/competitions')
            .then(response => {
                const fetchedCompetitions = response.data.data;
                dispatch(fetchCompetitionsSuccess(fetchedCompetitions));
            })
            .catch(err => {
                console.log(err)
            });
    }
}

export const fetchCompetitionsSuccess = (competitions) => {
    return {
        type: actionTypes.SET_COMPETITIONS,
        competitions
    }
}