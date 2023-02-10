import React from 'react';

import { makeStyles } from '@mui/styles';

import { nonCachedRequest, sortPosts } from './components/helper';
import HomeContent from './pages/HomeContent';

import { ThemeProvider } from '@mui/material/styles';
import { URI_POSTS } from './config';
import { createTheme } from '@mui/material/styles';

import axios from 'axios';

import { updatePostsJson } from './features/allPostsSlice';
import { useDispatch } from 'react-redux';

import './App.css';

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, } from '@material-ui/core';
import { Alert, Container, ScopedCssBaseline } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
  },
  mainContent: {
    flex: 1,
    height: "100vh",
    overflow: "scroll",
  },

}));

function MainContainer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [alert, setAlert] = React.useState(null);


  React.useEffect(() => {
    axios.get(nonCachedRequest(URI_POSTS), {})
      .then(function (response) {
        if(response.data.posts.length > 0) {
          setAlert(["success", "Blog posts loaded!"]);
          setTimeout(() => setAlert(null), 5000)
          response.data.posts.sort(sortPosts);
          dispatch(updatePostsJson(response.data)); // put global blog data in redux store
        } else {
          setAlert(["warning", "Failed to load posts!"]);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <main className={classes.content}>
            <div className={classes.mainContent}>
                <HomeContent />
            </div>
        </main>
        {
          alert && 
          <Alert 
            sx={{
              position: 'absolute',
              bottom: 0
            }}
            severity={alert[0]}>
              {alert[1]}
          </Alert>
        }
      </Container>
    </React.Fragment>
  );
}

function App(props) {
  const [light, setLight] = React.useState(false);


  const themeLight = createTheme({
    palette: {
      mode: 'light',
      background: {
        paper: yellow[200],
        default: grey[100]
      }
    }
  });
  
  const themeDark = createTheme({
    palette: {
      mode: 'dark'
    } 
  });
  
  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <ScopedCssBaseline enableColorScheme>
        <MainContainer/>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}

export default App;
