import { 
    GET_DASHBOARD_RESOURCES_START, 
    GET_DASHBOARD_RESOURCES_SUCCESS, 
    GET_DASHBOARD_RESOURCES_FAILED, 
    GET_DASHBOARD_RESOURCES_STOP,
 } from '../actions/types';
import { States as initialState } from '../states';

export const DashboardReducer = (state = initialState['dashboard'], action) => {

    const { type, payload } = action;

    switch(type) {
        case GET_DASHBOARD_RESOURCES_START:
            return {
                ...state['get'],
                isFetching: true,
            }
        case GET_DASHBOARD_RESOURCES_SUCCESS:
            return {
                ...state['get'],
                isFetching: false,
                status: 'success',
                response: payload
            }
        case GET_DASHBOARD_RESOURCES_FAILED:
            return {
                ...state['get'],
                status: 'failed',
                response: payload
            }
        default:
            return {
                ...state
            }
    }
}