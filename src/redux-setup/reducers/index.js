import { combineReducers } from 'redux';
import { LoginReducer } from './login-reducer';
import { LogoutReducer } from './logout-reducer';
import { DashboardReducer } from './dashboard-reducer';
import { PostResourceReducer } from './post-resource-reducer';

export const rootReducer = combineReducers({
    reducerLogin: LoginReducer,
    reducerLogout: LogoutReducer,
    reducerDashboard: DashboardReducer,
    reducerPostResource: PostResourceReducer,
});