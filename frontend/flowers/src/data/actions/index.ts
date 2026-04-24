import {
  loginUserAction,
  logoutAction,
  registerUserAction,
} from './auth-actions';

export const actions = {
  auth: {
    registerUserAction,
    loginUserAction,
    logoutAction,
  },
};
