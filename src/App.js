import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import HomeContent from './components/HomeContent';
import PostPage from './components/PostPage';

import { ThemeProvider } from '@material-ui/core/styles';
import BLOG from './config';
import { createMuiTheme } from '@material-ui/core/styles';


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
  mainContent: {
    flex: 1,
    height: "100vh",
    overflow: "scroll",
  },
  actionBar: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  }
}));

function ResponsiveDrawer(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [lineage, setLineage] = React.useState({});
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const lightTheme = createMuiTheme({
    ...BLOG.sidebarTheme,
    palette: {
      ...BLOG.light
    }
  })

  const classes = useStyles();

  const loc = useLocation();

  const updateLineage = (data) => {
    setLineage(data);
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <div className={classes.root}>
          <LeftSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
          
          <main className={classes.content}>
              <div id="main-holder" className={classes.mainContent}>
                <AnimatePresence exitBeforeEnter>
                  <Switch location={loc} key={loc.pathname}>
                    <Route path="/post/:id/:title">
                      <PostPage setLineage={updateLineage} />
                    </Route>
                    <Route path="/">
                      <HomeContent handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                  </Switch>
                </AnimatePresence>
              </div>
              <RightSidebar lineage={lineage}/>
          </main>
      </div>
    </ThemeProvider>
  );
}

export default ResponsiveDrawer;
