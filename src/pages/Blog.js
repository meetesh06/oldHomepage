import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

import Box from '@mui/material/Box';
import { Divider, Hidden, LinearProgress, Skeleton, Typography } from '@mui/material';
import PostCard from '../components/PostCard';

import { useSelector } from 'react-redux';
import { selectCurrentPost } from '../features/currentPostSlice';
import { getPostsJson } from '../features/allPostsSlice';
import { Masonry } from '@mui/lab';

import {motion} from 'framer-motion';

function Blog(props) {
  const staticContentVariants = {
    initial: {opacity: 0, scale: 0.90 },
    show: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 0.90
    }
  }

  // Hooks
  let post = useSelector(selectCurrentPost);
  const posts = useSelector(getPostsJson);
  useEffect(() => {
    if (post) {
      const element = document.getElementById(`post-${post.id}`);
      element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
  }, [post]);

  const { preloadList } = props;
  useEffect(() => {
    preloadList.forEach(e => {
      e.preload()
    })
  }, []);

  if (!posts.posts) {
    return <LinearProgress color="secondary" />
  }

  return (
    <motion.div 
      initial="initial"
      animate="show"
      exit="out"
      variants={staticContentVariants}
    >
    <Hidden mdUp>
      <Divider sx={(theme) => { return { marginBottom: theme.spacing(1), marginTop: theme.spacing(1) } }}/>
    </Hidden>
    <Masonry 
      columns={{ xs: 1, sm: 2, md: 3, lg: 3 }}
      spacing={2}
      >
        {
          posts.posts.map((post, index) => (
            <PostCard key={`post-${index}`} post={post}/>
          ))
        }
      </Masonry>
      </motion.div>
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

export default Blog;
