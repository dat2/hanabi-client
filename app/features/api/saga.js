import { takeEvery, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import request from 'utils/request';
import { SET_NAME, CREATE_GAME } from './constants';
import {
  setNameSuccess,
  setNameFailed,
  createGameSuccess,
  createGameFailed
} from './actions';

function* setNameSaga({ payload: { name } }) {
  console.log('setNameSaga', name);
  try {
    const game = yield call(
      request,
      `${process.env.API_SERVER_ORIGIN}/api/name`,
      {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        credentials: 'include'
      }
    );
    yield put(setNameSuccess(name));
  } catch (e) {
    yield put(setNameFailed(e));
  }
}

function* createGameSaga() {
  try {
    const game = yield call(
      request,
      `${process.env.API_SERVER_ORIGIN}/api/games`,
      { method: 'POST', credentials: 'include' }
    );
    yield put(push(`/games/${game.id}`));
    yield put(createGameSuccess(game.id));
  } catch (e) {
    yield put(createGameFailed(e));
  }
}

export default function* defaultSaga() {
  yield takeEvery(SET_NAME, setNameSaga);
  yield takeEvery(CREATE_GAME, createGameSaga);
}
