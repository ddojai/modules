import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {},
});

function PostList() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h3">포스트 리스트</Typography>
    </Box>
  );
}

export default PostList;
