import React from 'react';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { makeStyles } from '@mui/styles';

import { useSelector } from 'react-redux';
import { selectCurrentPost } from '../features/currentPostSlice';
import { getPostsJson } from '../features/allPostsSlice';


import { parsePostUrl } from './helper';

import {
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  date: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(12),
    color: theme.textDate,
    marginTop: theme.spacing(2)
  },
  postContainer: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  skeletonContainer: {
    marginTop: theme.spacing(2),
  },
  cardPostTitle: {
    fontWeight: theme.typography.fontWeightBold
  },
  cardPostDesc: {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(13)
  },
  heading: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(25)
  }
}));



function LatestPost(props) {
  const classes = useStyles();
  let post = useSelector(selectCurrentPost);
  const postLatest = useSelector(getPostsJson).posts[0];
  if (post === null) post = postLatest;

  return(
    <div className={classes.root}>
      <div>
        <Typography className={classes.heading} variant="h6" component="h2">
          Read Next
        </Typography>
        <Card className={classes.postContainer}>
          <CardActionArea component={Link} to={parsePostUrl(post.id, post.title)}>
            <CardContent>
              <Typography className={classes.cardPostTitle} gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography className={classes.cardPostDesc} variant="body2" component="p">
                {post.description} 
              </Typography>
              <Typography className={classes.date}>
                {post.created}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default LatestPost;
