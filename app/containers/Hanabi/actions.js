import {
  SEND_CHAT_MESSAGE,
  RECEIVE_CHAT_MESSAGE,
  SYNC_ACTION,
  START_GAME,
  INITIALIZE_GAME,
  END_GAME,
  GIVE_COLOUR_INFO,
  GIVE_NUMBER_INFO,
  DISCARD,
  PLAY,
} from './constants';

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

export function syncAction(action) {
  return {
    type: SYNC_ACTION,
    payload: { action },
  };
}

export function startGame() {
  return {
    type: START_GAME,
    payload: {},
  };
}

export function initializeGame(blob) {
  return syncAction({
    type: INITIALIZE_GAME,
    payload: { blob },
  });
}

export function endGame() {
  return syncAction({
    type: END_GAME,
    payload: {},
  });
}

export function giveColourInfo(suit, playerIndex) {
  return syncAction({
    type: GIVE_COLOUR_INFO,
    payload: { suit, playerIndex },
  });
}

export function giveNumberInfo(number, playerIndex) {
  return syncAction({
    type: GIVE_NUMBER_INFO,
    payload: { number, playerIndex },
  });
}

export function discard() {
  return syncAction({
    type: DISCARD,
    payload: {},
  });
}

export function play(card) {
  return syncAction({
    type: PLAY,
    payload: { card },
  });
}
