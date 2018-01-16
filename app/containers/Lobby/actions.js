/*
 *
 * Lobby actions
 *
 */

import {
  CREATE_GAME,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILED
} from './constants';

export function createGame() {
  return {
    type: CREATE_GAME,
  };
}

export function createGameSuccess(gameId) {
  return {
    type: CREATE_GAME_SUCCESS,
    payload: { gameId }
  };
}

export function createGameFailed() {
  return {
    type: CREATE_GAME_FAILED,
  };
}
