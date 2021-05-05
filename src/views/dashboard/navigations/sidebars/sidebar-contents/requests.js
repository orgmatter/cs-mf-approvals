import React from 'react';
import RequestTabs from './sub-content-tabs/request-tabs';

export default function Requests(props) {

    const { requestProps } = props;

    const {
        dashboardState,
        postResourceState,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
    } = requestProps;

    const requestTabProps = {
        dashboardState,
        postResourceState,
        dispatchPostSubResourceAction,
        dispatchPostRedResourceAction,
    }
    
    return (
        <div className="approvals-cover-flex">
            <div className="approvals-cover-item">
                <RequestTabs requestTabProps={requestTabProps} />
            </div>
        </div>
    )
}