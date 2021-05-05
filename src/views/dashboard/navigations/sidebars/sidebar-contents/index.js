import React from 'react';
import AdminProfile from './admin-profile';
import Requests from './requests';
import Settings from './settings';

export default function SidebarContents(props) {

    const { sidebarContentProps } = props;
    const { 
        classes, 
        drawerItemIndex,
        dashboardState,
        postResourceState,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
    } = sidebarContentProps;

    const requestProps = {
        dashboardState,
        postResourceState,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
    }
    
    return (
        <main className={`sidebar-content-main-container`}>
            <div className={`content-main-toolbar-cover`}>
                <div className="main-toolbar-cover-flex">
                    <div className="main-toolbar-cover-item">
                        { drawerItemIndex === 'Admin Role' && <AdminProfile /> }
                        { drawerItemIndex === 'Requests' && <Requests requestProps={requestProps} /> }
                        { drawerItemIndex === '' && <Requests requestProps={requestProps} /> }
                        { drawerItemIndex === 'Settings' && <Settings /> }
                    </div>
                </div>
            </div>
        </main>
    )
}