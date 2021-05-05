import { 
    POST_DASHBOARD_RESOURCES_START, 
    POST_DASHBOARD_RESOURCES_SUCCESS, 
    POST_DASHBOARD_RESOURCES_FAILED, 
    POST_DASHBOARD_RESOURCES_STOP,
 } from '../actions/types';
import { States as initialState } from '../states';

export const PostResourceReducer = (state = initialState['dashboard'], action) => {

    const { type, payload } = action;

    switch(type) {
        case POST_DASHBOARD_RESOURCES_START:
            return {
                ...state['post'],
                isFetching: true,
            }
        case POST_DASHBOARD_RESOURCES_SUCCESS:
            return {
                ...state['post'],
                isFetching: false,
                status: 'success',
                response: payload
            }
        case POST_DASHBOARD_RESOURCES_FAILED:
            return {
                ...state['post'],
                status: 'failed',
            }
        default:
            return {
                ...state
            }
    }
}