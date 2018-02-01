import { takeEvery, call, put } from 'redux-saga/effects';

import { LOGIN, SET_NAME } from './constants';
import {
  loginSuccess,
  loginFailed,
  setNameSuccess,
  setNameFailed,
} from './actions';

function* loginFirebase(firebase, { payload: { email, password } }) {
  try {
    yield call(firebase.login, { email, password });
    yield put(loginSuccess());
  } catch (e) {
    yield put(loginFailed(e));
  }
}

function* setNameFirebase(firebase, { payload: { name } }) {
  try {
    yield call(firebase.updateProfile, { name });
    yield put(setNameSuccess(name));
  } catch (e) {
    yield put(setNameFailed(e));
  }
}

export default function* userSaga({ firebase }) {
  yield takeEvery(LOGIN, loginFirebase, firebase);
  yield takeEvery(SET_NAME, setNameFirebase, firebase);
}
