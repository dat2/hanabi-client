import { takeEvery, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import request from 'utils/request';
import { CREATE_GAME } from './constants';
import { createGameSuccess, createGameFailed } from './actions';

function* createGameSaga() {
  try {
    const game = yield call(request, `${process.env.API_SERVER_URL}/api/games`, { method: 'POST' });
    yield put(push(`/games/${game.id}`));
    yield put(createGameSuccess(game.id));
  } catch (e) {
    yield put(createGameFailed(e));
  }
}

export default function* defaultSaga() {
  yield takeEvery(CREATE_GAME, createGameSaga);
}
