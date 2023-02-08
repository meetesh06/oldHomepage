
import React from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {JSONPath} from 'jsonpath-plus';
import ReactMarkdown from 'react-markdown';
import Tex from '@matejmazur/react-katex'
import math from 'remark-math'
import 'katex/dist/katex.min.css'
import Divider from '@mui/material/Divider';

import {
  useParams
} from "react-router-dom";

import axios from 'axios';
import Skeleton from '@mui/lab/Skeleton';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Chip from '@mui/material/Chip';

import Tooltip from '@mui/material/Tooltip';

import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';

import {
  Link
} from "react-router-dom";

import {
  motion
} from 'framer-motion';
import BLOG from '../config';

import {nonCachedRequest} from './helper';

const useStyles = makeStyles((theme) => ({
  actionBar: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  paper: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(6),
    
    fontFamily: 'Roboto',
    "& a": {
      textDecoration: "none",
    },
    [theme.breakpoints.down('lg')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(1),
      padding: theme.spacing(2),
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(40),
    fontWeight: theme.typography.fontWeightBold
  },
  divider: {
    marginTop: theme.spacing(4),
  },
  categoryName: {
    marginRight: theme.spacing(1),
  },
  dateHolder: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  dateStyle: {
    fontWeight: theme.typography.fontWeightLight,
    fontSize: theme.typography.pxToRem(13)
  },
  markdownHolder: {
    // padding: theme.spacing(2)
  },
  markdownImageHolder: {
    margin: theme.spacing(3)
  },
  markdownImage: {
    maxWidth: '100%'
  }
}));

function HomeContent(props) {
  const { id } = useParams();
  const classes = useStyles();
  const [loadingPost, setLoadingPost] = React.useState(true);
  // const [scrollProgress, setScrollProgress] = React.useState(0);
  const [postMetaData, setPostMetaData] = React.useState(null);
  const [postData, setPostData] = React.useState("");
  const [found, setFound] = React.useState(false);


  const [animationDone, setAnimationDone] = React.useState(false);

  const [animationBuffer, setAnimationBuffer] = React.useState(null);

  React.useEffect(() => {
    if(!animationDone) return;
    setPostData(animationBuffer);
    setLoadingPost(false);  
  }, [animationDone]);


  const renderPostFromLink = (link) => {
    axios.get(link)
      .then((response) => {
        if(!animationDone) {
          setAnimationBuffer(response.data);
        } else {
          setPostData(response.data);
          setLoadingPost(false);  
        }
      })
      .catch((err) => {
        setLoadingPost(false);
        setFound(false);
      })
  }

  function sortPosts(a, b) {
    return new Date(b.created).getTime() - new Date(a.created).getTime();
  }

  React.useEffect(() => {
    axios.get(nonCachedRequest(BLOG.URI_POSTS))
      .then(function (response) {
        if(response.data.posts.length === 0) {
          setLoadingPost(false);
          setFound(false);
        } else {
          if(post.length < 1) {
            setLoadingPost(false);
            setFound(false);
          } else {
            setFound(true);
          }
        }
        
      })
      .catch(function (error) {
        setLoadingPost(false);
        setFound(false);
      })
  }, [loadingPost]);

  const renderSkeleton = (msg) => (
    <div>
      <Typography gutterBottom variant="h5" component="h2">
        {msg}
      </Typography>
      <Skeleton variant="rectangular" width={"100%"} height={"60vh"} />
    </div>
  )

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

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
      onAnimationComplete={()=>setAnimationDone(true)}
    >
      {/* <div className={classes.progressHolder}>
        <LinearProgress variant="determinate" value={scrollProgress} />
      </div> */}

      <div className={classes.actionBar}>
        <Tooltip title="Go Back" aria-label="go-home" arrow>
          <Link to="/">
            <IconButton color="primary" aria-label="go-home" size="large">
              <ArrowBack />
            </IconButton>
          </Link>
        </Tooltip>
      </div>  

      <Paper className={classes.paper} elevation={3}>
        {
          loadingPost ? (renderSkeleton("Loading Post...")) : (
            !found ? (renderSkeleton("post not found...")) : (
              <div>
                <Typography className={classes.heading} variant="h2" component="h1">
                  {postMetaData.title}
                </Typography>
                <span className={classes.dateHolder}>
                  <Chip className={classes.categoryName} label={postMetaData.category} />
                  <Typography className={classes.dateStyle} variant="body2" component="p">
                    created on {postMetaData.created}
                  </Typography>
                </span>
                <Divider className={classes.divider} variant="middle" />
                <ReactMarkdown className={classes.markdownHolder} plugins={[math]} renderers={renderers}>
                  {postData}
                </ReactMarkdown>
              </div>
            )
          )
        }        
      </Paper>
    </motion.div>
  );
}

export default HomeContent;
