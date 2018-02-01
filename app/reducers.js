import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

export default function createReducer(injectedReducers) {
  return combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    routerReducer,
    ...injectedReducers,
  });
}
