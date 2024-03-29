
import React from 'react';
import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { getPostsJson } from '../features/allPostsSlice';
import { updateCurrentPost } from '../features/currentPostSlice';
import { selectVisiblity, updateVisiblity } from '../features/sidebarState';

const PREFIX = 'SearchableActionBar';

const classes = {
  actionBar: `${PREFIX}-actionBar`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.actionBar}`]: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  }
}));


function SearchableActionBar(props) {


  const { posts } = useSelector(getPostsJson);
  const toggle =  useSelector(selectVisiblity);
  const dispatch = useDispatch();

  const handleUpdate = (event, newValue) => {
    if(newValue === null) return;
    let index = parseInt(newValue.split(" >")[0]);
    dispatch(updateCurrentPost(posts[index]));
  }

  return (
    <Root className={classes.actionBar}>
      {
        posts &&
        <Autocomplete
          freeSolo
          onChange={handleUpdate}          
          options={posts.map((option, index) => index + ' > ' + option.title)}
          renderInput={(params) => (
            <TextField {...params} label="Search Posts" margin="normal" variant="outlined" />
          )}
        />
      }
    </Root>
  );
}

export default SearchableActionBar;
