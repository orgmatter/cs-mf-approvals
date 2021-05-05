import React, { useEffect } from 'react';
import { DashboardActionObj } from '../../redux-setup/actions/dashboard-action';
import { LogoutAction } from '../../redux-setup/actions/logout-action';
import { connect } from 'react-redux';
import DashboardLayoutComponent from './components/dashboard-layout-component';
import { Session as SESSION } from '../../helpers/session';
import LoaderComponent from './components/loader-component';

function DashboardView(props) {

    const { 
        dashboardState, 
        postResourceState,
        dispatchGetDashboardAction,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
        dispatchLogoutAction 
    } = props;

    const dashboardLayoutProps = {
        dashboardState,
        postResourceState,
        dispatchLogoutAction,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
    }

    useEffect(() => {

        if(dashboardState.status === 'failed' && dashboardState.response === undefined) {

            SESSION.logout();

        }else if(dashboardState.status === 'success' && dashboardState.response[0]['message'] === 'invalid token') {

            SESSION.logout();
        }

        if(postResourceState.status !== '' && postResourceState.status === 'success') {

            setTimeout(() => {
                (window.location = '/dashboard')
            }, 4000)
        }
        
        dispatchGetDashboardAction();

    }, [postResourceState.status])

    console.log('index: ', dashboardState)


    return (
        <DashboardLayoutComponent dashboardLayoutProps={dashboardLayoutProps} />
    )
}

const mapStateToProps = state => ({
    dashboardState: state.reducerDashboard,
    postResourceState: state.reducerPostResource,
});

const mapDispatchToProps = dispatch => ({
    dispatchGetDashboardAction: () => dispatch(DashboardActionObj.getDashboardResources()),
    dispatchPostSubResourceAction: (params) => dispatch(DashboardActionObj.postDashboardResources.subscription(params)),
    dispatchPostRedResourceAction: (params) => dispatch(DashboardActionObj.postDashboardResources.redemption(params)),
    dispatchLogoutAction: () => dispatch(LogoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);