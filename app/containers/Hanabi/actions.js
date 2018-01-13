import { SEND_CHAT_MESSAGE, RECEIVE_CHAT_MESSAGE, SEND_GAME_MESSAGE, START_GAME, END_GAME, GIVE_SUIT_INFO, GIVE_NUMBER_INFO, DISCARD, PLAY } from './constants';

export function sendChatMessage(message) {
  return {
    type: SEND_CHAT_MESSAGE,
    payload: { message },
  };
}

export function receiveChatMessage(message, id) {
  return {
    type: RECEIVE_CHAT_MESSAGE,
    payload: { message, id },
  };
}

export function sendGameMessage(action) {
  return {
    type: SEND_GAME_MESSAGE,
    payload: { action },
  };
}

export function startGame() {
  return sendGameMessage({
    type: START_GAME,
    payload: {},
  });
}

export function endGame() {
  return sendGameMessage({
    type: END_GAME,
    payload: {},
  });
}

export function giveSuitInfo(suit, playerIndex) {
  return sendGameMessage({
    type: GIVE_SUIT_INFO,
    payload: { suit, playerIndex },
  });
}

export function giveNumberInfo(number, playerIndex) {
  return sendGameMessage({
    type: GIVE_NUMBER_INFO,
    payload: { number, playerIndex },
  });
}

export function discard() {
  return sendGameMessage({
    type: DISCARD,
    payload: {},
  });
}

export function play(card) {
  return sendGameMessage({
    type: PLAY,
    payload: { card },
  });
}
