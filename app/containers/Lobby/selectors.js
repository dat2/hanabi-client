import { createSelector } from 'reselect';

const selectLobbyDomain = (state) => state.get('lobby');


/**
 * Default selector used by Lobby
 */

const makeSelectLobby = () => createSelector(
  selectLobbyDomain,
  (substate) => substate.toJS()
);

export default makeSelectLobby;
export {
  selectLobbyDomain,
};
