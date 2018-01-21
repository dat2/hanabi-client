import { SYNC_ACTION } from './constants';

export function syncAction(action) {
  return {
    type: SYNC_ACTION,
    payload: { action },
  };
}
