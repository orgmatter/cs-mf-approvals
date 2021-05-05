import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ResponseSnackbar from '../response-snackbars';

export default function DeclineModal(props) {

    const { declineModalProps } = props;
    const { 
        dialogOpen, 
        handleDialogClose, 
        dialogReasonProps, 
        dispatchPostRedResourceAction, 
        postResourceState, 
        responseSnackbarProps,
        handleModalInputChange, 
        handleModalSubmit, 
        isAnyModalFieldEmpty,
        reasonInputVal
    } = declineModalProps;

    console.log('modal state: ', postResourceState);

    // alert(dialogOpen)

    return (
        <>
            <Dialog 
                className="dialog-cover"
                open={postResourceState.status !== '' && postResourceState.status == 'success' ? false : dialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle className="dialog-title-cover">
                    <div className="dialog-title-cover-flex">
                        <div className="dialog-title-text-cover">
                            <h2 className="dialog-title-text">Reason for decline</h2>
                        </div>
                        <div className="dialog-close-btn-cover">
                            <IconButton 
                                className="icon-btn-cover"
                                onClick={handleDialogClose}
                            >
                                <CloseIcon className="close-btn-icon" />
                            </IconButton>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent className="dialog-content-cover">
                    <div className="dialog-form-cover-flex">
                        <div className="dialog-form-cover-item">
                            <form className="dialog-form" id="" method="post" onSubmit={handleModalSubmit}>
                                <div className="form-input-cover-flex">
                                    <div className="form-input-cover-item">
                                        <TextField 
                                            className="form-input"
                                            id="reason-input"
                                            name="reasonText"
                                            multiline
                                            variant="outlined"
                                            value={reasonInputVal.reasonText}
                                            onChange={handleModalInputChange}
                                            placeholder="What's the reasons for the decline?"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-btn-cover-flex">
                                    <div className="form-btn-cover-item">
                                        <Button
                                            className={isAnyModalFieldEmpty() ? 'form-btn form-btn-disabled' : 'form-btn form-btn-enabled'}
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            disabled={isAnyModalFieldEmpty()}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {/* <ResponseSnackbar responseSnackbarProps={newResponseSnackbarProps} /> */}
        </>
    )
}