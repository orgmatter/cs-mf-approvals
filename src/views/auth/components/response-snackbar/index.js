import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


export default function ResponseSnackbar(props) {

    const { responseSnackbarProps } = props;

    const { snackbarOpen, handleSnackbarClose, snackbarStatus } = responseSnackbarProps;

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
                severity={snackbarStatus !== '' && snackbarStatus }
            >
                {
                    snackbarStatus !== '' && snackbarStatus === 'success' && (<span>You have succesfully logged in!</span>)
                }
                {
                    snackbarStatus !== '' && snackbarStatus === 'error' && (<span>Wrong credentials, please try again!</span>)
                }
            </Alert>
        </Snackbar>
    )
}
