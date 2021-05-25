import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

const makeSelectListBook = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.data,
  );
const makeSelectLinkParams = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.linkParams,
  );
const makeSelectStatusFlags = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.statusFlags,
  );

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectListBook,
  makeSelectLinkParams,
  makeSelectStatusFlags,
};
