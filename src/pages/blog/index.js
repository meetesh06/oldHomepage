import React, { useEffect } from 'react';

import { Divider, Hidden } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectCurrentPost } from '../../store/currentPostSlice';
// import { getPostsJson } from '../../store/allPostsSlice';
import { Masonry } from '@mui/lab';

import { parsePostUrl } from "../../helper"

import {motion} from 'framer-motion';
import DisplayCard from '@/components/DisplayCard';

import blogPostsData from "@/blogPostsData.json";

import { DESCRIPTION_BLOG, TITLE_BLOG, USERNAME } from "@/config";
import Head from 'next/head';

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
  useEffect(() => {
    if (post) {
      const element = document.getElementById(`post-${post.id}`);
      element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
  }, [post]);

  const { posts } = blogPostsData;

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      exit="out"
      variants={staticContentVariants}
    >
      <Head>
        
        <title>{ TITLE_BLOG  }</title>
        <meta name="description" content={DESCRIPTION_BLOG}/>
      </Head>
    <Hidden mdUp>
      <Divider sx={(theme) => { return { marginBottom: theme.spacing(1), marginTop: theme.spacing(1) } }}/>
    </Hidden>
    <Masonry 
      columns={{ xs: 1, sm: 2, md: 3, lg: 3 }}
      spacing={0}
      >
        {
          posts.map((post, index) => (
            <DisplayCard key={`post-${index}`} 
              id={`post-${post.id}`}
              title={post.title} 
              text={post.description} 
              created={post.created}
              href={parsePostUrl(post.id, post.title)}
              />
          ))
        }
      </Masonry>
      </motion.div>
    );
}

export default Blog;

