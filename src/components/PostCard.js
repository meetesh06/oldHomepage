import React from 'react';
import { makeStyles } from '@mui/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import {
  Link
} from "react-router-dom";

import { parsePostUrl } from './helper';


const useStyles = makeStyles((theme) => ({
  date: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(12),
    color: theme.textDate,
    marginTop: theme.spacing(2),
  },
  postContainer: {
    margin: theme.spacing(1),
  },
  cardPostTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(16),
    overflow: "hidden",
  },
  cardPostDesc: {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(16)
  }
  
}));

function PostCard(props) {
  const classes = useStyles();
  const post = props.post;
  return(
    <Card className={classes.postContainer}>
      <CardActionArea className={classes.clickableArea} component={Link} to={parsePostUrl(post.id, post.title)}>
        <CardContent>
          <Typography className={classes.cardPostTitle} gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography className={classes.cardPostDesc} variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
          <Typography className={classes.date}>
            {post.created}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PostCard;
