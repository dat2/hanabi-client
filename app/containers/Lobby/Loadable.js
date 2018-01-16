/**
 *
 * Asynchronously loads the component for Lobby
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
