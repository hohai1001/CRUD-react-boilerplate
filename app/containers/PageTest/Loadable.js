/**
 *
 * Asynchronously loads the component for PageTest
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
