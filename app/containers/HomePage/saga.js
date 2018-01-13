import { eventChannel, delay } from 'redux-saga';
import { apply, call, fork, put, take } from 'redux-saga/effects';
import createSocket from 'socket.io-client';

import { SEND_MESSAGE } from './constants';
import { receiveMessage } from './actions';

function createSocketChannel(socket, event) {
  return eventChannel(emit => {
    function eventHandler(event) {
      emit(event)
    }

    socket.on(event, eventHandler)

    return () => {
      socket.off(event, eventHandler)
    };
  })
}

function* receiveMessageSaga(channel) {
  while(true) {
    const payload = yield take(channel);
    yield put(receiveMessage(payload));
  }
}

function* sendMessageSaga(socket) {
  while(true) {
    const action = yield take(SEND_MESSAGE);
    yield apply(socket, socket.emit, ['message', action.payload.message]);
  }
}

export default function* homePageSaga() {
  const socket = yield call(createSocket, '/', { path: '/ws' });
  const socketChannel = yield call(createSocketChannel, socket, 'message');
  yield fork(receiveMessageSaga, socketChannel);
  yield fork(sendMessageSaga, socket);
}
