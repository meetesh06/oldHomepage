import React from 'react';
import Hidden from '@material-ui/core/Hidden';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { sortPosts } from './helper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AccountTree from '@material-ui/icons/AccountTree';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {JSONPath} from 'jsonpath-plus';

import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';

import {
  Link
} from "react-router-dom";

import { parsePostUrl } from './helper';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentPost } from '../features/currentPostSlice';
import { getPostsJson } from '../features/allPostsSlice';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { selectSecret, updateSecret } from '../features/secretState';
import moment from "moment"
const BLOG = {
  rightDrawerWidth: 300
}



const useStyles = makeStyles((theme) => ({
  rightAside: {
    width: BLOG.rightDrawerWidth,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(3),
  },
  lineageHolder: {
    marginTop: theme.spacing(3)
  },
  lineageList: {
    maxHeight: 300,
    overflow: "scroll"
  },
  passButton: {
    marginTop: 10
  }
}));

function RightSidebar(props) {
  const classes = useStyles();  
  const posts = useSelector(getPostsJson);
  const post = useSelector(selectCurrentPost);

  const [openSecrets, setOpenSecrets] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [sec, setSec] = React.useState("");

  const dispatch = useDispatch();

  const secretPass = useSelector(selectSecret);
  
  function calculateLineage() {
    if(post !== null && post !== undefined && post.lineage !== undefined) {
      const lineageList = JSONPath({path: `$.posts[?(@.lineage === '${post.lineage}')]`, json: posts});
      lineageList.sort(sortPosts);
      return {list: lineageList, id: post.id, name: post.lineage};
    } else {
      return {};
    }
  }

  const lineageData = calculateLineage();

  let secrets = posts.secrets;

  if (secrets !== undefined) {
    // secrets.sort(function(a,b){
    //   // Date(moment(b.created, 'DD-MM-YYYY').format())
    //   return true;
    // });
    
  }

  const getSorted = (a) => {
    let arr = [...a]
    arr.sort(function(a,b){
      // Date(moment(b.created, 'DD-MM-YYYY').format())
      return moment(b.created, 'DD-MM-YYYY').toDate() - moment(a.created, 'DD-MM-YYYY').toDate()
    });
    console.log(arr)
    return arr
  }

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickSecrets = () => {
    setOpenSecrets(!openSecrets);
  };

  const handleSecretChange = (e) => {
    setSec(e.target.value)
  };

  const updateSecretInStore = (e) => {
    let s = sec
    // setSec("");
    dispatch(updateSecret(s));
    // updateSecret(s);
  };

  return (
    <Hidden smDown implementation="css">
      <div className={classes.rightAside}>
        <Card className={classes.root}>
          <CardContent>
            <form noValidate autoComplete="off">
              <TextField onChange={handleSecretChange} fullWidth id="outlined-basic" label="Know what I know?" variant="outlined" />
              <Button onClick={updateSecretInStore} color="secondary" className={classes.passButton} fullWidth variant="outlined">Magic</Button>
            </form>
          </CardContent>
        </Card>
        {
          secrets === undefined || secretPass === undefined || secretPass === "" ? (<br/>) : (
            <div className={classes.lineageHolder}>
              <ListItem button onClick={handleClickSecrets}>
                <ListItemIcon>
                  <AccountTree />
                </ListItemIcon>
                <ListItemText primary={"Secrets"} secondary="For the intended folks" />
                {openSecrets ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openSecrets} timeout="auto" unmountOnExit>
                <List className={classes.lineageList} dense={true}>
                  {
                    getSorted(secrets).map((post, index) => {
                      return (
                        <ListItem key={"lineage-"+index} component={Link} to={parsePostUrl(post.id, post.title)} selected={post.id === lineageData.id} button>
                          <ListItemAvatar>
                            {
                              post.id === lineageData.id ?
                              <Avatar >
                                <TurnedInIcon />
                              </Avatar> :
                              <Avatar >
                                <TurnedInNotIcon />
                              </Avatar>  

                            }
                          </ListItemAvatar>
                          <ListItemText
                            primary={post.description}
                            secondary={post.created}
                          />
                        </ListItem>
                      );
                    })
                  }                  
                </List>
              </Collapse>
            </div>
          )
        }


        {
          lineageData.name === undefined ? (<br/>) : (
            <div className={classes.lineageHolder}>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <AccountTree />
                </ListItemIcon>
                <ListItemText primary={lineageData.name} secondary="post lineage shows all the posts in this series." />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List className={classes.lineageList} dense={true}>
                  {
                    lineageData.list.map((post, index) => {
                      return (
                        <ListItem key={"lineage-"+index} component={Link} to={parsePostUrl(post.id, post.title)} selected={post.id === lineageData.id} button>
                          <ListItemAvatar>
                            {
                              post.id === lineageData.id ?
                              <Avatar >
                                <TurnedInIcon />
                              </Avatar> :
                              <Avatar >
                                <TurnedInNotIcon />
                              </Avatar>  

                            }
                          </ListItemAvatar>
                          <ListItemText
                            primary={post.title}
                            secondary={post.created}
                          />
                        </ListItem>
                      );
                    })
                  }                  
                </List>
              </Collapse>
            </div>
          )
        }
        
          
        

                  
      </div>
    </Hidden>
  );
}

export default RightSidebar;
