import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Session as SESSION  } from '../../../../../../../helpers/session';
import Button from '@material-ui/core/Button';
import DeclineModal from '../modals/decline-modal';
import ResponseSnackbar from '../response-snackbars';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogContent from '@material-ui/core/DialogContent';

export default function SubTableBodyList(props) {

    const { tableBodyListProps } = props;
    const { 
        subscribe, 
        index, 
        postResourceState,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction, 
    } = tableBodyListProps;

    var newIndex = index+1;

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

    const [dialogReasonProps, setDialogReasonProps] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [postResourceType, setPostResourceType] = useState('')
    const [reasonInputVal, setReasonInputVal] = useState({reasonText: ''});

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
            id: subscribe.id,
            level: getApprovalLevels(SESSION.getAdminRoles()),
            status: 2,
            approved_by: SESSION.getStaff().name,
            comments: '',
        }

        setDialogReasonProps(params);
        setDialogOpen(true);

    }

    const handleApproveBtnClick = (e) => {
        e.preventDefault();

        const params = {
            id: subscribe.id,
            level: getApprovalLevels(SESSION.getAdminRoles()),
            status: 1,
            approved_by: SESSION.getStaff().name,
            comments: ''
        }

        dispatchPostSubResourceAction(params);

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

        dispatchPostSubResourceAction(newDialogReasonProps);

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
        dispatchPostSubResourceAction,
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
                    <div className="table-body-list-item-cover">
                        <div className="table-body-list-item-cover-flex">
                            <div className="table-body-list-item-cover-item">
                                <div className="table-body-list-item">{newIndex}</div>
                                <div className="table-body-list-item">{subscribe.fullname}</div>
                                <div className="table-body-list-item" style={{color: 'darkgreen'}}>{`${parseFloat(subscribe.units).toFixed(2)}`}</div>
                                {
                                    SESSION.getAdminRoles() === 'Line Manager Approval' && 
                                    <>
                                        <div className="table-body-list-item">{subscribe.lm_approval_status === null? 'pending' : subscribe.lm_approval_status}</div>
                                        <div className="table-body-list-item">{subscribe.line_manager_approval === null? 'Nil' : subscribe.line_manager_approval}</div>
                                    </>
                                }
                                {
                                    SESSION.getAdminRoles() === 'Divisional Manager Approval' && 
                                    <>
                                        <div className="table-body-list-item">{subscribe.dh_approval_status === null? 'pending' : subscribe.dh_approval_status}</div>
                                        <div className="table-body-list-item">{subscribe.divisional_manager_approval === null? 'Nil' : subscribe.divisional_manager_approval}</div>
                                    </>
                                }
                                <div className="table-body-list-item">{subscribe.fund_code}</div>
                                <div className="table-body-list-item">{new Date(subscribe.createdDate).toDateString()}</div>
                            </div>
                        </div>
                    </div>
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
                                                    {subscribe.fullname}
                                                </div>
                                            </div>
                                            <div className="content-cover-flex">
                                                <div className="content-cover-item">
                                                    <b>Units:</b>
                                                </div>
                                                <div className="content-cover-item" style={{color: 'darkgreen'}}>
                                                    {`${parseFloat(subscribe.units).toFixed(2)}`}
                                                </div>
                                            </div>
                                            <div className="content-cover-flex">
                                                <div className="content-cover-item">
                                                    <b>Account No:</b>
                                                </div>
                                                <div className="content-cover-item">
                                                    {subscribe.ixtrac_id === null? 'Nil' : subscribe.ixtrac_id}
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
                                                        {subscribe.lm_approval_status !== null && subscribe.lm_approval_status}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>LM Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {subscribe.lm_approval_status !== null? subscribe.line_manager_approval: 'Nil'}
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
                                                        {subscribe.lm_approval_status !== null? subscribe.lm_approval_status: 'pending'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>LM Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {subscribe.lm_approval_status !== null? subscribe.line_manager_approval: 'Nil'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>DH Approval Status:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {subscribe.dh_approval_status !== null? subscribe.dh_approval_status: 'pending'}
                                                    </div>
                                                </div>
                                                <div className="content-cover-flex">
                                                    <div className="content-cover-item">
                                                        <b>DH Approval Officer:</b>
                                                    </div>
                                                    <div className="content-cover-item">
                                                        {subscribe.dh_approval_status !== null? subscribe.divisional_manager_approval: 'Nil'}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="accordion-details-content-cover-item">
                                        <div className="details-content-cover-flex">
                                            <div className="content-cover-flex">
                                                <div className="content-cover-item">
                                                    <b>Date Received:</b>
                                                </div>
                                                <div className="content-cover-item">
                                                    {new Date(subscribe.createdDate).toDateString()}
                                                </div>
                                            </div>
                                        </div>
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
                                        disabled={subscribe.lm_approval_status !== null && subscribe.lm_approval_status}
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
                                        disabled={subscribe.lm_approval_status !== null && subscribe.lm_approval_status}
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
                                        disabled={subscribe.dh_approval_status !== null && subscribe.dh_approval_status}
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
                                        disabled={subscribe.dh_approval_status !== null && subscribe.dh_approval_status}
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