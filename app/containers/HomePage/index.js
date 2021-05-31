/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import Table from '@material-ui/core/Table';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';

import Products from 'components/Products';

// import _map from 'lodash/map';
// import _isEmpty from 'lodash/isEmpty';
import _size from 'lodash/size';
// import _filter from 'lodash/filter';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectListBook,
  makeSelectLinkParams,
  makeSelectStatusFlags,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getListProduct } from './actions';
// import messages from './messages';

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const {
    data,
    statusFlags: {
      // isLoadMore,
      isShowLoadMore,
      isCallApi,
      isLoading,
      // isGetListFail,
    },
    linkParams: { limit, offset, sizeData },
    triggerGetListProducts,
  } = props;

  React.useEffect(() => {
    if (!isCallApi) {
      triggerGetListProducts(limit, offset);
    }
  }, [isCallApi, _size(data)]);

  // console.log(`offset ${offset} --- limit ${limit}`);

  return (
    <Box p={3}>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
      <Typography variant="h5" paragraph align="center">
        <b>All Products ({sizeData})</b>
      </Typography>

      <Products
        data={data}
        isShowLoadMore={isShowLoadMore}
        isLoading={isLoading}
        getMoreProducts={() => triggerGetListProducts(limit, offset)}
      />
    </Box>
  );
}

HomePage.propTypes = {
  data: PropTypes.array,
  statusFlags: PropTypes.object,
  linkParams: PropTypes.object,
  triggerGetListProducts: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectListBook(),
  linkParams: makeSelectLinkParams(),
  statusFlags: makeSelectStatusFlags(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerGetListProducts: (limit, offset, text) =>
      dispatch(getListProduct(limit, offset, text)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
