import {
  CREATE_GAME,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILED,
  JOIN_GAME,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAILED,
} from './constants';

export function createGame(values, onCreate, onError) {
  return {
    type: CREATE_GAME,
    payload: { values, onCreate, onError },
  };
}

export function createGameSuccess(game) {
  return {
    type: CREATE_GAME_SUCCESS,
    payload: { game },
  };
}

export function createGameFailed() {
  return {
    type: CREATE_GAME_FAILED,
  };
}

export function joinGame(gameId) {
  return {
    type: JOIN_GAME,
    payload: { gameId },
  };
}

export function joinGameSuccess(gameId) {
  return {
    type: JOIN_GAME_SUCCESS,
    payload: { gameId },
  };
}

export function joinGameFailed(error) {
  return {
    type: JOIN_GAME_FAILED,
    payload: error,
    error: true,
  };
}
