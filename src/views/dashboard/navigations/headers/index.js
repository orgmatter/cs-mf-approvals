import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import HeaderToolbar from './header-toolbar';

export default function HeaderAppBar(props) {

    const { headerAppbarProps } = props;
    const { classes, drawerItemIndex } = headerAppbarProps;
    
    const headerToolbarProps = {
        classes,
        drawerItemIndex
    }
    
    return (
        <div className="header-appbar-container">
            <div className="header-appbar-cover">
                <AppBar position="fixed" className={`${classes.appBar} appbar-cover`}>
                    <HeaderToolbar headerToolbarProps={headerToolbarProps} />
                </AppBar>
            </div>
        </div>
    )
}
