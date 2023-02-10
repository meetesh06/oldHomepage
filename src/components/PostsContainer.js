import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Divider, Hidden, Skeleton, Typography } from '@mui/material';
import {JSONPath} from 'jsonpath-plus';
import PostCard from './PostCard';

import { useSelector } from 'react-redux';
import { selectCurrentPost } from '../features/currentPostSlice';
import { getPostsJson } from '../features/allPostsSlice';
import { Masonry } from '@mui/lab';
import { motion } from 'framer-motion';
import TextCard from './TextCard';
import { blueGrey } from '@mui/material/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  tabContainer: {
    [theme.breakpoints.down('lg')]: {
      maxWidth: "60vw"
    },
    maxWidth: "40vw"
  }
  
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function PostsContainer(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  let post = useSelector(selectCurrentPost);

  const blogData = useSelector(getPostsJson);

  
  useEffect(() => {
    if (post) {
      const element = document.getElementById(`post-${post.id}`);
      element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
  });

  // console.log("post:", post)


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div >
    <Hidden mdUp>
      {/* Posts */}
      <Divider sx={(theme) => { return { marginBottom: theme.spacing(1), marginTop: theme.spacing(1) } }}/>
      {/* <Typography sx={(theme) => { return { marginTop: theme.spacing(2) } }} gutterBottom variant="h" >
        Posts
      </Typography> */}
    </Hidden>
    <Masonry 
      // sx={(theme) => { return { backgroundColor: blueGrey[700] } }}
      columns={{ xs: 1, sm: 2, md: 3, lg: 3 }}
      spacing={2}
      >
        {
          blogData.posts.map((post, index) => (
            <PostCard key={`post-${index}`} post={post}/>
          ))
        }
      </Masonry>
      </div>
      );
    // <div className={classes.root}>
    //   <div>
    //       <div className={classes.tabContainer}>
    //         <Tabs
    //           variant="scrollable"
    //           scrollButtons
    //           value={value}
    //           onChange={handleChange}
    //           aria-label="lineage selector"
    //           allowScrollButtonsMobile>
    //           {
    //             blogData.categories.map((label, index) => (
    //               <Tab key={index+"tab-section"} label={label} {...a11yProps(index)} />
    //             ))
    //           }
    //         </Tabs>
    //       </div>
    //     {
    //       blogData.categories.map((label, index) => {
    //         return (
    //           <TabPanel value={value} index={index} key={index+"tab"}>
    //             <Grid container spacing={0}>
    //               {
    //                 JSONPath({path: `$.posts[?(@.category === '${label}')]`, json: blogData}).map((post) => (
    //                   <Grid item xs={12} sm={4} key={post.id}>
    //                     <PostCard post={post}/>
    //                   </Grid>
    //                 ))
    //               }
    //             </Grid>
    //           </TabPanel>
    //         );
    //       })
    //     }


    //   </div>
    // </div>
  // );
}

export default PostsContainer;
