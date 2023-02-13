import Head from 'next/head'

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { nonCachedRequest, sortPosts } from '../helper';
import Layout from '../components/Layout';

import { ThemeProvider } from '@mui/material/styles';
import { URI_POSTS } from '../config';
import { createTheme } from '@mui/material/styles';


import { updatePostsJson } from '../store/allPostsSlice';
import { useDispatch } from 'react-redux';

import { CssBaseline, } from '@mui/material';
import { Alert, Container, responsiveFontSizes, ScopedCssBaseline } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import useFetch from '../hooks/useFetch';

import StaticCardPage from "../components/StaticCardPage"

export default StaticCardPage

// const uniqueReq = nonCachedRequest(URI_POSTS)
// function MainContainer(props) {
//   // Hooks
//   const dispatch = useDispatch();
//   const { loading, response, error } = useFetch(uniqueReq)

//   // States
//   const [alert, setAlert] = useState(null);
  
//   // Effects
//   useEffect(() => {
//     const getAlertData = () => {
//       if (loading) {
//         return ["info", "Loading posts"]
//       }
//       if (error) {
//         return ["error", "Failed to load posts"]
//       }
//       if (response) {
//         dispatch(updatePostsJson(response.data));
//         return ["success", "Posts loaded"]
//       }
//     }
//     setAlert(getAlertData())
//     const timer = setTimeout(() => {
//       setAlert(null)
//     }, 2000);
    
//     return () => {
//       clearTimeout(timer)
//     };
//   }, [loading])

//   return (
//     <React.Fragment>
//       <CssBaseline />
//         <Box sx={{ height: "100vh", overflow: "scroll"  }}>
//           <Layout>
//             <StaticCardPage />
//           </Layout>
//         </Box>
//         {
//           alert && 
//           <Alert 
//             sx={{
//               position: 'fixed',
//               bottom: 0,
//               right: 0,
//               left: 0
//             }}
//             severity={alert[0]}>
//               {alert[1]}
//           </Alert>
//         }
//     </React.Fragment>
//   );
// }

// function App(props) {
//   const [light, setLight] = React.useState(false);


//   const themeLight = createTheme({
//     palette: {
//       mode: 'light',
//       background: {
//         paper: blueGrey[50],
//         default: blueGrey[100]
//       }
//     }
//   });
  
//   const themeDark = createTheme({
//     palette: {
//       mode: 'dark'
//     } 
//   });

//   let theme = light ? themeLight : themeDark

//   theme = responsiveFontSizes(theme);
  
//   return (
//     <ScopedCssBaseline enableColorScheme>
//       <MainContainer/>
//     </ScopedCssBaseline>
//   );
// }

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Meetesh's Homepage 🏴‍☠️ 🏴‍☠️ 🏴‍☠️</title>
//         <meta
//           name="description"
//           content="My corner of this internet ;P"
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main>
//         <App />
//       </main>
//     </>
//   )
// }
