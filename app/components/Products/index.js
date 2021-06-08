import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import _map from 'lodash/map';
import _get from 'lodash/get';
import _split from 'lodash/split';

const useStyles = makeStyles({
  media: {
    textAlign: 'center',
  },
  chip: {
    margin: '0 5px',
  },
  lineClamp: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 1,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
});

const CardFullHeight = withStyles(
  () => ({
    root: {
      height: '100%',
      wordBreak: 'break-word',
    },
  }),
  { name: 'CardFullHeight' },
)(Card);

export default function Products(props) {
  const {
    data,
    isShowLoadMore,
    isLoading,
    getMoreProducts,
    isGetProductSuccess,
  } = props;
  const classes = useStyles();

  // const path = window.location.origin;
  // console.log('path', path);

  return (
    isGetProductSuccess && (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            placeholder="...Search"
            variant="outlined"
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {data.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <CardFullHeight>
              <CardMedia className={classes.media}>
                <img src={_get(item, 'image')} alt={item.title} />
              </CardMedia>
              <CardContent className={classes.media}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.lineClamp}
                >
                  {_get(item, 'title')}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  className={classes.lineClamp}
                  gutterBottom
                >
                  {_get(item, 'description')}
                </Typography>
                <Box my={1}>
                  {_map(
                    _split(_get(item, 'availableSizes', []), ','),
                    (i, idx) => (
                      <Chip
                        key={idx.toString()}
                        className={classes.chip}
                        label={
                          <Typography className={classes.upperCase}>
                            {i}
                          </Typography>
                        }
                      />
                    ),
                  )}
                </Box>
                <Typography color="error">
                  <b>{_get(item, 'price')} ($)</b>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button
                  size="small"
                  color="primary"
                  component={RouterLink}
                  to="/aaa"
                  // target="_blank"
                >
                  Learn More
                </Button>
              </CardActions>
            </CardFullHeight>
          </Grid>
        ))}
        {isShowLoadMore && (
          <Grid item xs={12}>
            <Box textAlign="center">
              <Button
                variant="contained"
                color="secondary"
                disabled={isLoading}
                onClick={getMoreProducts}
              >
                {isLoading && (
                  <>
                    <CircularProgress style={{ width: 20, height: 20 }} />
                    &nbsp;
                  </>
                )}
                Xem thêm
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    )
  );
}

Products.propTypes = {
  data: PropTypes.array,
  isShowLoadMore: PropTypes.bool,
  isLoading: PropTypes.bool,
  getMoreProducts: PropTypes.func,
  isGetProductSuccess: PropTypes.bool,
};
