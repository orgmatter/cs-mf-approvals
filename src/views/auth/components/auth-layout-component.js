import React, { useState, useEffect } from 'react';
import LoginComponent from './login-component';
import ResponseSnackbar from './response-snackbar';

export default function AuthLayoutComponent(props) {

    const { authLayoutProps } = props;

    const {
        loginState,
        dispatchLoginAction,
    } = authLayoutProps; 

    const loginComponentProps = authLayoutProps;

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarStatus, setSnackbarStatus] = useState('');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    useEffect(() => {
        
        if(loginState.isLogin !== '' && !loginState.isLogin && loginState.status === 'failed') {

            setSnackbarOpen(true);
            setSnackbarStatus('error');

        }else if(loginState.isLogin !== '' && loginState.isLogin && loginState.status === 'success') {

            setSnackbarOpen(true);
            setSnackbarStatus('success');
        }

    }, [loginState.isLogin !== '' && !loginState.isLogin ? false : loginState.isLogin])


    const responseSnackbarProps = {
        snackbarOpen,
        handleSnackbarClose,
        snackbarStatus,
    }

    return (
        <div className="auth-layout-component-container">
            <ResponseSnackbar responseSnackbarProps={responseSnackbarProps} />
            <div className="auth-layout-component-flex">
                <div className="auth-layout-component-item">
                    <LoginComponent loginComponentProps={loginComponentProps} />
                </div>
            </div>
        </div>
    )
}