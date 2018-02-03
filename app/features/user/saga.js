import { takeEvery, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';

import { LOGIN, SET_DISPLAY_NAME } from './constants';
import {
  loginSuccess,
  loginFailed,
  setDisplayNameSuccess,
  setDisplayNameFailed,
} from './actions';

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
  yield takeEvery(LOGIN, loginFirebase, firebase);
  yield takeEvery(SET_DISPLAY_NAME, setDisplayNameFirebase, firebase);
}
