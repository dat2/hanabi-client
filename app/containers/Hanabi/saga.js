import { eventChannel } from 'redux-saga';
import { apply, call, fork, put, take } from 'redux-saga/effects';
import createSocket from 'socket.io-client';
import uuidv4 from 'uuid/v4';

import { SEND_CHAT_MESSAGE, SEND_GAME_MESSAGE } from './constants';
import { receiveChatMessage } from './actions';

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

function* sendChatMessage(socket) {
  while (true) {
    const sendAction = yield take(SEND_CHAT_MESSAGE);
    const newMessageId = yield call(uuidv4);
    const receiveAction = receiveChatMessage(sendAction.payload.message, newMessageId);
    yield apply(socket, socket.emit, ['chat', { action: receiveAction }]);
    yield put(receiveAction);
  }
}

function* sendGameMessage(socket) {
  while (true) {
    const action = yield take(SEND_GAME_MESSAGE);
    yield put(action.payload.action);
    yield apply(socket, socket.emit, ['game', action.payload]);
  }
}

function* receiveChatMessageSaga(channel) {
  while (true) {
    const payload = yield take(channel);
    yield put(payload.action);
  }
}

function* handleGameMessages(channel) {
  while (true) {
    const payload = yield take(channel);
    yield put(payload.action);
  }
}

export default function* homePageSaga() {
  const socket = yield call(createSocket, '/', { path: '/ws' });
  yield fork(sendChatMessage, socket);
  yield fork(sendGameMessage, socket);

  const messageChannel = yield call(createSocketChannel, socket, 'chat');
  yield fork(receiveChatMessageSaga, messageChannel);

  const gameChannel = yield call(createSocketChannel, socket, 'game');
  yield fork(handleGameMessages, gameChannel);
}
