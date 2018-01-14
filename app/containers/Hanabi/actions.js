import {
  JOIN_ROOM,
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
  DEAL_CARD,
  SET_NEXT_PLAYER,
} from './constants';

export function joinRoom(gameId) {
  return {
    type: JOIN_ROOM,
    payload: { gameId }
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

export function initializeGame(deck, playerHands) {
  return syncAction({
    type: INITIALIZE_GAME,
    payload: { deck, playerHands },
  });
}

export function endGame() {
  return syncAction({
    type: END_GAME,
    payload: {},
  });
}

export function giveColourInfo(colour, playerIndex) {
  return syncAction({
    type: GIVE_COLOUR_INFO,
    payload: { colour, playerIndex },
  });
}

export function giveNumberInfo(number, playerIndex) {
  return syncAction({
    type: GIVE_NUMBER_INFO,
    payload: { number, playerIndex },
  });
}

export function discard(cardIndex) {
  return syncAction({
    type: DISCARD,
    payload: { cardIndex },
  });
}

export function play(cardIndex) {
  return syncAction({
    type: PLAY,
    payload: { cardIndex },
  });
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
