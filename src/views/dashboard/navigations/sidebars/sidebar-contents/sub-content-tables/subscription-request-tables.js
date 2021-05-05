import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import SubTableBodyList from './table-body-list/sub-table-body-list';
import { Session as SESSION } from '../../../../../../helpers/session';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TableHeaders from './table-headers';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export default function SubscriptionRequestTables(props) {

    const { requestTableProps, requestType } = props;

    const {
        dashboardState,
        postResourceState,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
        tableHeaderProps,
        filterType,
        filterSearchInputVal,
    } = requestTableProps;

    console.log('filter type: ', filterType)

    const [anchorEl, setAnchorEl] = useState(null);
    const [scroll, setScroll] = useState('paper');

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget)
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const requestArr = (dashboardState.response.length > 0 && dashboardState.response);

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
    });

    console.log('requestArr: ', requestArr[0])

    const classes = useStyles();

    const searchResults = [];

    return (
        <div 
            className="MuiDialog-container approval-tables-cover"
        >
            <div className="approval-tables-cover-flex">
                <div className="approval-tables-cover-item">
                    <TableContainer className="table-container-cover">
                        <TableHeaders tableHeaderProps={{...tableHeaderProps, requestType}}/>
                        <DialogContent 
                            className={`${classes.table} table-content-cover`} dividers={scroll === 'paper'}>
                            <div className="table-content-body-cover">
                                {
                                    SESSION.getAdminRoles() === 'Line Manager Approval' && 
                                    <>
                                        {
                                            requestArr.length > 1 && filterType === '' && filterSearchInputVal === '' && 
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.map((subscribe, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            subscribe,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <SubTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No subscription request record found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'all' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.map((subscribe, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            subscribe,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <SubTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No subscription request record found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'pending' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].pending !== undefined && requestArr[0].pending.length > 0?
                                                    requestArr[0].pending.map((subscribe, index) => {

                                                        
                                    
                                                        const tableBodyListProps = {
                                                            subscribe,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <SubTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No pending subscription request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'approved' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].approved !== undefined && requestArr[0].approved.length > 0?
                                                    requestArr[0].approved.map((subscribe, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            subscribe,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <SubTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No approved subscription request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'declined' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].declined !== undefined && requestArr[0].declined.length > 0?
                                                    requestArr[0].declined.map((subscribe, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            subscribe,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <SubTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No declined subscription request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterSearchInputVal !== '' &&
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.map((subscribe, index) => {

                                                        var subscribeKeys = Object.keys(subscribe);

                                                        subscribeKeys.map((subscribeKey, index) => {
                                                            

                                                            if(JSON.stringify(subscribe[subscribeKey]).indexOf(filterSearchInputVal) != -1) {
                                                                searchResults.push(subscribe)
                                                            }
                                                        })
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No subscription request record found!</i></div>
                                                    </div>
                                                }

                                                <>
                                                    {
                                                        searchResults.length > 0 ?
                                                        searchResults.map((searchResult, index) => {

                                                            const tableBodyListProps = {
                                                                subscribe: searchResult,
                                                                index,
                                                                postResourceState,
                                                                dispatchPostSubResourceAction,
                                                                dispatchPostRedResourceAction,
                                                            }
            
                                                            return (
                                                                <SubTableBodyList tableBodyListProps={tableBodyListProps} />
                                                            )
                                                        }):
                                                        <div className="table-empty-row-cover">
                                                            <div className="table-empty-cell-cover"><i>No record found!</i></div>
                                                        </div>
                                                    }
                                                </>
                                            </>
                                        }
                                    </>
                                }
                                {
                                    SESSION.getAdminRoles() === 'Divisional Manager Approval' && 
                                    <>
                                        {
                                            requestArr.length > 1 && filterType === '' && filterSearchInputVal === '' && 
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.map((subscribe, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            subscribe,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <SubTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No subscription request record found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'all' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.map((subscribe, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            subscribe,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <SubTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No subscription request record found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'pending' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].pending !== undefined && requestArr[0].pending.length > 0?
                                                    requestArr[0].pending.map((subscribe, index) => {

                                                        
                                    
                                                        const tableBodyListProps = {
                                                            subscribe,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <SubTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No pending subscription request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'approved' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].approved !== undefined && requestArr[0].approved.length > 0?
                                                    requestArr[0].approved.map((subscribe, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            subscribe,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <SubTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No approved subscription request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'declined' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].declined !== undefined && requestArr[0].declined.length > 0?
                                                    requestArr[0].declined.map((subscribe, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            subscribe,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <SubTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No declined subscription request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterSearchInputVal !== '' &&
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.map((subscribe, index) => {

                                                        var subscribeKeys = Object.keys(subscribe);

                                                        subscribeKeys.map((subscribeKey, index) => {

                                                            console.log('subscribe key: ', subscribe[subscribeKey])

                                                            if(JSON.stringify(subscribe[subscribeKey]).indexOf(filterSearchInputVal) != -1) {
                                                                searchResults.push(subscribe)
                                                            }
                                                        })
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No subscription request record found!</i></div>
                                                    </div>
                                                }

                                                <>
                                                    {
                                                        searchResults.length > 0 ?
                                                        searchResults.map((searchResult, index) => {

                                                            const tableBodyListProps = {
                                                                subscribe: searchResult,
                                                                index,
                                                                postResourceState,
                                                                dispatchPostSubResourceAction,
                                                                dispatchPostRedResourceAction,
                                                            }
            
                                                            return (
                                                                <SubTableBodyList tableBodyListProps={tableBodyListProps} />
                                                            )
                                                        }):
                                                        <div className="table-empty-row-cover">
                                                            <div className="table-empty-cell-cover"><i>No record found!</i></div>
                                                        </div>
                                                    }
                                                </>
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        </DialogContent>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}
