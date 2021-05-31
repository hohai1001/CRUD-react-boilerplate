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
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  withStyles,
} from '@material-ui/core';

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
import { getListBook } from './actions';
// import messages from './messages';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.grey[300],
  },
  media: {
    // height: 0,
    // paddingTop: 'calc(100% * 9 / 16)',
    // cursor: 'pointer',
    // height: 0,
    // paddingTop: '100%',
    // cursor: 'pointer',
    maxWidth: '50%',
    height: '400px',
  },
}));

const CardFullHeight = withStyles(
  () => ({
    root: {
      height: '100%',
      wordBreak: 'break-word',
    },
  }),
  { name: 'CardFullHeight' },
)(Card);
// export default CardFullHeight;

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const classes = useStyles();
  const {
    data,
    statusFlags: {
      // isLoadMore,
      // isShowLoadMore,
      isCallApi,
      // isLoading,
      // isGetListFail,
    },
    linkParams: { limit, offset, sizeData },
    triggerGetListBook,
  } = props;

  React.useEffect(() => {
    if (!isCallApi) {
      triggerGetListBook(limit, offset);
    }
  }, [isCallApi, _size(data)]);

  // const [keySearch, setKeySearch] = React.useState('');

  // const hanldGetValue = event => {
  //   setKeySearch(event.target.value);
  // };

  // const handleOnKeyDown = e => {
  //   if (e.keyCode === 13) {
  //     // setKeySearch(e.target.value);
  //     triggerGetListBook(limit, 0, keySearch);
  //   }
  // };

  // const handleSearch = () => {
  //   console.log('value', value);
  // };

  // console.log('data', data);

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
      <Grid container spacing={3}>
        {data.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <CardFullHeight>
              <CardMedia
                // component="img"
                // alt={item.title}
                className={classes.media}
                image={item.image}
              />

              {/* <img src={item.image} alt="item.title" maxWidth="100px" /> */}
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.title}
                </Typography>
                <Typography component="label">
                  price:{' '}
                  <Typography color="error" component="span">
                    <b>{item.price}</b>
                  </Typography>
                </Typography>
                <Typography>AvailableSizes: {item.availableSizes}</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  Description: {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </CardFullHeight>
          </Grid>
        ))}
      </Grid>

      {/* <Typography variant="h5" paragraph align="center">
        <b>HomePage ({sizeData})</b>
      </Typography> */}

      {/* <Grid item xs={12} sm={8} md={6} lg={5}>
        <TextField
          // value={value}
          // defaultValue={value}
          // inputRef={e => console.log(e)}
          onKeyDown={e => handleOnKeyDown(e)}
          onChange={e => hanldGetValue(e)}
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search ..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  size="small"
                  onClick={() => triggerGetListBook(limit, 0, keySearch)}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid> */}
      {/* <br />
      {isLoadMore ? (
        <>
          {!_isEmpty(data) && !isGetListFail ? (
            <>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead className={classes.header}>
                    <TableRow>
                      <TableCell width="5%">
                        <b>NO</b>
                      </TableCell>
                      <TableCell width="30%">
                        <b>Title</b>
                      </TableCell>
                      <TableCell width="65%">
                        <b>Body</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {_map(data, (item, idx) => (
                      <TableRow key={idx.toString()}>
                        <TableCell width="5%">{item.no}</TableCell>
                        <TableCell width="30%">{item.title}</TableCell>
                        <TableCell width="65%">{item.body}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {isShowLoadMore ? (
                <Box my={3} textAlign="center">
                  <Button
                    color="secondary"
                    disabled={isLoading}
                    size="small"
                    variant="contained"
                    onClick={() => triggerGetListBook(limit, offset)}
                  >
                    {isLoading && (
                      <>
                        <CircularProgress
                          style={{ width: '17px', height: '17px' }}
                        />
                        &nbsp;
                      </>
                    )}
                    Xem thêm
                  </Button>
                </Box>
              ) : (
                ''
              )}
            </>
          ) : (
            <Box pt={10}>
              <Typography variant="h6" align="center">
                không có dữ liệu !
              </Typography>
            </Box>
          )}
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
        >
          <CircularProgress />
        </Box>
      )} */}
    </Box>
  );
}

HomePage.propTypes = {
  data: PropTypes.array,
  statusFlags: PropTypes.object,
  linkParams: PropTypes.object,
  triggerGetListBook: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectListBook(),
  linkParams: makeSelectLinkParams(),
  statusFlags: makeSelectStatusFlags(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerGetListBook: (limit, offset, text) =>
      dispatch(getListBook(limit, offset, text)),
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
