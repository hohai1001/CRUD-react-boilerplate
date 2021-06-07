import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

export default function CommonStatus(props) {
  const { isLoading, isEmptyData } = props;
  return (
    <>
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <CircularProgress />
        </Box>
      )}

      {isEmptyData && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <Typography variant="h6">Không có dữ liệu</Typography>
        </Box>
      )}
    </>
  );
}

CommonStatus.propTypes = {
  isLoading: PropTypes.bool,
  isEmptyData: PropTypes.bool,
};
