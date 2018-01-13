import { createSelector } from 'reselect';
import Immutable from 'immutable';

const selectLocalState = (state) => state.get('hanabi');

export const selectMessages = createSelector(selectLocalState, (hanabi) =>
  hanabi.get('messages'),
);

export const selectPlayers = createSelector(selectLocalState, (hanabi) =>
  hanabi.get('players'),
);

export const selectPlayerHands = createSelector(selectLocalState, (hanabi) =>
  hanabi.getIn(['game', 'playerHands'], new Immutable.List()),
);
