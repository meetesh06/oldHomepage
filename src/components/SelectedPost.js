import React from 'react';

import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';

import { useSelector } from 'react-redux';
import { selectCurrentPost } from '../features/currentPostSlice';
import { getPostsJson } from '../features/allPostsSlice';


import { parsePostUrl } from './helper';

import {
  Link
} from "react-router-dom";

const PREFIX = 'LatestPost';

const classes = {
  root: `${PREFIX}-root`,
  date: `${PREFIX}-date`,
  postContainer: `${PREFIX}-postContainer`,
  skeletonContainer: `${PREFIX}-skeletonContainer`,
  cardPostTitle: `${PREFIX}-cardPostTitle`,
  cardPostDesc: `${PREFIX}-cardPostDesc`,
  heading: `${PREFIX}-heading`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
  },

  [`& .${classes.date}`]: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(12),
    color: theme.textDate,
    marginTop: theme.spacing(2)
  },

  [`& .${classes.postContainer}`]: {
    marginTop: theme.spacing(2),
    width: "100%",
  },

  [`& .${classes.skeletonContainer}`]: {
    marginTop: theme.spacing(2),
  },

  [`& .${classes.cardPostTitle}`]: {
    fontWeight: theme.typography.fontWeightBold
  },

  [`& .${classes.cardPostDesc}`]: {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(13)
  },

  [`& .${classes.heading}`]: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(25)
  }
}));



function LatestPost(props) {

  let post = useSelector(selectCurrentPost);
  let postLatest = useSelector(getPostsJson);
  if (postLatest) {
    postLatest = postLatest.posts[0];
  }

  return (
    <Root className={classes.root}>
      {
        post && 
        <div>
          <Typography className={classes.heading} variant="h6" component="h2">
            Selected Post
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
      }
    </Root>
  );
}

export default LatestPost;
