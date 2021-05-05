import React, { useState, useEffect } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import DeclineModal from '../modals/decline-modal';
import ResponseSnackbar from '../response-snackbars';
import { Session as SESSION  } from '../../../../../../../helpers/session';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import DialogContent from '@material-ui/core/DialogContent';

export default function RedTableBodyList(props) {

    const { tableBodyListProps } = props;
    const { 
        redeem, 
        index, 
        postResourceState,
        dispatchPostRedResourceAction, 
    } = tableBodyListProps;

    var newIndex = index+1;

    const [dialogReasonProps, setDialogReasonProps] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [postResourceType, setPostResourceType] = useState('')
    const [reasonInputVal, setReasonInputVal] = useState({reasonText: ''});


    const getApprovalLevels = (adminRole) => {

        if(SESSION.check()) {

            if(adminRole === 'Line Manager Approval') {
                return 1;
            }
            if(adminRole === 'Divisional Manager Approval') {
                return 2;
            }
            if(adminRole === 'Fund Manager Approval') {
                return 3;
            }
            if(adminRole === 'Payment Processor') {
                return 4;
            }
        }
    }

    const handleDialogClose = () => {
        setDialogOpen(false)
    }
    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const handleDeclineBtnClick = (e) => {
        e.preventDefault();

        setPostResourceType('decline');

        const params = {
            id: redeem.id,
            CAMID: redeem.cam_id,
            fundCode: redeem.fund_code,
            withdrawal_amount: redeem.withdrawal_amount,
            approval_status: 2,
            approval_level: getApprovalLevels(SESSION.getAdminRoles()),
            comments: 'test comment',
            approved_by: SESSION.getStaff().name,
        }

        setDialogReasonProps(params);
        setDialogOpen(true);

    }

    const handleApproveBtnClick = (e) => {
        e.preventDefault();

        setPostResourceType('approve');

        const params = {
            id: redeem.id,
            CAMID: redeem.cam_id,
            fundCode: redeem.fund_code,
            withdrawal_amount: redeem.withdrawal_amount,
            approval_status: 1,
            approval_level: getApprovalLevels(SESSION.getAdminRoles()),
            comments: 'test comment',
            approved_by: SESSION.getStaff().name,
        }

        dispatchPostRedResourceAction(params);

        if(postResourceState && postResourceState.status !== '') {
            setSnackbarOpen(true)
        }
    }


    // --> start code for dialog modal
    const handleModalInputChange = (e) => {
        e.preventDefault();

        setReasonInputVal(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleModalSubmit = (e) => {
        e.preventDefault();

        const newDialogReasonProps = {
            ...dialogReasonProps,
            comments: reasonInputVal.reasonText,
        }

        dispatchPostRedResourceAction(newDialogReasonProps);

        if(postResourceState && postResourceState.status !== '') {
            setSnackbarOpen(true)
        }
        if(postResourceState && postResourceState.status == 'success') {
            handleDialogClose()
        }
    }

    const isAnyModalFieldEmpty = () => {
        
        if(reasonInputVal.reasonText !== '') {
            return false;
        }
        return true;
    }
    // --> end of dialog modal code block

    const responseSnackbarProps = {
        snackbarOpen,
        handleSnackbarClose,
        postResourceType,
        status: postResourceState.status,
    }

    const declineModalProps = {
        dialogOpen,
        handleDialogClose,
        dialogReasonProps,
        postResourceState,
        dispatchPostRedResourceAction,
        responseSnackbarProps,
        handleModalInputChange, 
        handleModalSubmit, 
        isAnyModalFieldEmpty,
        reasonInputVal
    }
    
    return (
        <div className="table-body-list-cover" key={index}>
            <DeclineModal declineModalProps={declineModalProps} />
            <ResponseSnackbar responseSnackbarProps={responseSnackbarProps} />
            <Accordion className="accordion-cover">
                <AccordionSummary
                    className="accordion-summary-cover"
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                >
                    {
                        SESSION.getAdminRoles() !== 'Line Manager Approval' && SESSION.getAdminRoles() !== 'Divisional Manager Approval' ?
                        <div className="table-body-list-item-cover">
                            <div className="table-body-list-item-cover-flex">
                                <div className="table-body-list-item-cover-item">
                                    <div className="table-body-list-item">{newIndex}</div>
                                    <div className="table-body-list-item">{redeem.fullname}</div>
                                    <div className="table-body-list-item" style={{color: 'red'}}>{`${redeem.equivalent_units}`}</div>
                                    {
                                        SESSION.getAdminRoles() === 'Fund Manager Approval' && 
                                        <>
                                            <div className="table-body-list-item">{redeem.fm_approval_status !== null? redeem.fm_approval_status : 'Nil'}</div>
                                            <div className="table-body-list-item">{redeem.fm_approved_by === null? 'Nil' : redeem.fm_approved_by}</div>
                                        </>
                                    }
                                    {
                                        SESSION.getAdminRoles() === 'Payment Processor' && 
                                        <>
                                            <div className="table-body-list-item">{redeem.pp_approval_status !== null? redeem.pp_approval_status : 'Nil'}</div>
                                            <div className="table-body-list-item">{redeem.pp_approved_by === null? 'Nil' : redeem.pp_approved_by}</div>
                                        </>
                                    }
                                    <div className="table-body-list-item">{redeem.fund_code}</div>
                                    <div className="table-body-list-item">{new Date(redeem.createdDate).toDateString()}</div>
                                    <div className="table-body-list-item">{''}</div>
                                </div>
                            </div>
                        </div>:
                        <div className="table-body-list-item-cover">
                            <div className="table-body-list-item-cover-flex">
                                <div className="table-body-list-item-cover-item">
                                    <div className="table-body-list-item">{newIndex}</div>
                                    <div className="table-body-list-item">{redeem.fullname}</div>
                                    <div className="table-body-list-item" style={{color: 'red'}}>{`${redeem.equivalent_units}`}</div>
                                    {
                                        SESSION.getAdminRoles() === 'Line Manager Approval' && 
                                        <>
                                            <div className="table-body-list-item">{redeem.lm_approval_status === null? 'pending' : redeem.lm_approval_status}</div>
                                            <div className="table-body-list-item">{redeem.lm_approved_by === null? 'Nil' : redeem.lm_approved_by}</div>
                                        </>
                                    }
                                    {
                                        SESSION.getAdminRoles() === 'Divisional Manager Approval' && 
                                        <>
                                            <div className="table-body-list-item">{redeem.dh_approval_status !== null? redeem.dh_approval_status : 'Nil'}</div>
                                            <div className="table-body-list-item">{redeem.dh_approved_by === null? 'Nil' : redeem.dh_approved_by}</div>
                                        </>
                                    }
                                    <div className="table-body-list-item">{redeem.fund_code}</div>
                                    {
                                        SESSION.getAdminRoles() === 'Line Manager Approval' && 
                                        <div className="table-body-list-item">{new Date(redeem.createdDate).toDateString()}</div>
                                    }
                                    {
                                        SESSION.getAdminRoles() === 'Divisional Manager Approval' && 
                                        <div className="table-body-list-item">{new Date(redeem.lm_approved_date).toDateString()}</div>
                                    }
                                    {
                                        SESSION.getAdminRoles() === 'Fund Manager Approval' && 
                                        <div className="table-body-list-item">{new Date(redeem.dh_approved_date).toDateString()}</div>
                                    }
                                    {
                                        SESSION.getAdminRoles() === 'Payment Processor' && 
                                        <div className="table-body-list-item">{new Date(redeem.fm_approved_date).toDateString()}</div>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </AccordionSummary>
                <AccordionDetails className="accordion-details-cover">
                    <div className="table-body-list-item-cover">
                        <div className="table-body-list-item-cover-flex">
                            <div className="table-body-list-item-cover-item">
                                <div className="accordion-details-content-cover-flex">
                                    <div className="accordion-details-content-cover-item">
                                        <div className="details-content-cover-flex">
                                            <div className="content-cover-flex">
                                                <div className="content-cover-item">
                                                    <b>FullName:</b>
                                                </div>
                                                <div className="content-cover-item">
                                                    {redeem.fullname}
                                                </div>
                                            </div>
                                            <div className="content-cover-flex">
                                                <div className="content-cover-item">
                                                    <b>Units:</b>
                                                </div>
                                                <div className="content-cover-item" style={{color: 'red'}}>
                                                    {`${redeem.equivalent_units}`}
                                                </div>
                                            </div>
                                            <div className="content-cover-flex">
                                                <div className="content-cover-item">
                                                    <b>Account No:</b>
                                                </div>
                                                <div className="content-cover-item">
                                                    {redeem.ixtrac_id === null? 'Nil' : redeem.ixtrac_id}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-details-content-cover-item">
                                        {
                                            SESSION.getAdminRoles() === 'Line Manager Approval' &&
                                            <div className="details-content-cover-flex">
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>LM Approval Status:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.lm_approval_status !== null? redeem.lm_approval_status: 'Nil'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>LM Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.lm_approval_status !== null? redeem.lm_approved_by: 'Nil'}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            SESSION.getAdminRoles() === 'Divisional Manager Approval' &&
                                            <div className="details-content-cover-flex">
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>LM Approval Status:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.lm_approval_status !== null? redeem.lm_approval_status: 'pending'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>LM Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.lm_approval_status !== null? redeem.lm_approved_by: 'Nil'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>DH Approval Status:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.dh_approval_status !== null? redeem.dh_approval_status: 'pending'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>DH Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.dh_approval_status !== null? redeem.dh_approved_by: 'Nil'}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            SESSION.getAdminRoles() === 'Fund Manager Approval' &&
                                            <div className="details-content-cover-flex">
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>LM Approval Status:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.lm_approval_status !== null? redeem.lm_approval_status: 'pending'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>LM Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.lm_approval_status !== null? redeem.lm_approved_by: 'Nil'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>DH Approval Status:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.dh_approval_status !== null? redeem.dh_approval_status: 'pending'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>DH Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.dh_approval_status !== null? redeem.dh_approved_by: 'Nil'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>FM Approval Status:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.fm_approval_status !== null? redeem.fm_approval_status: 'pending'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>FM Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.fm_approval_status !== null? redeem.fm_approved_by: 'Nil'}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            SESSION.getAdminRoles() === 'Payment Processor' &&
                                            <div className="details-content-cover-flex">
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>LM Approval Status:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.lm_approval_status !== null? redeem.lm_approval_status: 'pending'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>LM Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.lm_approval_status !== null? redeem.lm_approved_by: 'Nil'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>DH Approval Status:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.dh_approval_status !== null? redeem.dh_approval_status: 'pending'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>DH Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.dh_approval_status !== null? redeem.dh_approved_by: 'Nil'}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="accordion-details-content-cover-item">
                                        {
                                            SESSION.getAdminRoles() === 'Payment Processor'?
                                            <div className="details-content-cover-flex">
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>FM Approval Status:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.fm_approval_status !== null && redeem.fm_approval_status}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>FM Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.fm_approval_status !== null? redeem.fm_approved_by: 'Nil'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>PP Approval Status:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.pp_approval_status !== null && redeem.pp_approval_status}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>PP Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {redeem.pp_approval_status !== null? redeem.pp_approved_by: 'Nil'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>Date Received:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {new Date(redeem.createdDate).toDateString()}
                                                    </div>
                                                </div>
                                            </div>:
                                            <div className="details-content-cover-flex">
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>Date Received:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {new Date(redeem.createdDate).toDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
                <Divider />
                <AccordionActions className="accordion-action-cover">
                    {
                        SESSION.getAdminRoles() === 'Line Manager Approval' &&
                        <>
                            <div className="btn-cover-flex">
                                <div className="btn-cover-item">
                                    <Button
                                        className="table-btn table-btn-approve"
                                        color="primary"
                                        variant="contained"
                                        onClick={handleApproveBtnClick}
                                        disabled={redeem.lm_approval_status !== null && redeem.lm_approval_status}
                                    >
                                        Approve
                                    </Button>
                                </div>
                            </div>
                            <div className="btn-cover-flex">
                                <div className="btn-cover-item">
                                    <Button
                                        className="table-btn table-btn-decline"
                                        color="primary"
                                        variant="contained"
                                        onClick={handleDeclineBtnClick}
                                        disabled={redeem.lm_approval_status !== null && redeem.lm_approval_status}
                                    >
                                        Decline
                                    </Button>
                                </div>
                            </div>
                        </>
                    }
                    {
                        SESSION.getAdminRoles() === 'Divisional Manager Approval' &&
                        <>
                            <div className="btn-cover-flex">
                                <div className="btn-cover-item">
                                    <Button
                                        className="table-btn table-btn-approve"
                                        color="primary"
                                        variant="contained"
                                        onClick={handleApproveBtnClick}
                                        disabled={redeem.dh_approval_status !== null && redeem.dh_approval_status}
                                    >
                                        Approve
                                    </Button>
                                </div>
                            </div>
                            <div className="btn-cover-flex">
                                <div className="btn-cover-item">
                                    <Button
                                        className="table-btn table-btn-decline"
                                        color="primary"
                                        variant="contained"
                                        onClick={handleDeclineBtnClick}
                                        disabled={redeem.dh_approval_status !== null && redeem.dh_approval_status}
                                    >
                                        Decline
                                    </Button>
                                </div>
                            </div>
                        </>
                    }
                    {
                        SESSION.getAdminRoles() === 'Fund Manager Approval' &&
                        <>
                            <div className="btn-cover-flex">
                                <div className="btn-cover-item">
                                    <Button
                                        className="table-btn table-btn-approve"
                                        color="primary"
                                        variant="contained"
                                        onClick={handleApproveBtnClick}
                                        disabled={redeem.fm_approval_status !== null && redeem.fm_approval_status}
                                    >
                                        Approve
                                    </Button>
                                </div>
                            </div>
                            <div className="btn-cover-flex">
                                <div className="btn-cover-item">
                                    <Button
                                        className="table-btn table-btn-decline"
                                        color="primary"
                                        variant="contained"
                                        onClick={handleDeclineBtnClick}
                                        disabled={redeem.fm_approval_status !== null && redeem.fm_approval_status}
                                    >
                                        Decline
                                    </Button>
                                </div>
                            </div>
                        </>
                    }
                    {
                        SESSION.getAdminRoles() === 'Payment Processor' &&
                        <>
                            <div className="btn-cover-flex">
                                <div className="btn-cover-item">
                                    <Button
                                        className="table-btn table-btn-approve"
                                        color="primary"
                                        variant="contained"
                                        onClick={handleApproveBtnClick}
                                        disabled={redeem.pp_approval_status !== null && redeem.pp_approval_status}
                                    >
                                        Approve
                                    </Button>
                                </div>
                            </div>
                            <div className="btn-cover-flex">
                                <div className="btn-cover-item">
                                    <Button
                                        className="table-btn table-btn-decline"
                                        color="primary"
                                        variant="contained"
                                        onClick={handleDeclineBtnClick}
                                        disabled={redeem.pp_approval_status !== null && redeem.pp_approval_status}
                                    >
                                        Decline
                                    </Button>
                                </div>
                            </div>
                        </>
                    }
                </AccordionActions>
            </Accordion>
        </div>
    )
}