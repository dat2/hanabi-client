import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as R from 'ramda';
import shuffle from 'shuffle-array';

import {
  START_GAME,
  GIVE_COLOUR_INFO,
  GIVE_NUMBER_INFO,
  DISCARD,
  PLAY,
} from './constants';
import { initializeGame, dealCard, setNextPlayer } from './actions';
import { selectPlayers } from './selectors';

function generateDeck() {
  const numberDistribution = [[1, 3], [2, 2], [3, 2], [4, 2], [5, 1]];
  const numbers = R.flatten(R.map(R.apply(R.repeat), numberDistribution));
  const colours = ['white', 'yellow', 'green', 'blue', 'red'];
  return R.map(
    ([number, colour]) => ({ number, colour }),
    R.xprod(numbers, colours),
  );
}

function getNumCardsPerPlayer(numPlayers) {
  if (numPlayers === 2 || numPlayers === 3) {
    return 5;
  } else if (numPlayers === 4 || numPlayers === 5) {
    return 4;
  }
  return null;
}

function* handleStartGame() {
  const newDeck = yield call(generateDeck);
  const shuffledDeck = yield call(shuffle, newDeck, { copy: true });

  const players = yield select(selectPlayers);
  const numCardsPerPlayer = getNumCardsPerPlayer(players.size);

  const deck = R.drop(numCardsPerPlayer * players.size, shuffledDeck);
  const playerHands = R.map(
    R.map((card) => ({ ...card, canSeeColour: false, canSeeNumber: false })),
    R.map(
      (i) =>
        R.take(numCardsPerPlayer, R.drop(i * numCardsPerPlayer, shuffledDeck)),
      R.range(0, players.size),
    ),
  );

  yield put(initializeGame(deck, playerHands));
}

function* handlePlayerTurn() {
  yield put(dealCard());
  yield put(setNextPlayer());
}

export default function* hanabiSaga() {
  yield takeEvery(START_GAME, handleStartGame);
  yield takeEvery(
    [GIVE_COLOUR_INFO, GIVE_NUMBER_INFO, DISCARD, PLAY],
    handlePlayerTurn,
  );
}
