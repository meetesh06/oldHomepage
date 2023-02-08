import React from 'react';
import { adaptV4Theme } from '@mui/material/styles';

import { makeStyles } from '@mui/styles';

import { nonCachedRequest, sortPosts } from './components/helper';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import HomeContent from './components/HomeContent';
import PostPage from './components/PostPage';
import CircularProgressWithLabel from './components/CircularProgressWithLabel';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import BLOG from './config';
import { createMuiTheme } from '@mui/material/styles';

import axios from 'axios';

import { updatePostsJson } from './features/allPostsSlice';
import { useDispatch } from 'react-redux';

import Backdrop from '@mui/material/Backdrop';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/lab/Skeleton';



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

const lightTheme = createMuiTheme(adaptV4Theme({
  ...BLOG.sidebarTheme,
  palette: {
    ...BLOG.light
  }
}))

function ResponsiveDrawer(props) {
  const [loadingPosts, setLoadingPosts] = React.useState(true);
  const [progress, setProgress] = React.useState(50);
  const [noPost, setNoPost] = React.useState(false);


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
                <Skeleton className={classes.skeletonContainer} variant="rectangular" width={"100%"} height={150} />
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
  );
}

function Main() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={lightTheme}>
        <ResponsiveDrawer/>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default Main;
