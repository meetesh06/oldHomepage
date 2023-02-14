
import React, { Suspense, useEffect, useState } from 'react';
import Head from 'next/head'

import DisplayCard from './DisplayCard'
import NavBar from './NavBar'
import { Alert, Box, createTheme, CssBaseline, Grid, responsiveFontSizes, ScopedCssBaseline } from '@mui/material';
import RightSidebar from './RightSidebar';
import {
  IMAGEURI,
  USERNAME,
  ABOUTUSER,
  GETINTOUCHTEXT,
  CONTACTLINKS,
  URI_POSTS
} from '../config'

import { Container } from '@mui/system';
import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';
// import useFetch from '@/hooks/useFetch';
import { nonCachedRequest } from '@/helper';
// import { updatePostsJson } from '@/store/allPostsSlice';

function PageLayout(props) {

  const router = useRouter();
  const isMain = router.pathname === "/"
  const isBlog = router.pathname === "/blog"

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
              <DisplayCard
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
              <DisplayCard 
                index="main-infocard"
                title="Get it touch?" 
                text={GETINTOUCHTEXT}
                links={CONTACTLINKS}
              />
            }

          </Grid>
          <Grid item xs={12} sm={isMain ? 6 : 8} md={8} lg={9}>
            {props.children}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
      
  );
}

const uniqueReq = nonCachedRequest(URI_POSTS)

function Layout(props) {

  // // Hooks
  // const dispatch = useDispatch();
  // const { loading, response, error } = useFetch(uniqueReq)
  // const [alert, setAlert] = useState(null);
  // useEffect(() => {
  //   const getAlertData = () => {
  //     if (loading) {
  //       return ["info", "Loading posts"]
  //     }
  //     if (error) {
  //       return ["error", "Failed to load posts"]
  //     }
  //     if (response) {
  //       dispatch(updatePostsJson(response.data));
  //       return ["success", "Posts loaded"]
  //     }
  //   }
  //   setAlert(getAlertData())
  //   const timer = setTimeout(() => {
  //     setAlert(null)
  //   }, 2000);
    
  //   return () => {
  //     clearTimeout(timer)
  //   };
  // }, [loading])


  // const themeLight = createTheme({
  //   palette: {
  //     mode: 'light',
  //     background: {
  //       paper: blueGrey[50],
  //       default: blueGrey[100]
  //     }
  //   }
  // });
  
  const themeDark = createTheme({
    palette: {
      mode: 'dark'
    } 
  });

  let theme = themeDark;

  theme = responsiveFontSizes(theme);

  return(
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ScopedCssBaseline enableColorScheme>
          <React.Fragment>
            <CssBaseline />
              <Box sx={{ height: "100vh", overflow: "scroll"  }}>
                <PageLayout>
                  {props.children}
                </PageLayout>
              </Box>
              {/* {
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
              } */}
          </React.Fragment>
          
        </ScopedCssBaseline>
      </main>
    </>
  );
}

export default Layout;
