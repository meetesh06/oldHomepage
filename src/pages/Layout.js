
import React, { Suspense } from 'react';

// import Blog from './Blog';
import ImageCard from '../components/ImageCard'
import TextCard from '../components/TextCard'
import NavBar from '../components/NavBar'
import { Box, Grid, LinearProgress } from '@mui/material';
import { lazyWithPreload } from "react-lazy-with-preload";
import RightSidebar from '../components/RightSidebar';
import {
  IMAGEURI,
  USERNAME,
  ABOUTUSER,
  GETINTOUCHTEXT,
  CONTACTLINKS
} from '../config'

import {
  Outlet,
  Route,
  Routes,
  useLocation,
  BrowserRouter
} from "react-router-dom";
import { Container } from '@mui/system';
import { AnimatePresence } from 'framer-motion';
// import Home from './Home';

const Blog = lazyWithPreload(() => import("./Blog"));
const Home = lazyWithPreload(() => import("./Home"));
const PostPage = lazyWithPreload(() => import("./PostPage"));

function Layout(props) {
  const location = useLocation();
  const isMain = location.pathname === "/"
  const isBlog = location.pathname === "/blog"
  return(
    <React.Fragment>

      <NavBar />
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={isMain ? 6 : 4} md={4} lg={isMain ? 3 : 2}>

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
          <Grid item xs={12} sm={isMain ? 6 : 8} md={8} lg={9}>
            <Suspense fallback={<LinearProgress color="success"/>}>
              {/* <AnimatePresence initial={false}> */}
                <Routes location={location} key={location.pathname}>
                  <Route
                    path="/"
                    element={<Home preloadList={[Blog, PostPage]} />}
                  />
                  <Route path="/blog" element={<Blog preloadList={[Home, PostPage]} />}>
                  </Route>
                  <Route path="/blog/:idRaw" element={<PostPage preloadList={[Home, Blog]} />}/>
                </Routes>
              {/* </AnimatePresence> */}
            </Suspense>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
      
  );
}


function RoutingWrapper() {
  return(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default RoutingWrapper;
