import { all, call, fork } from 'redux-saga/effects';

import { openSocket, createSocketChannel } from './socket';

export default function* syncSaga(socketOptions, senders, receivers) {
  const socket = yield call(openSocket, socketOptions);
  yield all([
    senders.map((sender) => fork(sender.saga, socket, sender.channel)),
  ]);

  yield all([
    receivers.map((receiver) => {
      const channel = createSocketChannel(socket, receiver.channel);
      return fork(receiver.saga, channel);
    }),
  ]);
}
