import React from 'react';
import AuthController from './controllers/auth-controller';
import DashboardController from './controllers/dashboard-controller';
import { Routes as ROUTES } from './routes';
import { Provider } from 'react-redux';
import { Store } from './redux-setup/store';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  // localStorage.clear();
  return (
    <div className="app-container">
      <Provider store={Store}>
          <Router>
              <Switch>
                  <Route exact path={ROUTES.index} render={(props) => <AuthController {...props} />} /> 
                  <Route path={ROUTES.auth.login} render={(props) => <AuthController {...props} />} /> 
                  <Route path={ROUTES.dashboard} render={(props) => <DashboardController {...props} />} /> 
              </Switch>
          </Router>
      </Provider>
    </div>
  );
}

export default App;
