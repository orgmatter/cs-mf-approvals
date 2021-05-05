import React from 'react';
import DashboardComponent from './dashboard-component';
import { useStyles } from '../styles';

export default function DashboardLayoutComponent(props) {

    const { dashboardLayoutProps } = props;
    const { 
        dashboardState, 
        postResourceState,
        dispatchDashboardAction,
        dispatchLogoutAction,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
    } = dashboardLayoutProps;

    const classes = useStyles();

    const dashboardComponentProps = {
        dashboardState, 
        postResourceState,
        dispatchDashboardAction,
        dispatchLogoutAction,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
        classes
    }
    
    return (
        <div className="dashboard-layout-component-container">
            <div className="dashboard-layout-component-flex">
                <div className="dashboard-layout-component-item">
                    <DashboardComponent dashboardComponentProps={dashboardComponentProps} />
                </div>
            </div>
        </div>
    )
}