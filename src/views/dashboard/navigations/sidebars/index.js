import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import SidebarList from './sidebar-list';
import { appImgs as APP_IMGS } from '../../../images';

export default function SidebarDrawer(props) {

    const { sidebarDrawerProps } = props;
    const { classes, drawerItemIndex, adminName, handleDrawerItemClick, dashboardState, } = sidebarDrawerProps;

    const sidebarListProps = {
        classes, 
        drawerItemIndex,
        adminName,
        handleDrawerItemClick,
        dashboardState,
    }
    
    return (
        <Drawer
            className={`${classes.drawer} sidebar-drawer-cover`}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className="drawer-bg-cover">
                <div className={`${classes.toolbar} drawer-toolbar-cover`}>
                    <div className="app-logo-cover-flex">
                        <div className="app-logo-clover-item">
                            <img className="app-logo-img" src={APP_IMGS.appLogo} alt="app logo" />
                        </div>
                    </div>
                </div>
                <Divider />
                <SidebarList sidebarListProps={sidebarListProps} />
            </div>
        </Drawer>
    )
}