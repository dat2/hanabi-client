import { eventChannel } from 'redux-saga';
import {
  all,
  apply,
  call,
  fork,
  put,
  take,
  takeEvery,
} from 'redux-saga/effects';
import createSocket from 'socket.io-client';
import uuidv4 from 'uuid/v4';
import * as R from 'ramda';
import shuffle from 'shuffle-array';

import { SEND_CHAT_MESSAGE, SYNC_ACTION, START_GAME } from './constants';
import { initializeGame, receiveChatMessage } from './actions';

function createSocketChannel(socket, channel) {
  return eventChannel((emit) => {
    function eventHandler(event) {
      emit(event);
    }

    socket.on(channel, eventHandler);

    return () => {
      socket.off(channel, eventHandler);
    };
  });
}

function* handleSendChatMessages(socket, channel) {
  while (true) {
    const sendAction = yield take(SEND_CHAT_MESSAGE);
    const newMessageId = yield call(uuidv4);
    const receiveAction = receiveChatMessage(
      sendAction.payload.message,
      newMessageId,
    );
    yield apply(socket, socket.emit, [channel, { action: receiveAction }]);
    yield put(receiveAction);
  }
}

function* handleSendSyncActions(socket, channel) {
  while (true) {
    const action = yield take(SYNC_ACTION);
    yield put(action.payload.action);
    yield apply(socket, socket.emit, [channel, action.payload]);
  }
}

function* handleReceiveChatMessages(channel) {
  while (true) {
    const payload = yield take(channel);
    yield put(payload.action);
  }
}

function* handleReceiveSyncMessages(channel) {
  while (true) {
    const payload = yield take(channel);
    yield put(payload.action);
  }
}

function generateDeck() {
  const numberDistribution = [
    [1, 3],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 1]
  ];
  const numbers = R.flatten(R.map(R.apply(R.repeat), numberDistribution));
  const colours = [
    'white',
    'yellow',
    'green',
    'blue',
    'red'
  ];
  return R.map(
    ([number, colour]) => ({ number, colour }),
    R.xprod(numbers, colours)
  );
}

function* handleStartGame() {
  const deck = yield call(generateDeck);
  const shuffled = yield call(shuffle, deck, { copy: true });

  const blob = {
    deck: shuffled
  };
  yield put(initializeGame(blob));
}

export default function* homePageSaga() {
  const socket = yield call(createSocket, '/', { path: '/ws' });
  yield fork(handleSendChatMessages, socket, 'chat');
  yield fork(handleSendSyncActions, socket, 'game');

  const messageChannel = yield call(createSocketChannel, socket, 'chat');
  yield fork(handleReceiveChatMessages, messageChannel);

  const gameChannel = yield call(createSocketChannel, socket, 'game');
  yield fork(handleReceiveSyncMessages, gameChannel);

  yield all([takeEvery(START_GAME, handleStartGame)]);
}