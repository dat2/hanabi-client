import { createSelector } from 'reselect';
import Immutable from 'immutable';

const selectLocalState = (state) => state.get('api');

export const selectGames = createSelector(selectLocalState, (api) =>
  api.get('games', new Immutable.List()).toJS(),
);
