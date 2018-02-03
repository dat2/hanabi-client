import { takeEvery, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';

import { REGISTER, LOGIN, SET_DISPLAY_NAME } from './constants';
import {
  registerSuccess,
  registerFailed,
  loginSuccess,
  loginFailed,
  setDisplayName,
  setDisplayNameSuccess,
  setDisplayNameFailed,
} from './actions';

function* registerFirebase(
  firebase,
  { payload: { username, email, password, onSuccess, onFail } },
) {
  try {
    yield call(firebase.createUser, { email, password });
    yield put(registerSuccess());
    yield call(onSuccess);
    yield put(setDisplayName(username));
    yield put(replace('/'));
  } catch (e) {
    yield put(registerFailed(e));
    yield call(onFail, e);
  }
}

function* loginFirebase(
  firebase,
  { payload: { email, password, onSuccess, onFail } },
) {
  try {
    yield call(firebase.login, { email, password });
    yield put(loginSuccess());
    yield call(onSuccess);
    yield put(replace('/'));
  } catch (e) {
    yield put(loginFailed(e));
    yield call(onFail, e);
  }
}

function* setDisplayNameFirebase(firebase, { payload: { displayName } }) {
  try {
    yield call(firebase.updateProfile, { displayName });
    yield put(setDisplayNameSuccess(displayName));
  } catch (e) {
    yield put(setDisplayNameFailed(e));
  }
}

export default function* userSaga({ firebase }) {
  yield takeEvery(REGISTER, registerFirebase, firebase);
  yield takeEvery(LOGIN, loginFirebase, firebase);
  yield takeEvery(SET_DISPLAY_NAME, setDisplayNameFirebase, firebase);
}
