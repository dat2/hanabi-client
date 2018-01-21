/*
 *
 * Lobby actions
 *
 */

import {
  CREATE_GAME,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILED,
  SET_NAME,
  SET_NAME_SUCCESS,
  SET_NAME_FAILED,
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

export function setName(name) {
  return {
    type: SET_NAME,
    payload: { name }
  };
}

export function setNameSuccess(name) {
  return {
    type: SET_NAME_SUCCESS,
    payload: { name }
  };
}

export function setNameFailed(e) {
  return {
    type: SET_NAME_FAILED,
  };
}
