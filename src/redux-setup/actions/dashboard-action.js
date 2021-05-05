import { 
    GET_DASHBOARD_RESOURCES_START, 
    GET_DASHBOARD_RESOURCES_SUCCESS, 
    GET_DASHBOARD_RESOURCES_FAILED, 
    GET_DASHBOARD_RESOURCES_STOP,
    POST_DASHBOARD_RESOURCES_START, 
    POST_DASHBOARD_RESOURCES_SUCCESS, 
    POST_DASHBOARD_RESOURCES_FAILED, 
    POST_DASHBOARD_RESOURCES_STOP,
} from './types';
import { ApiServices as API_SERVICES } from '../../services/api';

const resourcePayload = [];

export const DashboardActionObj = {

    getDashboardResources: () => dispatch => {

        dispatch({
            type: GET_DASHBOARD_RESOURCES_START,
        })
        const dashboardResourceResponse = API_SERVICES.dashboard.getResources();
    
        dashboardResourceResponse
        .then(dashboardResourceRes => {
            if(dashboardResourceRes.responseNo === 2) {

                dashboardResourceResponse
                .then(dashboardSubResourceRes => dashboardSubResourceRes.subscriptionResourceResponse.json())
                .then(subData => {
                    
                    resourcePayload.push(subData);
                })
                dashboardResourceResponse
                .then(dashboardRedResource => dashboardRedResource.redemptionResourceResponse.json())
                .then(redData => {

                    resourcePayload.push(redData)
                    dispatch({
                        type: GET_DASHBOARD_RESOURCES_SUCCESS,
                        payload: resourcePayload
                    })
                })
            }else if(dashboardResourceRes.responseNo === 1) {

                dashboardResourceResponse
                .then(dashboardRedResource => dashboardRedResource.redemptionResourceResponse.json())
                .then(redData => {

                    dispatch({
                        type: GET_DASHBOARD_RESOURCES_SUCCESS,
                        payload: [redData]
                    })
                })
            }
        })
        .catch(err => {
            dispatch({
                type: GET_DASHBOARD_RESOURCES_FAILED
            })
        })
    },
    postDashboardResources: {
        subscription: (params) => dispatch => {

            console.log('approve params: ', params)
    
            dispatch({
                type: POST_DASHBOARD_RESOURCES_START,
            })
            const dashboardResourceResponse = API_SERVICES.dashboard.postResource.subscription(params);
        
            dashboardResourceResponse
            .then(dashboardSubResourceRes => dashboardSubResourceRes.json())
            .then(subData => {

                console.log('approve subData: ', subData)
                
                dispatch({
                    type: POST_DASHBOARD_RESOURCES_SUCCESS,
                    payload: subData
                })
            })
            .catch(err => {
                dispatch({
                    type: POST_DASHBOARD_RESOURCES_FAILED
                })
            })
        },
        redemption: (params) => dispatch => {

            console.log('approve params: ', dispatch)
    
            dispatch({
                type: POST_DASHBOARD_RESOURCES_START,
            })
            const dashboardResourceResponse = API_SERVICES.dashboard.postResource.redemption(params);
        
            dashboardResourceResponse
            .then(dashboardRedResourceRes => dashboardRedResourceRes.json())
            .then(redData => {

                console.log('approve redData: ', redData)
                
                dispatch({
                    type: POST_DASHBOARD_RESOURCES_SUCCESS,
                    payload: redData
                })
            })
            .catch(err => {
                dispatch({
                    type: POST_DASHBOARD_RESOURCES_FAILED
                })
            })
        },
    }
}