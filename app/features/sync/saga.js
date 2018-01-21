import {
  all,
  apply,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import { openSocket, createSocketChannel } from './socket';

export default function* syncSaga(
  socketOptions,
  senders,
  receivers
) {
  const socket = yield call(openSocket, socketOptions);
  for(let sender of senders) {
    yield fork(sender.saga, socket, sender.channel);
  }

  for(let receiver of receivers) {
    const channel = yield call(createSocketChannel, socket, receiver.channel);
    yield fork(receiver.saga, channel);
  }
}
