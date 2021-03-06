import {
  FAILED_TO_CONNECT,
  SEND_CHAT_MESSAGE,
  RECEIVE_CHAT_MESSAGE,
  START_GAME,
  INITIALIZE_GAME,
  END_GAME,
  GIVE_COLOUR_INFO,
  GIVE_NUMBER_INFO,
  DISCARD,
  PLAY,
  DEAL_CARD,
  SET_NEXT_PLAYER,
} from './constants';

export function failedToConnect() {
  return {
    type: FAILED_TO_CONNECT,
    payload: {},
  };
}

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

export function startGame() {
  return {
    type: START_GAME,
    payload: {},
  };
}

export function initializeGame(deck, playerHands) {
  return {
    type: INITIALIZE_GAME,
    payload: { deck, playerHands },
  };
}

export function endGame() {
  return {
    type: END_GAME,
    payload: {},
  };
}

export function giveColourInfo(colour, playerIndex) {
  return {
    type: GIVE_COLOUR_INFO,
    payload: { colour, playerIndex },
  };
}

export function giveNumberInfo(number, playerIndex) {
  return {
    type: GIVE_NUMBER_INFO,
    payload: { number, playerIndex },
  };
}

export function discard(cardIndex) {
  return {
    type: DISCARD,
    payload: { cardIndex },
  };
}

export function play(cardIndex) {
  return {
    type: PLAY,
    payload: { cardIndex },
  };
}

export function dealCard() {
  return {
    type: DEAL_CARD,
    payload: null,
  };
}

export function setNextPlayer() {
  return {
    type: SET_NEXT_PLAYER,
    payload: null,
  };
}
