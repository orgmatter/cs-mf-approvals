import React from 'react';
import { Session as SESSION } from '../helpers/session';
import { Routes as ROUTES } from '../routes';
import DashboardView from '../views/dashboard';
import { Redirect } from 'react-router-dom';

export default function AuthController(props) {

    const { match } = props;
    const { url, params } = match;

    if((url === ROUTES.dashboard) && (SESSION.check())) {

        return (
            <DashboardView dashboardViewProps={{match}} />
        )
    }
    return (
        <Redirect to={ROUTES.index} />
    )
    
}