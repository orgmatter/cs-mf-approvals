import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeaderAppbar from '../navigations/headers';
import SidebarDrawer from '../navigations/sidebars';
import SidebarContents from '../navigations/sidebars/sidebar-contents';
import LoaderComponent from '../components/loader-component';

export default function DashboardComponent(props) {

    const { dashboardComponentProps } = props;
    const { 
        dashboardState,
        postResourceState,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
        dispatchLogoutAction,
        classes 
    } = dashboardComponentProps;

    var adminRole = localStorage.getItem('staff') && JSON.parse(localStorage.getItem('staff')).groups[1];
    var adminName = localStorage.getItem('staff') && JSON.parse(localStorage.getItem('staff')).name;
    const [drawerItemIndex, setDrawerItemIndex] = useState('');

    const handleDrawerItemClick = (event, index) => {
        event.preventDefault();
        setDrawerItemIndex(index);
    }

    const headerAppbarProps = {
        classes,
        drawerItemIndex
    }
    const sidebarDrawerProps = {
        classes,
        drawerItemIndex,
        adminName: adminName !== ''? adminName: '',
        handleDrawerItemClick,
        dispatchLogoutAction,
        dashboardState,
    }

    const sidebarContentProps = {
        classes, 
        drawerItemIndex,
        dashboardState,
        postResourceState,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
    }
    

    return (
        <div className={`${classes.root} dashboard-component-container`}>
            <CssBaseline />
            <div className="dashboard-header-cover-flex">
                <div className="dashboard-header-cover-item">
                    <HeaderAppbar headerAppbarProps={headerAppbarProps} />
                </div>
            </div>
            <SidebarDrawer sidebarDrawerProps={sidebarDrawerProps} />

            {
                dashboardState.response === undefined || dashboardState.response.length <= 0 ?
                <div className="loader-component-container">
                    <div className="loader-component-cover-flex">
                        <div className="loader-component-cover-item">
                            <LoaderComponent />
                        </div>
                    </div>
                </div>:
                <SidebarContents sidebarContentProps={sidebarContentProps} />
            }
        </div>
    )
}