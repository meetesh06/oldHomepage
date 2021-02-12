
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SelectedPost from './SelectedPost';
import PostsContainer from './PostsContainer';
import SearchableActionBar from './SearchableActionBar';

import {
  motion
} from 'framer-motion';


function HomeContent(props) {

  
  const pageVariants = {
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 0.8,
    }
  }

  const pageTransitions = {
    duration: .3,
    type: "backInOut",
  }

  return(
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
      <SearchableActionBar />
      <SelectedPost />      
      <PostsContainer />
    </motion.div>
  );
}

export default HomeContent;
