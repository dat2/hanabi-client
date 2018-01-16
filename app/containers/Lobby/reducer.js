/*
 *
 * Lobby reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_GAME_SUCCESS,
} from './constants';

const initialState = fromJS({});

function lobbyReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GAME_SUCCESS:
      return state;
    default:
      return state;
  }
}

export default lobbyReducer;
