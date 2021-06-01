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
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';

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
  return (
    isGetProductSuccess && (
      <Grid container spacing={3}>
        {data.map(item => {
          const sizes = item.availableSizes;
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <CardFullHeight>
                <CardMedia className={classes.media}>
                  <img src={item.image} alt={item.title} />
                </CardMedia>
                <CardContent className={classes.media}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.lineClamp}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    className={classes.lineClamp}
                    gutterBottom
                  >
                    {item.description}
                  </Typography>
                  <Box my={1}>
                    {sizes.map((i, idx) => (
                      <Chip
                        key={idx.toString()}
                        className={classes.chip}
                        label={i}
                      />
                    ))}
                  </Box>
                  <Typography color="error">
                    <b>{item.price} ($)</b>
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
          );
        })}
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
