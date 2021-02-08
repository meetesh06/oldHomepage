import React from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

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
    // height: 150
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
  const loadingPosts = props.loadingPosts;
  const noPost = props.noPost;

  return(
    <div className={classes.root}>
      {loadingPosts ? (
        <div>
          <Typography className={classes.heading} variant="h6" component="h2">
            Loading...
          </Typography>
          <Skeleton className={classes.skeletonContainer} variant="rect" width={"100%"} height={150} />
        </div>
      ) : (
          noPost ? (
            <div>
              <Typography className={classes.heading} variant="h6" component="h2">
                No Posts were found
              </Typography>
              <Skeleton className={classes.skeletonContainer} variant="rect" width={"100%"} height={150} />
            </div>
          ) : (
            <div>
              <Typography className={classes.heading} variant="h6" component="h2">
                Read Next
              </Typography>
              <Card className={classes.postContainer}>
                <CardActionArea component={Link} to={`/post/${props.post.id}/${props.post.title}`}>
                  <CardContent>
                    <Typography className={classes.cardPostTitle} gutterBottom variant="h5" component="h2">
                      {props.post.title}
                    </Typography>
                    <Typography className={classes.cardPostDesc} variant="body2" component="p">
                      {props.post.description} 
                    </Typography>
                    <Typography className={classes.date}>
                      {props.post.created}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          )
      )}
      
    </div>
  );
}

export default LatestPost;
