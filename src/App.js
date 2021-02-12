import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { nonCachedRequest, sortPosts } from './components/helper';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import HomeContent from './components/HomeContent';
import PostPage from './components/PostPage';
import CircularProgressWithLabel from './components/CircularProgressWithLabel';

import { ThemeProvider } from '@material-ui/core/styles';
import BLOG from './config';
import { createMuiTheme } from '@material-ui/core/styles';

import axios from 'axios';

import { updatePostsJson } from './features/allPostsSlice';
import { useDispatch } from 'react-redux';

import Backdrop from '@material-ui/core/Backdrop';

import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';



import {
  AnimatePresence
} from 'framer-motion';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import './App.css';

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
  },
  noPostContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(3),

  },
  mainContent: {
    flex: 1,
    height: "100vh",
    overflow: "scroll",
  },
  actionBar: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  skeletonContainer: {
    marginTop: theme.spacing(2),
  },
  heading: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(25)
  }

}));

function ResponsiveDrawer(props) {
  const [loadingPosts, setLoadingPosts] = React.useState(true);
  const [progress, setProgress] = React.useState(50);
  const [noPost, setNoPost] = React.useState(false);

  const lightTheme = createMuiTheme({
    ...BLOG.sidebarTheme,
    palette: {
      ...BLOG.light
    }
  })

  const classes = useStyles();

  const loc = useLocation();

  const dispatch = useDispatch();

  React.useEffect(() => {
    axios.get(nonCachedRequest(BLOG.URI_POSTS), {
      onDownloadProgress : progressEvent => {
        if (!progressEvent.lengthComputable) return;
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted);
      }
    })
      .then(function (response) {
        if(response.data.posts.length === 0) {
          setNoPost(true);
        } else {
          response.data.posts.sort(sortPosts);
          dispatch(updatePostsJson(response.data)); // put global blog data in redux store
          setProgress(100);
          setLoadingPosts(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []); // ensuring only one global state update per session



  return (
    <ThemeProvider theme={lightTheme}>
      <div className={classes.root}>
        <Backdrop invisible open={loadingPosts}>
          <CircularProgressWithLabel value={progress} />
        </Backdrop>
        <LeftSidebar />
        {
          loadingPosts ? (<div/>) : (
              noPost ? (
                <div className={classes.noPostContainer}>
                  <Typography className={classes.heading} variant="h6" component="h2">
                    Blog Under Maintenance, check back later...
                  </Typography>
                  <Skeleton className={classes.skeletonContainer} variant="rect" width={"100%"} height={150} />
                </div>
              ) : (
                <main className={classes.content}>
                    <div className={classes.mainContent}>
                      <AnimatePresence exitBeforeEnter>
                        <Switch location={loc} key={loc.pathname}>
                          <Route path="/post-:idRaw">
                            <PostPage />
                          </Route>
                          <Route path="/">
                            <HomeContent />
                          </Route>
                        </Switch>
                      </AnimatePresence>
                    </div>
                    <RightSidebar />
                </main>
              )
          )
        }
      </div>
    </ThemeProvider>
  );
}

export default ResponsiveDrawer;
