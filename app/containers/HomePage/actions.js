import { SEND_MESSAGE, RECEIVE_MESSAGE } from './constants';

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    payload: { message }
  }
}

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    payload: { message }
  }
}
