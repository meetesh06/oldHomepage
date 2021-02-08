
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import LatestPost from './LatestPost';
import PostsContainer from './PostsContainer';

import axios from 'axios';

import {
  motion
} from 'framer-motion';



const useStyles = makeStyles((theme) => ({
  actionBar: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  }
}));


function HomeContent(props) {
  const classes = useStyles();
  const history = useHistory();

  const [loadingPosts, setLoadingPosts] = React.useState(true);
  const [noPost, setNoPost] = React.useState(false);
  const [searchOptions, setSearchOptions] = React.useState([{title: "loading..."}]);
  const [blogData, setBlogData] = React.useState({});
  const [selectedPost, setSelectedPost] = React.useState();

  const navigateToPost = (id, title) => {
    history.push('/blog/'+id+'/'+title);
  }

  function sortPosts(a, b) {
    return new Date(b.created).getTime() - new Date(a.created).getTime();
  }

  React.useEffect(() => {
    axios.get('/posts.json')
      .then(function (response) {
        if(response.data.posts.length === 0) {
          setNoPost(true);
        } else {
          response.data.posts.sort(sortPosts);
          setBlogData(response.data);
          setSearchOptions(response.data.posts);
          setSelectedPost({...response.data.posts[0], index: 0});
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        setLoadingPosts(false);
      });
  }, [loadingPosts]);

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
      <div className={classes.actionBar}>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Autocomplete
          freeSolo
          onChange={(event, newValue) => {
            if(newValue === null) return;
            let index = parseInt(newValue.split(" >")[0]);
            setSelectedPost(blogData.posts[index]);
          }}          
          options={searchOptions.map((option, index) => index + ' > ' + option.title)}
          getOptionDisabled={() => loadingPosts}
          renderInput={(params) => (
            <TextField {...params} label="Search Posts" margin="normal" variant="outlined" />
          )}
        />
      </div>
      <LatestPost noPost={noPost} loadingPosts={loadingPosts} post={selectedPost} navigateToPost={navigateToPost}/>
      <PostsContainer blogData={blogData} noPost={noPost} loadingPosts={loadingPosts} navigateToPost={navigateToPost}/>
    </motion.div>
  );
}

export default HomeContent;
