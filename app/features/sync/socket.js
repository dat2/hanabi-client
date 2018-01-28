import { eventChannel } from 'redux-saga';

export default class Socket {
  constructor({ origin, path = '', namespace = '' }) {
    this.namespace = namespace;
    this.handlers = [];
    this.socket = new WebSocket(`${origin}${path}`);
    this.socket.onmessage = this.handleMessage;
  }

  emit = (channel, payload) => {
    this.socket.send(
      JSON.stringify({
        namespace: this.namespace,
        channel,
        payload,
      }),
    );
  };

  on = (channel, handler) => {
    this.handlers.push({ channel, handler });
  };

  handleMessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.namespace === this.namespace) {
      this.handlers
        .filter(({ channel }) => message.channel === channel)
        .forEach(({ handler }) => {
          handler(message.payload);
        });
    }
  };

  waitForOpen() {
    return new Promise((resolve, reject) => {
      this.socket.onopen = () => {
        resolve(this);
      };
      this.socket.onclose = () => {
        reject(new Error('closed'));
      };
    });
  }
}

export function openSocket(options) {
  return new Socket(options).waitForOpen();
}

export function createSocketChannel(socket, channel) {
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
