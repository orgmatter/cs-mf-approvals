import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


export default function ResponseSnackbar(props) {

    const { responseSnackbarProps } = props;

    const { snackbarOpen, handleSnackbarClose, postResourceType, status } = responseSnackbarProps;

    console.log('snackbarOpen: ', snackbarOpen)

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <Snackbar 
            open={snackbarOpen}
            onClose={handleSnackbarClose}
            autoHideDuration={6000}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            key={'top' + 'horizontal'}
        >
            <Alert
                onClose={handleSnackbarClose}
                severity={status !== '' && status !== 'success'? 'error' : status}
            >
                {
                    postResourceType && postResourceType === 'approve' && (<span>This request is successfully approved!</span>)
                }
                {
                    postResourceType && postResourceType === 'decline' && (<span>This request is successfully declined!</span>)
                }
            </Alert>
        </Snackbar>
    )
}
