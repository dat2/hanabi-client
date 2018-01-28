import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

export default function createReducer(injectedReducers) {
  return combineReducers({
    routerReducer,
    ...injectedReducers,
  });
}
