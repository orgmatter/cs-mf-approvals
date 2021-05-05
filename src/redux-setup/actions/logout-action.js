import { FETCH_LOGOUT_START, FETCH_LOGOUT_SUCCESS, FETCH_LOGOUT_FAILED, FETCH_LOGOUT_STOP } from './types';
import { ApiServices as API_SERVICES } from '../../services/api';

export const LogoutAction = () => dispatch => {

    dispatch({
        type: FETCH_LOGOUT_START,
    })
    const logoutResponse = API_SERVICES.auth.logout();

    logoutResponse
    .then(logoutRes => {
        if(logoutRes.ok) {
            logoutResponse
            .then(logoutData => logoutData.json())
            .then(data => {

                dispatch({
                    type: FETCH_LOGOUT_SUCCESS,
                    payload: data,
                })
            })
        }
    })
    .catch(err => {
        dispatch({
            type: FETCH_LOGOUT_FAILED
        })
    })
}