import { createSelector } from 'reselect';

const selectLocalState = (state) => state.get('home');

export const selectMessages = createSelector(
  selectLocalState,
  (home) => home.get('messages')
);
