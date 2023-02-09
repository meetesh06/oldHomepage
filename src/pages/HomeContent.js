
import React from 'react';

import SelectedPost from '../components/SelectedPost';
import PostsContainer from '../components/PostsContainer';
import SearchableActionBar from '../components/SearchableActionBar';
import ImageCard from '../components/ImageCard'
import TextCard from '../components/TextCard'
import PostPage from '../components/PostPage'
import NavBar from '../components/NavBar'

import {
  AnimatePresence,
  motion
} from 'framer-motion';
import { Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

import {
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { Home } from '@material-ui/icons';
import RightSidebar from '../components/RightSidebar';
import { useSelector } from 'react-redux';
import { getPostsJson } from '../features/allPostsSlice';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import {
  IMAGEURI,
  USERNAME,
  ABOUTUSER,
  GETINTOUCHTEXT,
  CONTACTLINKS,
  NEWSITEMS,
  INTERESTS,
  SKILLSTEXT,
  SKILLSITEMS,
  LOOKINGFORTEXT,
  QUOTE,
  RESEARCHINTERESTS,
  EDUCATION,
  ABOUTME
} from '../config'
import { Masonry } from '@mui/lab';



const staticContentVariants = {
  hidden: { opacity: 0, scale: 0.90 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3
    }
  }
}

const heights = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function StaticContent() {
  return (
    <Masonry 
      component={motion.div}
      initial="hidden"
      animate="show"
      exit="out"
      variants={staticContentVariants}
      // defaultHeight={200}}


      columns={{ xs: 1, sm: 1, md: 3, lg: 3 }}
      spacing={0}
      >
      {/* {heights.map((height, index) => (
        <Item key={index} sx={{ height }}>
          {index + 1}
        </Item>
      ))} */}
      <TextCard title="News" 
              textList={NEWSITEMS}/>
      <TextCard title="Research Interests" text={RESEARCHINTERESTS} />

      <TextCard title="Looking For" text={LOOKINGFORTEXT} />
      <TextCard title="Something About Me" text={ABOUTME} />
      <TextCard
              title="Skills"
              text={SKILLSTEXT}
              textList={SKILLSITEMS}
              />
      <TextCard text={QUOTE} />
      <TextCard
        title="Interests"
        text={INTERESTS}
      />
      <TextCard title="Education" textList={EDUCATION}/>

    </Masonry>
  )
}

function HomeContent() {
  const { posts } = useSelector(getPostsJson);
  const location = useLocation();
  const isMain = location.pathname === "/"

  return(
    <AnimatePresence mode='wait'>
      <div>
        <NavBar />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4} lg={isMain ? 3 : 2}>
            <ImageCard
              imageUri={IMAGEURI}
              title={USERNAME} 
              text={isMain ? ABOUTUSER : undefined} />
            <TextCard title="Get it touch?" 
              text={GETINTOUCHTEXT}
              links={CONTACTLINKS}
            />

          </Grid>

          <Grid item xs={12} sm={6} md={8} lg={9}>

              <Switch>
              {/* <div> */}
                <Route exact path="/">
                  <StaticContent />
                </Route>

                <Route exact path="/blog">
                  {
                    posts && (
                      <motion.div
                        initial="hidden"
                        animate="show"
                        exit="out"
                        variants={staticContentVariants}
                        container
                      >
                        <SearchableActionBar />
                        <SelectedPost />
                        <PostsContainer />
                      </motion.div>
                    )
                  }
                  {
                    !posts &&
                    <LinearProgress color="secondary" />
                  }
                </Route>
                <Route path="/post-:idRaw">
                {
                    posts && (
                      <PostPage />
                    )
                  }
                  {
                    !posts &&
                    <LinearProgress color="secondary" />
                  }
                  
                </Route>
              
              </Switch>


          </Grid>



      </Grid>

      </div>
    </AnimatePresence>
  );
}

export default HomeContent;
