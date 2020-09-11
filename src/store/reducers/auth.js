import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2E1MTRiNWQyYzEyYzc0NDliZTA0MiIsImlhdCI6MTU5OTgzNDM0MCwiZXhwIjoxNjAyNDI2MzQwfQ.D7k6i9fsLqOjuk4WHkLye5H8KsNlHNKIJQ67_Fp5o3I",
    error: null,
    loading: false
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        error: null,
        loading: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;