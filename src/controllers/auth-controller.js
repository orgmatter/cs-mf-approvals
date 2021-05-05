import React from 'react';
import { Session as SESSION } from '../helpers/session';
import { Routes as ROUTES } from '../routes';
import AuthView from '../views/auth';
import { Redirect } from 'react-router-dom';

export default function AuthController(props) {

    const { match } = props;
    const { url, params } = match;

    if((url === ROUTES.index) && (!SESSION.check())) {

        return (
            <AuthView authViewProps={{match}} />
        )

    }else if((url === ROUTES.auth.login) && (!SESSION.check())) {

        return (
            <AuthView authViewProps={{match}} />
        )
    }
    return (
        <Redirect to={ROUTES.dashboard} />
    )
    
}