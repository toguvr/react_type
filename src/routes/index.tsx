import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Route from './Route';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

export const routes = {
  signin: '/',
  signup: '/signup',
  dashboard: '/dashboard',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
};

const Routes: React.FC = () => (
  <Switch>
    <Route path={routes.signup} component={SignUp} />
    <Route path={routes.dashboard} component={Dashboard} isPrivate />
    <Route path={routes.forgotPassword} component={ForgotPassword} />
    <Route path={routes.resetPassword} component={ResetPassword} />

    <Route path={routes.signin} component={SignIn} />
  </Switch>
);

export default Routes;
