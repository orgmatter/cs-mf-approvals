import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function HeaderToolbar(props) {

    const { headerToolbarProps } = props;
    const { drawerItemIndex } = headerToolbarProps;
    
    return (
        <div className="header-toolbar-container">
            <div className="header-toolbar-cover">
                <Toolbar className="toolbar-cover">
                    <Typography className="toolbar-cover-text" variant="h6" noWrap>
                        { drawerItemIndex === ''? 'Request' : drawerItemIndex }
                    </Typography>
                </Toolbar>
            </div>
        </div>
    )
}
