
import React, { Suspense } from 'react';

// import Blog from './Blog';
import ImageCard from '../components/ImageCard'
import TextCard from '../components/TextCard'
import NavBar from '../components/NavBar'
import { Box, Grid, LinearProgress } from '@mui/material';

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
  HashRouter
} from "react-router-dom";
import { Container } from '@mui/system';
// import Home from './Home';

const Home = React.lazy(() => import('./Home'));
const Blog = React.lazy(() => import('./Blog'));
const PostPage = React.lazy(() => import('./PostPage'));
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
            <Outlet />            
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
      
  );
}


function RoutingWrapper() {
  return(
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path=""
              element={<Home />}
              // element={<Home />}
            />
            <Route path="blog" element={<Blog />}>
            </Route>
            <Route path="blog/:idRaw" element={<PostPage />}/>
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default RoutingWrapper;
