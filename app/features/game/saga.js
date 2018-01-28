import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import uuidv4 from 'uuid/v4';
import * as R from 'ramda';
import shuffle from 'shuffle-array';

import syncSaga from 'features/sync/saga';
import { SYNC_ACTION } from 'features/sync/constants';
import { JOIN_GAME_SUCCESS } from 'features/api/constants';

import {
  SEND_CHAT_MESSAGE,
  START_GAME,
  GIVE_COLOUR_INFO,
  GIVE_NUMBER_INFO,
  DISCARD,
  PLAY,
} from './constants';
import {
  initializeGame,
  receiveChatMessage,
  dealCard,
  setNextPlayer,
  failedToConnect,
} from './actions';
import { selectPlayers } from './selectors';

function* sendChatMessages(socket, channel) {
  while (true) {
    const sendAction = yield take(SEND_CHAT_MESSAGE);
    const newMessageId = yield call(uuidv4);
    const receiveAction = receiveChatMessage(
      sendAction.payload.message,
      newMessageId,
    );
    yield call(socket.emit, channel, { action: receiveAction });
    yield put(receiveAction);
  }
}

function* sendGameActions(socket, channel) {
  while (true) {
    const action = yield take(SYNC_ACTION);
    yield call(socket.emit, channel, action.payload);
    yield put(action.payload.action);
  }
}

function* receiveAndPut(channel) {
  while (true) {
    const payload = yield take(channel);
    yield put(payload.action);
  }
}

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

export default function* gameSaga() {
  const action = yield take(JOIN_GAME_SUCCESS);
  const gameId = action.payload.gameId;

  try {
    yield call(
      syncSaga,
      {
        origin: process.env.WS_SERVER_ORIGIN,
        path: '/ws',
        namespace: `/games/${gameId}`,
      },
      [
        { channel: 'chat', saga: sendChatMessages },
        { channel: 'game', saga: sendGameActions },
      ],
      [
        { channel: 'chat', saga: receiveAndPut },
        { channel: 'game', saga: receiveAndPut },
      ],
    );
  } catch (e) {
    yield put(failedToConnect());
  }

  yield takeEvery(START_GAME, handleStartGame);
  yield takeEvery(
    [GIVE_COLOUR_INFO, GIVE_NUMBER_INFO, DISCARD, PLAY],
    handlePlayerTurn,
  );
}
