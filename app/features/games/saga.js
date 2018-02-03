import { select, takeEvery, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';

import { CREATE_GAME } from './constants';
import { createGameSuccess, createGameFailed } from './actions';

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
        players: [],
      },
    );
    yield put(createGameSuccess());
    yield call(onCreate);
    yield put(replace(`/games/${response.id}`));
  } catch (e) {
    yield put(createGameFailed(e));
    yield call(onError, e);
  }
}

export default function* gamesSaga({ firestore }) {
  yield takeEvery(CREATE_GAME, createGameSaga, firestore);
}
