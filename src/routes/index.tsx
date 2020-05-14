import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Route from './Route';

export const routes = {
  signin: '/',
  signup: '/signup',
  dashboard: '/dashboard',
};

const Routes: React.FC = () => (
  <Switch>
    <Route path="/repository" component={Repository} />
    <Route path={routes.signup} component={SignUp} />
    <Route path={routes.dashboard} component={Dashboard} isPrivate />
    <Route path={routes.signin} component={SignIn} />
  </Switch>
);

export default Routes;
