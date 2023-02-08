
import React from 'react';
import { makeStyles } from '@mui/styles';

import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { getPostsJson } from '../features/allPostsSlice';
import { updateCurrentPost } from '../features/currentPostSlice';
import { selectVisiblity, updateVisiblity } from '../features/sidebarState';

const useStyles = makeStyles((theme) => ({
  actionBar: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  }
}));


function SearchableActionBar(props) {
  const classes = useStyles();

  const { posts } = useSelector(getPostsJson);
  const toggle =  useSelector(selectVisiblity);
  const dispatch = useDispatch();

  const handleUpdate = (event, newValue) => {
    if(newValue === null) return;
    let index = parseInt(newValue.split(" >")[0]);
    dispatch(updateCurrentPost(posts[index]));
  }

  
  const handleSidebarToggle = () => {
    dispatch(updateVisiblity(!toggle));
  }

  return (
    <div className={classes.actionBar}>
      <Hidden mdUp implementation="css">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleSidebarToggle}
          size="large">
          <MenuIcon />
        </IconButton>
      </Hidden>
      <Autocomplete
        freeSolo
        onChange={handleUpdate}          
        options={posts.map((option, index) => index + ' > ' + option.title)}
        renderInput={(params) => (
          <TextField {...params} label="Search Posts" margin="normal" variant="outlined" />
        )}
      />
    </div>
  );
}

export default SearchableActionBar;
