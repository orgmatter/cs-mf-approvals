import { FETCH_LOGOUT_START, FETCH_LOGOUT_SUCCESS, FETCH_LOGOUT_FAILED, FETCH_LOGOUT_STOP } from '../actions/types';
import { States as initialState } from '../states';

export const LogoutReducer = (state = initialState['auth']['logout'], action) => {

    const { type, payload } = action;
    
    switch(type) {
        case FETCH_LOGOUT_START:
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                status: 'success',
                response: payload
            }
        case FETCH_LOGOUT_FAILED:
            return {
                ...state,
                status: 'failed',
            }
        default:
            return {
                ...state
            }
    }
}