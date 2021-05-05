import { BASE_URL, Endpoints as ENDPOINTS }  from './endpoints';
import { Session as SESSION } from '../../helpers/session';
import { getAdminBaseUrl, postAdminBaseUrl } from './url-helper';


export const ApiServices = {

    auth: {
        login: async (params) => {

            const url = `${BASE_URL}${ENDPOINTS.login}`;
    
            const loginResponse = fetch(url, {
                method: "post",
                body: JSON.stringify(params),
                headers: {
                    "Content-Type": "application/json"
                }
            })
    
            return await loginResponse;
        },
        logout: async () => {

            const url = `${BASE_URL}${ENDPOINTS.logout}`;
    
            const logoutResponse = fetch(url, {
                method: "get",
                headers: {
                    "Authorization": `${SESSION.check() && SESSION.getToken()}`
                }
            })
    
            return await logoutResponse;
        },
    },
    dashboard: {
        getResources: async () => {
            const adminRole = SESSION.getAdminRoles();
            const token = SESSION.check() && SESSION.getToken();

            const url = getAdminBaseUrl(adminRole);

            // if(adminRole === 'Divisional Manager Approval') {

            //     url = getAdminBaseUrl('Line Manager Approval');

            // }else if(adminRole === 'Payment Processor') {

            //     url = getAdminBaseUrl('Fund Manager Approval');

            // }else {
            //     url = getAdminBaseUrl(adminRole);
            // }

            if(url.urlNo === 4) {
                const subscriptionResourceResponse = await fetch(url.getSubscription, {
                    method: "get",
                    headers: {
                        "Authorization": token,
                    }
                })

                const redemptionResourceResponse = await fetch(url.getRedemption, {
                    method: "get",
                    headers: {
                        "Authorization": token,
                    }
                })
    
                return {
                    responseNo: 2,
                    subscriptionResourceResponse,
                    redemptionResourceResponse
                };
            }
            const redemptionResourceResponse = await fetch(url.getRedemption, {
                method: "get",
                headers: {
                    "Authorization": token,
                }
            })

            return {
                responseNo: 1,
                redemptionResourceResponse
            };
        },
        postResource: {
            subscription: async (params) => {
                const adminRole = SESSION.getStaff().groups[1];
                const token = SESSION.check() && SESSION.getToken();
    
                const url = getAdminBaseUrl(adminRole);

                if(url.urlNo === 4) {

                    const subscriptionResourceResponse = fetch(url.postSubscription, {
                        method: "post",
                        body: JSON.stringify(params),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token,
                        }
                    })

                    console.log('api sub response: ', subscriptionResourceResponse)
    
                    return await subscriptionResourceResponse;
                }
                const subscriptionResourceResponse = fetch(url.postSubscription, {
                    method: "post",
                    body: JSON.stringify(params),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    }
                })

                return await subscriptionResourceResponse;
            },
            redemption: async (params) => {
                const adminRole = SESSION.getStaff().groups[1];
                const token = SESSION.check() && SESSION.getToken();
    
                const url = getAdminBaseUrl(adminRole);


                if(url.urlNo === 4) {

                    const redemptionResourceResponse = fetch(url.postRedemption, {
                        method: "post",
                        body: JSON.stringify(params),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token,
                        }
                    })
        
                    return await redemptionResourceResponse;
                }
                const redemptionResourceResponse = fetch(url.postRedemption, {
                    method: "post",
                    body: JSON.stringify(params),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    }
                })
    
                return await redemptionResourceResponse;
            },
        },
    }
}