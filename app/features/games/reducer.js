import { fromJS } from 'immutable';

import { FETCH_GAMES_SUCCESS } from './constants';

const initialState = fromJS({
  games: [],
});

function onFetchGamesSuccess(state, games) {
  return state.set('games', fromJS(games));
}

function apiReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GAMES_SUCCESS:
      return onFetchGamesSuccess(state, action.payload.games);
    default:
      return state;
  }
}

export default apiReducer;
