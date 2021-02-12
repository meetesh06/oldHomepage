
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

  return(
    <div className={classes.actionBar}>
      <Hidden mdUp implementation="css">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleSidebarToggle}
        >
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
