
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {JSONPath} from 'jsonpath-plus';
import ReactMarkdown from 'react-markdown';
import Tex from '@matejmazur/react-katex'
import math from 'remark-math'
import 'katex/dist/katex.min.css'
import Divider from '@material-ui/core/Divider';

import {
  useParams
} from "react-router-dom";

import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Chip from '@material-ui/core/Chip';

import Tooltip from '@material-ui/core/Tooltip';

import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

import {
  Link
} from "react-router-dom";

import {
  motion
} from 'framer-motion';
import BLOG from '../config';
import { nonCachedRequest } from './helper';

import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentPost } from '../features/currentPostSlice';
import { getPostsJson } from '../features/allPostsSlice';


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
    minHeight: '50vh',
    fontFamily: 'Roboto',
    "& a": {
      textDecoration: "none",
    },
    [theme.breakpoints.down('md')]: {
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
  markdownImage: {
    maxWidth: '100%'
  },
  loader: {
    alignSelf: 'center'
  }
}));

function HomeContent(props) {
  const classes = useStyles();
  
  const { idRaw } = useParams();
  const id = idRaw.split('-')[0];

  const dispatch = useDispatch();
  const posts = useSelector(getPostsJson);
  
  const [loadingPost, setLoadingPost] = React.useState(true);
  const [postMetaData, setPostMetaData] = React.useState(null);
  const [postData, setPostData] = React.useState("");
  const [found, setFound] = React.useState(false);
  const [animationDone, setAnimationDone] = React.useState(false);
  const [animationBuffer, setAnimationBuffer] = React.useState(null);
  const [progress, setProgress] = React.useState(50);

  React.useEffect(() => {
    if(!animationDone) return;
    setPostData(animationBuffer);
    setLoadingPost(false);
  }, [animationDone]);

  React.useEffect(() => {
    const renderPostFromLink = (link) => {
      axios.get(nonCachedRequest(BLOG.URI_POST_FILES+'/'+link, {
        onDownloadProgress : progressEvent => {
          if (!progressEvent.lengthComputable) return;
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      }))
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

    const post = JSONPath({path: `$.posts[?(@.id === '${id}')]`, json: posts})

    if(post.length < 1) {
      setLoadingPost(false);
      setFound(false);
    } else {
      setFound(true);
      dispatch(updateCurrentPost(post[0]));
      setPostMetaData(post[0]);
      renderPostFromLink(post[0].link);
    }
  }, []);

  const renderSkeleton = (msg) => (
    <div>
      <Typography gutterBottom variant="h5" component="h2">
        {msg}
      </Typography>
      <Skeleton variant="rect" width={"100%"} height={"60vh"} />
    </div>
  )

  function ImageRenderer(props) {
    return <img {...props} className={classes.markdownImage} />
  }
  

  const renderers = {
    math: ({value}) => <Tex block math={value} />,
    inlineMath: ({value}) => <Tex math={value} />,
    code: ({language, value}) => {
      return <SyntaxHighlighter wrapLongLines wrapLines style={xonokai} language={language} children={value} />
    },
    image: ImageRenderer
  }

  const pageVariants = {
    in: {
      y: 0
    },
    out: {
      y: "100vh"
    }
  }

  const pageTransitions = {
    duration: .5,
    type: "backInOut",
  }

  return(
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
      onAnimationComplete={()=>setAnimationDone(true)}
    >

      <div className={classes.actionBar}>
        <Tooltip title="Go Back" aria-label="go-home" arrow>
          <Link to="/">
            <IconButton color="primary" aria-label="go-home">
              <ArrowBack />
            </IconButton>
          </Link>
        </Tooltip>
      </div>  

      <Paper className={classes.paper} elevation={3}>
        {
          !loadingPost && !found ? (renderSkeleton("post not found...")) : (
            loadingPost ? (
              found ? (
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
                  {
                    progress < 100 ? (<LinearProgress variant="determinate" value={progress} />) : (<br/>)
                  }
                </div>
              ) : (
                  progress < 100 ? (<LinearProgress variant="determinate" value={progress} />) : (<br/>)
              )
            ) : (
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
