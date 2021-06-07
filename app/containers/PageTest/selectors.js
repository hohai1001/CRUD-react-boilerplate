import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pageTest state domain
 */

const selectPageTestDomain = state => state.pageTest || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PageTest
 */

const makeSelectPageTest = () =>
  createSelector(
    selectPageTestDomain,
    substate => substate,
  );

export default makeSelectPageTest;
export { selectPageTestDomain };
