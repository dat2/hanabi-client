import { select, takeEvery, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';

import { FETCH_GAMES, CREATE_GAME, JOIN_GAME } from './constants';
import {
  fetchGamesSuccess,
  fetchGamesFailed,
  createGameSuccess,
  createGameFailed,
  joinGameSuccess,
  joinGameFailed,
} from './actions';

function* createGameSaga(
  firestore,
  { payload: { values, onCreate, onError } },
) {
  try {
    const uid = yield select((state) => state.firebase.auth.uid);
    const response = yield call(
      firestore.add,
      { collection: 'games' },
      {
        creator: uid,
        ...values,
      },
    );
    yield put(createGameSuccess());
    yield call(onCreate);
    yield put(replace(`/games/${response.id}`));
  } catch (e) {
    console.error(e);
    yield put(createGameFailed(e));
    yield call(onError, e);
  }
}

function* fetchGamesSaga() {
  try {
    yield put(fetchGamesSuccess(response.games));
  } catch (e) {
    yield put(fetchGamesFailed());
  }
}

function* joinGameSaga({ payload: { gameId } }) {
  try {
    yield call(
      request,
      `${process.env.API_SERVER_ORIGIN}/api/games/${gameId}/join`,
      { method: 'POST', credentials: 'include' },
    );
    yield put(joinGameSuccess(gameId));
  } catch (e) {
    yield put(joinGameFailed(e));
  }
}

export default function* gamesSaga({ firestore }) {
  yield takeEvery(CREATE_GAME, createGameSaga, firestore);
  // yield takeEvery(FETCH_GAMES, fetchGamesSaga);
  // yield takeEvery(JOIN_GAME, joinGameSaga);
}
