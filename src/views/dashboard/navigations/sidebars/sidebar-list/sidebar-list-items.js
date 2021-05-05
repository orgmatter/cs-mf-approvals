import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Session as SESSION } from '../../../../../helpers/session';

export default function SidebarListItems(props) {

    const { sidebarListItemProps } = props;
    const { drawerItemIndex, adminName, handleDrawerItemClick } = sidebarListItemProps;

    const handleLogoutBtnClick = (e) => {
        e.preventDefault();

        SESSION.logout();
    }

    const redefineAdminName = (adminName) => {

        if((adminName !== '') && (adminName === 'Line Manager Approval')) {
            return 'Line Manager';
        }
        if((adminName !== '') && (adminName === 'Divisional Manager Approval')) {
            return 'Divisional Manager';
        }
        if((adminName !== '') && (adminName === 'Fund Manager Approval')) {
            return 'Fund Manager';
        }
        if((adminName !== '') && (adminName === 'Payment Processor')) {
            return 'Payment Processor';
        }
    }

    return (
        <>
            <ListItem 
                className="listitem-cover"
                button
                // onClick={(event) => handleDrawerItemClick(event, JSON.parse(localStorage.getItem('staff')).groups[1])}
                // selected={drawerItemIndex === JSON.parse(localStorage.getItem('staff')).groups[1]}
            >
                <ListItemAvatar className="list-item-avatar-cover">
                    <Avatar className="avatar-cover">
                        <PersonIcon className="avatar-icon" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText className="list-item-text-cover" primary={adminName} secondary={redefineAdminName(JSON.parse(localStorage.getItem('staff')).groups[1])} />
            </ListItem>
            <ListItem 
                className="listitem-cover"
                button
                onClick={(event) => handleDrawerItemClick(event, 'Requests')}
                selected={drawerItemIndex === 'Requests' || drawerItemIndex === ''}
            >
                <ListItemIcon className="listitem-icon-cover">
                    <PersonIcon className="listitem-icon" />
                </ListItemIcon>
                <ListItemText className="list-item-text-cover" primary="Requests" />
            </ListItem>
            {/* <ListItem 
                className="listitem-cover"
                button
                onClick={(event) => handleDrawerItemClick(event, 'Settings')}
                selected={drawerItemIndex === 'Settings'}
            >
                <ListItemIcon className="listitem-icon-cover">
                    <SettingsIcon className="listitem-icon" />
                </ListItemIcon>
                <ListItemText className="list-item-text-cover" primary="Settings" />
            </ListItem> */}
            <ListItem 
                className="listitem-cover"
                button
                onClick={handleLogoutBtnClick}
            >
                <ListItemIcon className="listitem-icon-cover">
                    <ExitToAppIcon className="listitem-icon" />
                </ListItemIcon>
                <ListItemText className="list-item-text-cover" primary="Logout" />
            </ListItem>
        </>
    )
}