import { takeEvery, call, put, select } from 'redux-saga/effects';
import { replace } from 'react-router-redux';

import request from 'utils/request';
import { SET_NAME, FETCH_GAMES, CREATE_GAME, JOIN_GAME } from './constants';
import {
  setNameSuccess,
  setNameFailed,
  fetchGamesSuccess,
  fetchGamesFailed,
  createGameSuccess,
  createGameFailed,
  joinGameSuccess,
  joinGameFailed
} from './actions';

function* setNameSaga({ payload: { name } }) {
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

function* fetchGamesSaga() {
  try {
    const response = yield call(
      request,
      `${process.env.API_SERVER_ORIGIN}/api/games/`,
      { method: 'GET', credentials: 'include' }
    );
    yield put(fetchGamesSuccess(response.games));
  } catch (e) {
    yield put(fetchGamesFailed(response.games));
  }
}

function* createGameSaga({ payload: { values, onCreate, onError } }) {
  try {
    const response = yield call(
      request,
      `${process.env.API_SERVER_ORIGIN}/api/games`,
      {
        method: 'POST',
        body: JSON.stringify(values),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        credentials: 'include'
      }
    );
    yield put(createGameSuccess(response.game));
    yield call(onCreate);
    yield put(replace(`/games/${response.game.id}`));
  } catch (e) {
    yield call(onError, e);
    yield put(createGameFailed(e));
  }
}

function* joinGameSaga({ payload: { gameId } }) {
  try {
    yield call(
      request,
      `${process.env.API_SERVER_ORIGIN}/api/games/${gameId}/join`,
      { method: 'POST', credentials: 'include' }
    );
    yield put(joinGameSuccess(gameId));
  } catch (e) {
    yield put(joinGameFailed(e));
  }
}

export default function* defaultSaga() {
  yield takeEvery(SET_NAME, setNameSaga);
  yield takeEvery(FETCH_GAMES, fetchGamesSaga);
  yield takeEvery(CREATE_GAME, createGameSaga);
  yield takeEvery(JOIN_GAME, joinGameSaga);
}
