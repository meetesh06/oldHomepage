import React, { useEffect, useState } from 'react';

import { Divider, Hidden, LinearProgress, Skeleton, Typography } from '@mui/material';
import PostCard from '../components/PostCard';

import { useSelector } from 'react-redux';
import { selectCurrentPost } from '../store/currentPostSlice';
import { getPostsJson } from '../store/allPostsSlice';
import { Masonry } from '@mui/lab';

import {motion} from 'framer-motion';

function Blog(props) {
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
        duration: 0.3
      }
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


  if (!posts.posts) {
    return <LinearProgress color="secondary" />
  }

  return (
    <motion.div 
      initial="hidden"
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
}

export default Blog;
