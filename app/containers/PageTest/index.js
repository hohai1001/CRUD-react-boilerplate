/**
 *
 * PageTest
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPageTest from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function PageTest() {
  useInjectReducer({ key: 'pageTest', reducer });
  useInjectSaga({ key: 'pageTest', saga });

  return (
    <div>
      <Helmet>
        <title>PageTest</title>
        <meta name="description" content="Description of PageTest" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

PageTest.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pageTest: makeSelectPageTest(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PageTest);
