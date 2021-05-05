import React from 'react';
import { LoginAction } from '../../redux-setup/actions/login-action';
import { connect } from 'react-redux';
import AuthLayoutComponent from './components/auth-layout-component';

function AuthView(props) {

    const { loginState, dispatchLoginAction } = props;

    const authLayoutProps = {
        loginState,
        dispatchLoginAction
    }

    console.log('loginState: ', loginState)

    return (
        <AuthLayoutComponent authLayoutProps={authLayoutProps} />
    )
}

const mapStateToProps = state => ({
    loginState: state.reducerLogin,
});

const mapDispatchToProps = dispatch => ({
    dispatchLoginAction: (params) => dispatch(LoginAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);