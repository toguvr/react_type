import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Route from './Route';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';

export const routes = {
  dashboard: '/dashboard',
  profile: '/profile',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  signin: '/',
};

const Routes: React.FC = () => (
  <Switch>
    <Route path={routes.dashboard} component={Dashboard} isPrivate />
    <Route path={routes.profile} component={Profile} isPrivate />
    <Route path={routes.signup} component={SignUp} />
    <Route path={routes.forgotPassword} component={ForgotPassword} />
    <Route path={routes.resetPassword} component={ResetPassword} />

    <Route path={routes.signin} component={SignIn} />
  </Switch>
);

export default Routes;
