import { createSelector } from 'reselect';
import Immutable from 'immutable';

const selectLocalState = (state) => state.get('hanabi');

export const selectMessages = createSelector(selectLocalState, (hanabi) =>
  hanabi.get('messages', new Immutable.List()).toJS(),
);

const selectPlayerInfo = createSelector(selectLocalState, (hanabi) =>
  hanabi.get('players', new Immutable.List()),
);

const selectPlayerHands = createSelector(selectLocalState, (hanabi) =>
  hanabi.get('playerHands', new Immutable.List()),
);

export const selectPlayers = createSelector(
  selectPlayerInfo,
  selectPlayerHands,
  (players, playerHands) =>
    players
      .zipAll(playerHands)
      .map(([player, hand = new Immutable.Map({})]) => player.set('hand', hand))
      .toJS(),
);
