import {
  USER_DOMAIN, USER_DATA_DOMAIN, REGISTRATION_DOMAIN, AUTH_DOMAIN,
} from '../store/user';
import {
  PENDING, DONE, FAIL, UPDATE, RESET,
  LOGGED_IN, LOGGED_OUT,
} from '../util';
import {
  login, logout, checkLoginState, signup, getUserProfile,
} from '../services/User';
import { updateStoreDataAction } from './util';

/**
 * @function  - action creator to update user state in auth domain
 * @param {string} status - status of the auth (logged in, logged out, pending...)
 * @param {string} message - message to show in the UI
 */
function updateUserAuthAction(status, message = '') {
  return updateStoreDataAction(UPDATE, {
    status, message,
  }, USER_DOMAIN, AUTH_DOMAIN);
}
/**
 * @function - action creator to update user state in registration domain
 * @param {string} status - status of the sign in action (pending, done, fail,...)
 * @param {string} message - message to show in UI
 */
function updateUserRegistrationAction(status, message = '') {
  return updateStoreDataAction(UPDATE, {
    status, message,
  }, USER_DOMAIN, REGISTRATION_DOMAIN);
}

/**
 * @function - action creator update user state in data domain
 * @param {string} type - either UPDATE or RESET
 * @param {object} data
 */
function updateUserDataAction(type, data) {
  return updateStoreDataAction(type, data, USER_DOMAIN, USER_DATA_DOMAIN);
}

/**
 * @function - check user auth state
 */
const checkUserAuthStateAction = () => async (dispatch) => {
  try {
    dispatch(updateUserAuthAction(PENDING));
    const { data } = await checkLoginState();
    const { is_login: isLogin, user_data: userData } = data;
    if (isLogin) {
      dispatch(updateUserAuthAction(LOGGED_IN));
      dispatch(updateUserDataAction(UPDATE, userData));
      return;
    }
    throw new Error();
  } catch (error) {
    dispatch(updateUserAuthAction(LOGGED_OUT));
    dispatch(updateUserDataAction(RESET, null));
  }
};

/**
 * @function - action to send user login form
 * @param {string} email
 * @param {string} password
 */
const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch(updateUserAuthAction(PENDING, ''));
    const { data } = await login(email, password);
    const { message, user_data: userData } = data;
    if (message === 'Success') {
      dispatch(updateUserAuthAction(LOGGED_IN, ''));
      dispatch(updateUserDataAction(UPDATE, userData));
      return;
    }
    throw message;
  } catch (error) {
    dispatch(updateUserDataAction(RESET, null));
    dispatch(updateUserAuthAction(LOGGED_OUT, error.toString()));
  }
};

/**
 * @function - action to log out user
 */
const logoutAction = () => async (dispatch) => {
  try {
    const { data: logoutMessage } = await logout();
    throw logoutMessage;
  } catch (error) {
    dispatch(updateUserDataAction(RESET, null));
    dispatch(updateUserAuthAction(LOGGED_OUT));
  }
};

/**
 * @function - action to get user data
 */

const getUserProfileAction = () => async (dispatch) => {
  try {
    const { data: userData } = await getUserProfile();
    dispatch(updateUserDataAction(UPDATE, userData));
  } catch (error) {
    dispatch(updateUserDataAction(RESET, null));
  }
};

/**
 * @function - action to send user's sign-up form
 * @param {string} name
 * @param {string} email
 * @param {string} details
 * @param {string} city
 * @param {string} password
 */
const signupAction = (name, email, details, city, password) => async (dispatch) => {
  try {
    dispatch(updateUserRegistrationAction(PENDING, ''));
    const { data: message } = await signup(name, email, details, city, password);
    if (message === 'ok') {
      dispatch(updateUserRegistrationAction(
        DONE,
        `Your account has been registered. 
        You will be redirected to login page shortly`,
      ));
      return;
    }
    throw message;
  } catch (error) {
    dispatch(updateUserRegistrationAction(FAIL, error.toString()));
  }
};

export {
  checkUserAuthStateAction, loginAction, logoutAction, getUserProfileAction, signupAction,
};
