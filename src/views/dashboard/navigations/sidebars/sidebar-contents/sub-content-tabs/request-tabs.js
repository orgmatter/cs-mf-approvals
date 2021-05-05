import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SubscriptionRequestTables from '../sub-content-tables/subscription-request-tables';
import RedemptionRequestTables from '../sub-content-tables/redemption-request-tables';
import { Session as SESSION } from '../../../../../../helpers/session';


function TabPanel(props) {

    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
        className="tabpanel-role-cover"
      >
        {value === index && (
          <Box p={5} className="approval-tab-box-cover-flex">
            <div className="approval-tab-box-cover-item">
                <div className="approval-tab-box-cover">
                    {children}
                </div>
            </div>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}
  
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


export default function RequestTabs(props) {

    const { requestTabProps } = props;

    const {
        dashboardState,
        postResourceState,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
    } = requestTabProps;


    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [filterType, setFilterType] = useState('');
    const [filterSearchInputVal, setFilterSearchInputVal] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFilterChange = (event, filterType) => {

        setFilterType(filterType);
    }

    const handleFundSearchKeyPress = (e) => {
        e.preventDefault();

        setFilterSearchInputVal(e.target.value)
    }

    const tableHeaderProps = {
        filterType,
        filterSearchInputVal,
        handleFilterChange,
        handleFundSearchKeyPress,
        adminRoles: SESSION.getAdminRoles(),
    }

    const requestTableProps = {
        dashboardState,
        postResourceState,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
        filterType,
        filterSearchInputVal,
        tableHeaderProps
    }

    console.log('dashboard state: ', dashboardState.response)

    return (
        <div className="approval-tabs-outer-cover-flex">
            <div className="approval-tabs-outer-cover-item">
                <div className="approval-tabs-inner-cover-flex">
                    {
                        dashboardState.response !== undefined && dashboardState.response.length > 1 &&
                        <>
                            <div className="approval-tabs-inner-cover-item">
                                <div className="approval-tabs-header-cover">
                                    <div className={`approval-tabs-header-root-cover ${classes.root}`}>
                                        <AppBar className="approval-tabs-header-appbar-cover" position="static">
                                            <Tabs
                                                variant="fullWidth"
                                                value={value}
                                                onChange={handleChange}
                                                aria-label="nav tabs example"
                                                className="approval-tabs-header-tabs-cover"
                                            >
                                                <LinkTab 
                                                    className={value === 0 ? `approval-tabs-header-linktabs-cover approval-tabs-header-linktabs-cover-active`: `approval-tabs-header-linktabs-cover`} 
                                                    label="Subscriptions" 
                                                    href="/subscriptions" 
                                                    {...a11yProps(0)} 
                                                />
                                                <LinkTab 
                                                    className={value === 1 ? `approval-tabs-header-linktabs-cover approval-tabs-header-linktabs-cover-active`: `approval-tabs-header-linktabs-cover`} 
                                                    label="Redemptions" 
                                                    href="/redemptions" 
                                                    {...a11yProps(1)} 
                                                />
                                            </Tabs>
                                        </AppBar>
                                        <TabPanel value={value} index={0}>
                                            <div className="tabpanel-content-outer-cover-flex">
                                                <div className="tabpanel-content-outer-cover-item">
                                                    <div className="tabpanel-content-inner-cover-flex">
                                                        <div className="tabpanel-content-inner-cover-item">
                                                            <SubscriptionRequestTables requestTableProps={requestTableProps} requestType={'subscription'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <div className="tabpanel-content-outer-cover-flex">
                                                <div className="tabpanel-content-outer-cover-item">
                                                    <div className="tabpanel-content-inner-cover-flex">
                                                        <div className="tabpanel-content-inner-cover-item">
                                                            <RedemptionRequestTables requestTableProps={requestTableProps} requestType={'redemption'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {
                        dashboardState.response !== undefined && dashboardState.response.length === 1 &&
                        <>
                            <div className="approval-tabs-inner-cover-item">
                                <div className="approval-tabs-header-cover">
                                    <div className={`approval-tabs-header-root-cover ${classes.root}`}>
                                        <AppBar className="approval-tabs-header-appbar-cover" position="static">
                                            <Tabs
                                                variant="fullWidth"
                                                value={value}
                                                onChange={handleChange}
                                                aria-label="nav tabs example"
                                                className="approval-tabs-header-tabs-cover"
                                            >
                                                <LinkTab 
                                                    className={value === 0 ? `approval-tabs-header-linktabs-cover approval-tabs-header-linktabs-cover-active`: `approval-tabs-header-linktabs-cover`} 
                                                    label="Redemptions" 
                                                    href="/redemptions" 
                                                    {...a11yProps(0)} 
                                                />
                                            </Tabs>
                                        </AppBar>
                                        <TabPanel value={value} index={0}>
                                            <div className="tabpanel-content-outer-cover-flex">
                                                <div className="tabpanel-content-outer-cover-item">
                                                    <div className="tabpanel-content-inner-cover-flex">
                                                        <div className="tabpanel-content-inner-cover-item">
                                                            <RedemptionRequestTables requestTableProps={requestTableProps} requestType={'redemption'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}