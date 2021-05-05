export const getAdminBaseUrl = (adminRole) => {

    if(adminRole === 'Line Manager Approval') {

        return {
            urlNo: 4,
            getSubscription: 'https://restserverstaging.cardinalstone.com/api/mutualfunds/admin/subscriptionRequest?approval_level=1',
            getRedemption: 'https://restserverstaging.cardinalstone.com/api/mutualfunds/admin/redemptionRequest?approval_level=1',
            postSubscription: 'https://restserverstaging.cardinalstone.com/api/mutualfunds/admin/update/subscriptionRequest',
            postRedemption: 'https://restserverstaging.cardinalstone.com/api/mutualfunds/admin/update/redemptionRequest'
        };

    }else if(adminRole === 'Divisional Manager Approval') {

        return {
            urlNo: 4,
            getSubscription: 'https://restserverstaging.cardinalstone.com/api/mutualfunds/admin/subscriptionRequest?approval_level=2',
            getRedemption: 'https://restserverstaging.cardinalstone.com/api/mutualfunds/admin/redemptionRequest?approval_level=2',
            postSubscription: 'https://restserverstaging.cardinalstone.com/api/mutualfunds/admin/update/subscriptionRequest',
            postRedemption: 'https://restserverstaging.cardinalstone.com/api/mutualfunds/admin/update/redemptionRequest'
        };
    }else if(adminRole === 'Fund Manager Approval') {

        return {
            urlNo: 2,
            getRedemption: 'https://restserverstaging.cardinalstone.com/api/mutualfunds/admin/redemptionRequest?approval_level=3',
            postRedemption: 'https://restserverstaging.cardinalstone.com/api/mutualfunds/admin/update/redemptionRequest'
        };
    }else if(adminRole === 'Payment Processor') {

        return {
            urlNo: 2,
            getRedemption: 'https://restserverstaging.cardinalstone.com/api/mutualfunds/admin/redemptionRequest?approval_level=4',
            postRedemption: 'https://restserverstaging.cardinalstone.com/api/mutualfunds/admin/update/redemptionRequest'
        };
    }
}