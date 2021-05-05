import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import RedTableBodyList from './table-body-list/red-table-body-list';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';
import { Session as SESSION } from '../../../../../../helpers/session';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TableHeaders from './table-headers';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


    const useStyles1 = makeStyles((theme) => ({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }));


function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  

export default function RedemptionRequestTables(props) {

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

    const requestArr = (dashboardState.response.length > 0 && dashboardState.response);

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
    });

    // const rows = (requestArr && requestArr.length > 1 && requestArr[1].sort((a, b) => a.id < b.id ? -1 : 1));

    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(5);
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    const classes = useStyles();
    const searchResults = [];
    
    return (
        <div className="MuiDialog-container approval-tables-cover">
            <div className="approval-tables-cover-flex">
                <div className="approval-tables-cover-item">
                    <TableContainer className="table-container-cover">
                        <TableHeaders tableHeaderProps={{...tableHeaderProps, requestType }} />
                        <DialogContent className={`${classes.table} table-content-cover`}>
                            <div className="table-content-body-cover">
                                {/* {
                                    requestArr[1].length > 1?
                                    <>
                                        {
                                            (rowsPerPage > 0
                                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                : rows
                                            ).map((redeem, index) => {
        
                                                    const tableBodyListProps = {
                                                        redeem,
                                                        index
                                                    }
                                                    return (
                                                        <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                    )
                                            })
                                        }
                                    </>:
                                    <TableRow className="table-row-cover">
                                        <td className="table-td-cell-cover" colSpan="7" align="center"><i>No redemption request!</i></td>
                                    </TableRow>
                                } */}

                                {/* {
                                    SESSION.getAdminRoles() && SESSION.getAdminRoles() === 'Line Manager Approval' && 
                                    <>
                                        {
                                            requestArr.length > 1 &&
                                            <>
                                                {
                                                    requestArr[1].pending !== undefined && requestArr[1].pending > 1?
                                                    requestArr[1].pending.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No pending redemption request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                    </>
                                } */}
                                {
                                    SESSION.getAdminRoles() === 'Line Manager Approval' && 
                                    <>
                                        {
                                            requestArr.length > 1 && filterType === '' && filterSearchInputVal === '' && 
                                            <>
                                                {
                                                    requestArr[1].total !== undefined && requestArr[1].total.length > 0?
                                                    requestArr[1].total.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No redemption request record found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'all' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[1].total !== undefined && requestArr[1].total.length > 0?
                                                    requestArr[1].total.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No redemption request record found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'pending' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[1].pending !== undefined && requestArr[1].pending.length > 0?
                                                    requestArr[1].pending.map((redeem, index) => {

                                                        
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No pending redemption request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'approved' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[1].approved !== undefined && requestArr[1].approved.length > 0?
                                                    requestArr[1].approved.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No approved redemption request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'declined' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[1].declined !== undefined && requestArr[1].declined.length > 0?
                                                    requestArr[1].declined.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No declined redemption request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterSearchInputVal !== '' &&
                                            <>
                                                {
                                                    requestArr[1].total !== undefined && requestArr[1].total.length > 0?
                                                    requestArr[1].total.map((redeem, index) => {

                                                        var redeemKeys = Object.keys(redeem);

                                                        redeemKeys.map((redeemKey, index) => {

                                                            if(JSON.stringify(redeem[redeemKey]).indexOf(filterSearchInputVal) != -1) {
                                                                searchResults.push(redeem)
                                                            }
                                                        })
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No redemption request record found!</i></div>
                                                    </div>
                                                }

                                                <>
                                                    {
                                                        searchResults.length > 0 ?
                                                        searchResults.map((searchResult, index) => {

                                                            const tableBodyListProps = {
                                                                redeem: searchResult,
                                                                index,
                                                                postResourceState,
                                                                dispatchPostSubResourceAction,
                                                                dispatchPostRedResourceAction,
                                                            }
                    
                                                            return (
                                                                <RedTableBodyList tableBodyListProps={tableBodyListProps} />
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
                                                    requestArr[1].total !== undefined && requestArr[1].total.length > 0?
                                                    requestArr[1].total.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No redemption request record found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'all' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[1].total !== undefined && requestArr[1].total.length > 0?
                                                    requestArr[1].total.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No redemption request record found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'pending' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[1].pending !== undefined && requestArr[1].pending.length > 0?
                                                    requestArr[1].pending.map((redeem, index) => {

                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No pending redemption request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'approved' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[1].approved !== undefined && requestArr[1].approved.length > 0?
                                                    requestArr[1].approved.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No approved redemption request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterType === 'declined' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[1].declined !== undefined && requestArr[1].declined.length > 0?
                                                    requestArr[1].declined.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No declined redemption request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length > 1 && filterSearchInputVal !== '' &&
                                            <>
                                                {
                                                    requestArr[1].total !== undefined && requestArr[1].total.length > 0?
                                                    requestArr[1].total.map((redeem, index) => {
                                    
                                                        var redeemKeys = Object.keys(redeem);

                                                        redeemKeys.map((redeemKey, index) => {

                                                            if(JSON.stringify(redeem[redeemKey]).indexOf(filterSearchInputVal) != -1) {
                                                                searchResults.push(redeem)
                                                            }
                                                        })
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No redemption request record found!</i></div>
                                                    </div>
                                                }

                                                <>
                                                    {
                                                        searchResults.length > 0 ?
                                                        searchResults.map((searchResult, index) => {

                                                            const tableBodyListProps = {
                                                                redeem: searchResult,
                                                                index,
                                                                postResourceState,
                                                                dispatchPostSubResourceAction,
                                                                dispatchPostRedResourceAction,
                                                            }
                    
                                                            return (
                                                                <RedTableBodyList tableBodyListProps={tableBodyListProps} />
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
                                    SESSION.getAdminRoles() && SESSION.getAdminRoles() === 'Fund Manager Approval' && 
                                    <>
                                        {
                                            requestArr.length === 1 && filterType === '' && filterSearchInputVal === '' && 
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No redemption request record found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length === 1 && filterType === 'all' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No redemption request record found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length === 1 && filterType === 'pending' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].pending !== undefined && requestArr[0].pending.length > 0?
                                                    requestArr[0].pending.map((redeem, index) => {

                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No pending redemption request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length === 1 && filterType === 'approved' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].approved !== undefined && requestArr[0].approved.length > 0?
                                                    requestArr[0].approved.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No approved redemption request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length === 1 && filterType === 'paid' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.filter(filterPayment => filterPayment.is_payment_sent === 1).map((redeem, index) => {

                                                        
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No paid redemption request found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length === 1 && filterType === 'notPaid' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.filter(filterPayment => filterPayment.is_payment_sent === 0).map((redeem, index) => {

                                                        
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No pending payment redemption request found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length === 1 && filterSearchInputVal !== '' &&
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.map((redeem, index) => {
                                    
                                                        var redeemKeys = Object.keys(redeem);

                                                        redeemKeys.map((redeemKey, index) => {

                                                            if(JSON.stringify(redeem[redeemKey]).indexOf(filterSearchInputVal) != -1) {
                                                                searchResults.push(redeem)
                                                            }
                                                        })
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No redemption request record found!</i></div>
                                                    </div>
                                                }

                                                <>
                                                    {
                                                        searchResults.length > 0 ?
                                                        searchResults.map((searchResult, index) => {

                                                            const tableBodyListProps = {
                                                                redeem: searchResult,
                                                                index,
                                                                postResourceState,
                                                                dispatchPostSubResourceAction,
                                                                dispatchPostRedResourceAction,
                                                            }
                    
                                                            return (
                                                                <RedTableBodyList tableBodyListProps={tableBodyListProps} />
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
                                    SESSION.getAdminRoles() && SESSION.getAdminRoles() === 'Payment Processor' && 
                                    <>
                                        {
                                            requestArr.length === 1 && filterType === '' && filterSearchInputVal === '' && 
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No redemption request record found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length === 1 && filterType === 'all' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No redemption request record found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length === 1 && filterType === 'pending' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].pending !== undefined && requestArr[0].pending.length > 0?
                                                    requestArr[0].pending.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No pending redemption request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length === 1 && filterType === 'approved' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].approved !== undefined && requestArr[0].approved.length > 0?
                                                    requestArr[0].approved.map((redeem, index) => {
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No approved redemption request!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length === 1 && filterType === 'paid' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.filter(filterPayment => filterPayment.is_payment_sent === 1).map((redeem, index) => {

                                                        
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No paid redemption request found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length === 1 && filterType === 'notPaid' && filterSearchInputVal === ''  &&
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.filter(filterPayment => filterPayment.is_payment_sent === 0).map((redeem, index) => {

                                                        
                                    
                                                        const tableBodyListProps = {
                                                            redeem,
                                                            index,
                                                            postResourceState,
                                                            dispatchPostSubResourceAction,
                                                            dispatchPostRedResourceAction,
                                                        }
                
                                                        return (
                                                            <RedTableBodyList tableBodyListProps={tableBodyListProps} />
                                                        )
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No pending payment redemption request found!</i></div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {
                                            requestArr.length === 1 && filterSearchInputVal !== '' &&
                                            <>
                                                {
                                                    requestArr[0].total !== undefined && requestArr[0].total.length > 0?
                                                    requestArr[0].total.map((redeem, index) => {
                                    
                                                        var redeemKeys = Object.keys(redeem);

                                                        redeemKeys.map((redeemKey, index) => {

                                                            if(JSON.stringify(redeem[redeemKey]).indexOf(filterSearchInputVal) != -1) {
                                                                searchResults.push(redeem)
                                                            }
                                                        })
                                                    }):
                                                    <div className="table-empty-row-cover">
                                                        <div className="table-empty-cell-cover"><i>No redemption request record found!</i></div>
                                                    </div>
                                                }

                                                <>
                                                    {
                                                        searchResults.length > 0 ?
                                                        searchResults.map((searchResult, index) => {

                                                            const tableBodyListProps = {
                                                                redeem: searchResult,
                                                                index,
                                                                postResourceState,
                                                                dispatchPostSubResourceAction,
                                                                dispatchPostRedResourceAction,
                                                            }
                    
                                                            return (
                                                                <RedTableBodyList tableBodyListProps={tableBodyListProps} />
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
                            {/* <TableFooter>
                                <TableRow >
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={3}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter> */}
                        </DialogContent>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}
