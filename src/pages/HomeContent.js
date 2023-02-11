
import React from 'react';

import PostsContainer from '../components/PostsContainer';
import ImageCard from '../components/ImageCard'
import TextCard from '../components/TextCard'
import PostPage from '../components/PostPage'
import NavBar from '../components/NavBar'

import { motion } from 'framer-motion';
import { Box, Grid, Hidden, LinearProgress, Paper } from '@mui/material';

import RightSidebar from '../components/RightSidebar';
import { useSelector } from 'react-redux';
import { getPostsJson } from '../features/allPostsSlice';

import { styled } from '@mui/material/styles';
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

import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
  HashRouter
} from "react-router-dom";
import { Container } from '@mui/system';

const staticContentVariants = {
  hidden: {opacity: 0, scale: 0.90 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3
    }
  },
  out: {
    opacity: 0,
    scale: 0.90,
    transition: {
      duration: 10
    }
  }
}

function PostRenderer() {
  const { posts } = useSelector(getPostsJson);  
  
  if (posts) {
    return <div>
      <PostPage />
    </div>
  } else {
    return <LinearProgress color="secondary" />
  }
}

function BlogRenderer() {
  const { posts } = useSelector(getPostsJson);  
  
  if (posts) {
    return <motion.div
      initial="hidden"
      animate="show"
      exit="out"
      variants={staticContentVariants}
      container
    >
      <PostsContainer />
    </motion.div>
  } else {
    return <LinearProgress color="secondary" />
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


function StaticContent(props) {
  return (
    <Masonry 
      component={motion.div}
      initial="hidden"
      animate="show"
      exit="out"
      variants={staticContentVariants}
      columns={{ xs: 1, sm: 1, md: 3, lg: 3 }}
      spacing={0}
      >
      <TextCard key={`home-${1}`} title="News" 
              textList={NEWSITEMS}/>
      <TextCard key={`home-${2}`} title="Research Interests" text={RESEARCHINTERESTS} />

      <TextCard key={`home-${3}`} title="Looking For" text={LOOKINGFORTEXT} />
      <TextCard key={`home-${4}`} title="Something About Me" text={ABOUTME} />
      <TextCard
              key={`home-${5}`}
              title="Skills"
              text={SKILLSTEXT}
              textList={SKILLSITEMS}
              />
      <TextCard key={`home-${6}`} text={QUOTE} />
      <TextCard
        key={`home-${7}`}
        title="Interests"
        text={INTERESTS}
      />
      <TextCard key={`home-${8}`} title="Education" textList={EDUCATION}/>

    </Masonry>
  )
}

function HomeContent(props) {
  const location = useLocation();
  const isMain = location.pathname === "/"
  const isBlog = location.pathname === "/blog"
  return(
    
      <React.Fragment>
        <NavBar />
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={isMain ? 3 : 2}>

              {
                !isMain && 
                <RightSidebar />
              }
              <Box
                sx={{ display: { xs: isMain || isBlog ? 'block' : 'none', md: 'block' } }}
                >
                <ImageCard
                  index="main-image"
                  imageUri={IMAGEURI}
                  title={USERNAME} 
                  text={isMain ? ABOUTUSER : GETINTOUCHTEXT}
                  links={isMain ? undefined : CONTACTLINKS}
                  small={!isMain}
                  />
              </Box>


              {
                isMain && 
                <TextCard 
                  index="main-infocard"
                  title="Get it touch?" 
                  text={GETINTOUCHTEXT}
                  links={CONTACTLINKS}
                />
              }

            </Grid>
            <Grid item xs={12} sm={6} md={8} lg={9}>
              <Outlet />            
            </Grid>
          </Grid>
        </Container>

      </React.Fragment>
      
  );
}


function HomeWrapper() {
  

  return(
    
    <HashRouter>
        <Routes>
          <Route path="/" element={<HomeContent />}>
            <Route
              path=""
              element={<StaticContent />}
            />
            <Route path="blog" element={<BlogRenderer />}>
            </Route>
            <Route path="blog/:idRaw" element={<PostRenderer />} />
          </Route>
        </Routes>
    </HashRouter>
  )
}

export default HomeWrapper;
