import { FETCH_LOGIN_START, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILED, FETCH_LOGIN_STOP } from './types';
import { ApiServices as API_SERVICES } from '../../services/api';

export const LoginAction = (params) => dispatch => {

    dispatch({
        type: FETCH_LOGIN_START,
    })
    const loginResponse = API_SERVICES.auth.login(params);

    loginResponse
    .then(loginRes => {
        if(loginRes.ok) {
            loginResponse
            .then(loginData => loginData.json())
            .then(data => {
                const { message, staff, accessToken } = data;

                if(message === 'Successfully authenticated!') {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('staff', JSON.stringify(staff));
                    localStorage.setItem('isLogin', 'true');

                    dispatch({
                        type: FETCH_LOGIN_SUCCESS,
                        payload: data,
                    })
                }
            })
        }else {
            loginResponse
            .then(loginData => loginData.json())
            .then(data => {
                const { message } = data;

                if(message === 'Invalid Credentials') {
                    console.log('action message: ', message)

                    dispatch({
                        type: FETCH_LOGIN_FAILED,
                    })
                }
            })
        }
    })
    .catch(err => {
        console.log('action err: ', err)
        dispatch({
            type: FETCH_LOGIN_FAILED
        })
    })
}