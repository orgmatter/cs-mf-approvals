import React from 'react';
import List from '@material-ui/core/List';
import SidebarListItems from './sidebar-list-items';

export default function SidebarList(props) {

    const { sidebarListProps } = props;
    const { drawerItemIndex, adminName, handleDrawerItemClick, dashboardState, } = sidebarListProps;

    const sidebarListItemProps = {
        drawerItemIndex,
        adminName,
        handleDrawerItemClick,
        dashboardState,
    }
    
    return (
        <div className="sidebar-list-container">
            <div className="sidebar-list-cover-flex">
                <div className="sidebar-list-cover-item">
                    <List>
                        {/* {
                            dashboardState.response === undefined || dashboardState.response.length <= 0 || dashboardState.response[0].pending === undefined ? 
                            (''):
                            <SidebarListItems sidebarListItemProps={sidebarListItemProps} />
                        } */}
                        <SidebarListItems sidebarListItemProps={sidebarListItemProps} />
                    </List>
                </div>
            </div>
        </div>
    )
}