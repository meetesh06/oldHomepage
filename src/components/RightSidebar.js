import React from 'react';
import { styled } from '@mui/material/styles';

import { sortPosts } from '../helper';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AccountTree from '@mui/icons-material/AccountTree';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import {JSONPath} from 'jsonpath-plus';

import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

// import {
//   Link, useNavigate
// } from "react-router-dom";

// import { parsePostUrl } from '../helper';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentPost } from '../store/currentPostSlice';
import { getPostsJson } from '../store/allPostsSlice';

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { selectSecret, updateSecret } from '../store/secretState';
import moment from "moment"
import {
  AnimatePresence,
  motion
} from 'framer-motion';
import { Paper } from '@mui/material';
const PREFIX = 'RightSidebar';

const classes = {
  rightAside: `${PREFIX}-rightAside`,
  lineageList: `${PREFIX}-lineageList`,
  passButton: `${PREFIX}-passButton`
};

const StyledPaper = styled(Paper)((
  {
    theme
  }
) => ({
  [`&.${classes.rightAside}`]: {
    marginBottom: theme.spacing(1),
    // borderStyle: 'solid',
    // borderWidth: 0.2,
    // borderRadius: theme.shape.borderRadius
    // paddingLeft: theme.spacing(1),
    // paddingRight: theme.spacing(1)
  },

  // lineageHolder: {
  //   marginTop: theme.spacing(2)
  // },
  [`& .${classes.lineageList}`]: {
    maxHeight: 300,
    overflow: "scroll"
  },

  [`& .${classes.passButton}`]: {
    marginTop: 10
  }
}));

const BLOG = {
  rightDrawerWidth: 300
}



function SecretPosts() {
  const getSorted = (a) => {
    let arr = [...a]
    arr.sort(function(a,b){
      // Date(moment(b.created, 'DD-MM-YYYY').format())
      return moment(b.created, 'DD-MM-YYYY').toDate() - moment(a.created, 'DD-MM-YYYY').toDate()
    });
    console.log(arr)
    return arr
  }
  const secretPass = useSelector(selectSecret);
  const posts = useSelector(getPostsJson);



  const dispatch = useDispatch();

  const [openSecrets, setOpenSecrets] = React.useState(false);

  const [sec, setSec] = React.useState("");
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
  let secrets = posts.secrets;

  if (secrets !== undefined) {
    // secrets.sort(function(a,b){
    //   // Date(moment(b.created, 'DD-MM-YYYY').format())
    //   return true;
    // });
    
  }
  const post = useSelector(selectCurrentPost);

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

  return(<div>
          <TextField value={sec} onChange={handleSecretChange} fullWidth label="Know what I know?"/>
            {
              sec != "" && 
              <Button onClick={updateSecretInStore} color="secondary" className={classes.passButton} fullWidth variant="contained">Magic</Button>
            }
            {
              sec === "" || secrets === undefined || secretPass === undefined || secretPass === "" ? (<br/>) : (
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
                            <div>
                              {`post-${index}`}
                            </div>
                            // <ListItem onClick={() => setSec("")} key={"lineage-"+index} component={Link} to={parsePostUrl(post.id, post.title)} selected={post.id === lineageData.id} button>
                            //   <ListItemAvatar>
                            //     {
                            //       post.id === lineageData.id ?
                            //       <Avatar >
                            //         <TurnedInIcon />
                            //       </Avatar> :
                            //       <Avatar >
                            //         <TurnedInNotIcon />
                            //       </Avatar>  

                            //     }
                            //   </ListItemAvatar>
                            //   <ListItemText
                            //     primary={post.description}
                            //     secondary={post.created}
                            //   />
                            // </ListItem>
                          );
                        })
                      }                  
                    </List>
                  </Collapse>
                </div>
              )
            }
  </div>)
}

function RightSidebar(props) {

  const posts = useSelector(getPostsJson);
  const post = useSelector(selectCurrentPost);

  const [open, setOpen] = React.useState(true);


  // const navigate = useNavigate();

  

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

  

  

  const handleClick = () => {
    setOpen(!open);
  };



  const staticContentVariants = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <StyledPaper
      component={motion.div} 
      initial="hidden"
      animate="show"
      variants={staticContentVariants}
      className={classes.rightAside}>
      


      {
        lineageData.name === undefined ? (<div></div>) : (
          <div className={classes.lineageHolder}>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <AccountTree />
              </ListItemIcon>
              <ListItemText primary={lineageData.name} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List className={classes.lineageList} dense={true}>
                {
                  lineageData.list.map((post, index) => {
                    return (
                      <ListItem key={"lineage-"+index} onClick={() => {
                          // navigate(parsePostUrl(post.id, post.title))
                        }} selected={post.id === lineageData.id} button>
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
      
        
      

                
    </StyledPaper>
  );
}

export default RightSidebar;
