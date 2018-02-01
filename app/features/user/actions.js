import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SET_NAME,
  SET_NAME_SUCCESS,
  SET_NAME_FAILED,
} from './constants';

export function login({ email, password }) {
  return {
    type: LOGIN,
    payload: { email, password },
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

export function setName(name) {
  return {
    type: SET_NAME,
    payload: { name },
  };
}

export function setNameSuccess(name) {
  return {
    type: SET_NAME_SUCCESS,
    payload: { name },
  };
}

export function setNameFailed() {
  return {
    type: SET_NAME_FAILED,
  };
}
