import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SET_DISPLAY_NAME,
  SET_DISPLAY_NAME_SUCCESS,
  SET_DISPLAY_NAME_FAILED,
} from './constants';

export function login({ email, password }, onSuccess, onFail) {
  return {
    type: LOGIN,
    payload: { email, password, onSuccess, onFail },
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginFailed() {
  return {
    type: LOGIN_FAILED,
  };
}

export function setDisplayName(displayName) {
  return {
    type: SET_DISPLAY_NAME,
    payload: { displayName },
  };
}

export function setDisplayNameSuccess(displayName) {
  return {
    type: SET_DISPLAY_NAME_SUCCESS,
    payload: { displayName },
  };
}

export function setDisplayNameFailed() {
  return {
    type: SET_DISPLAY_NAME_FAILED,
  };
}
