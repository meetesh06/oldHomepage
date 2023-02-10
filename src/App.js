import React, { useEffect, useState } from 'react';

import { makeStyles } from '@mui/styles';

import { nonCachedRequest, sortPosts } from './components/helper';
import HomeContent from './pages/HomeContent';

import { ThemeProvider } from '@mui/material/styles';
import { URI_POSTS } from './config';
import { createTheme } from '@mui/material/styles';


import { updatePostsJson } from './features/allPostsSlice';
import { useDispatch } from 'react-redux';

import './App.css';

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, } from '@material-ui/core';
import { Alert, Container, responsiveFontSizes, ScopedCssBaseline } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import useFetch from './hooks/useFetch';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    height: "100vh",
    overflow: "scroll",
  },

}));

const uniqueReq = nonCachedRequest(URI_POSTS)
function MainContainer(props) {
  // Hooks
  const classes = useStyles();  
  const dispatch = useDispatch();
  const { loading, response, error } = useFetch(uniqueReq)

  // States
  const [alert, setAlert] = useState(null);
  
  // Effects
  useEffect(() => {
    const getAlertData = () => {
      if (loading) {
        return ["info", "Loading posts"]
      }
      if (error) {
        return ["error", "Failed to load posts"]
      }
      if (response) {
        dispatch(updatePostsJson(response.data));
        return ["success", "Posts loaded"]
      }
    }
    setAlert(getAlertData())
    const timer = setTimeout(() => {
      setAlert(null)
    }, 2000);
    
    return () => {
      clearTimeout(timer)
    };
  }, [loading])

  return (
    <React.Fragment>
      <CssBaseline />
        <main className={classes.mainContent}>
          <HomeContent />
        </main>
        {
          alert && 
          <Alert 
            sx={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              left: 0
            }}
            severity={alert[0]}>
              {alert[1]}
          </Alert>
        }
    </React.Fragment>
  );
}

function App(props) {
  const [light, setLight] = React.useState(false);


  const themeLight = createTheme({
    palette: {
      mode: 'light',
      background: {
        paper: blueGrey[50],
        default: blueGrey[100]
      }
    }
  });
  
  const themeDark = createTheme({
    palette: {
      mode: 'dark'
    } 
  });

  let theme = light ? themeLight : themeDark

  theme = responsiveFontSizes(theme);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScopedCssBaseline enableColorScheme>
        <MainContainer/>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}

export default App;
