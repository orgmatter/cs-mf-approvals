import { FETCH_LOGIN_START, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILED, FETCH_LOGIN_STOP } from '../actions/types';
import { States as initialState } from '../states';

export const LoginReducer = (state = initialState['auth']['login'], action) => {

    const { type, payload } = action;
    
    switch(type) {
        case FETCH_LOGIN_START:
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLogin: true,
                status: 'success',
                response: payload
            }
        case FETCH_LOGIN_FAILED:
            return {
                ...state,
                isLogin: false,
                status: 'failed',
            }
        default:
            return {
                ...state
            }
    }
}