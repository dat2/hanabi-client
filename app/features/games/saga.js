import { select, takeEvery, call, put } from 'redux-saga/effects';
import { goBack, replace } from 'react-router-redux';

import { CREATE_GAME, JOIN_GAME } from './constants';
import {
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
    const doc = yield call(
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
    yield put(replace(`/games/${doc.id}`));
  } catch (e) {
    yield put(createGameFailed(e));
    yield call(onError, e);
  }
}

function* joinGameSaga(firestore, { payload: { gameId } }) {
  try {
    const uid = yield select((state) => state.firebase.auth.uid);
    const displayName = yield select(
      (state) => state.firebase.auth.displayName,
    );
    const game = yield call(firestore.get, `games/${gameId}`);
    const data = yield call([game, game.data]);
    if (data.players.length >= 5) {
      throw new Error('Cant join');
    }
    if (data.players.find((p) => p.uid === uid) === -1) {
      yield call(firestore.update, `games/${gameId}`, {
        players: data.players.concat([{ uid, displayName, hand: [] }]),
      });
    }
    yield put(joinGameSuccess(gameId));
  } catch (e) {
    yield put(joinGameFailed(e));
    yield put(goBack());
  }
}

export default function* gamesSaga({ firestore }) {
  yield takeEvery(CREATE_GAME, createGameSaga, firestore);
  yield takeEvery(JOIN_GAME, joinGameSaga, firestore);
}
