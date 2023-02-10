
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
  useNavigate,
  useParams
} from "react-router-dom";

import axios from 'axios';
import { Skeleton } from '@mui/material';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { xonokai, coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Chip from '@mui/material/Chip';

import Tooltip from '@mui/material/Tooltip';

import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';

import {
  Link
} from "react-router-dom";

import {
  AnimatePresence,
  motion
} from 'framer-motion';
import { URI_POST_FILES } from '../config';
import { nonCachedRequest } from './helper';

import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentPost } from '../features/currentPostSlice';
import { getPostsJson } from '../features/allPostsSlice';

import { selectSecret } from '../features/secretState';


import Crypto from "crypto-js";
import RightSidebar from './RightSidebar';

const useStyles = makeStyles((theme) => ({
  actionBar: {
    // position: 'fixed',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  paper: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(6),
    minHeight: '50vh',
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
  markdownImage: {
    maxWidth: '100%'
  },
  loader: {
    alignSelf: 'center'
  }
}));


const LoadingHeader = (postMetaData) => {
  const classes = useStyles();

  return(
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
    </div>
  );

}

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

  const secretPass = useSelector(selectSecret);

  const smoothLoadingEnd = () => {
    setLoadingPost(false);
  }

  React.useEffect(() => {
    const renderPostFromLink = (meta) => {
      axios.get(nonCachedRequest(URI_POST_FILES+'/'+meta.link, {}))
        .then((response) => {
          let post = response.data
          
          if (meta.category === "Secret") {
            var bytes  = Crypto.AES.decrypt(post, secretPass);
            // If the encoding fails, we know for sure it was a wrong password, hence the catch case will set the not found flag to true
            post = bytes.toString(Crypto.enc.Utf8);
          }

          var lines = post.split('\n');
          // get rid of the metadata comments
          lines.splice(0,5);
          var newtext = lines.join('\n');

          setPostData(newtext);
        })
        .catch((err) => {
          setFound(false);
        })
        .finally(() => {
          smoothLoadingEnd();
        })
    }

    let post = JSONPath({path: `$.posts[?(@.id === ${id})]`, json: posts})
    let secret = false;
    if(post.length < 1) {
      secret = true;
      if (!secretPass) {
        smoothLoadingEnd();
        setFound(false);
        return;
      }
      post = JSONPath({path: `$.secrets[?(@.id === ${id})]`, json: posts})
    }

    if(post.length < 1) {
      smoothLoadingEnd();
      setFound(false);
    } else {
      // console.log(post[0])
      if (!secret) {
        dispatch(updateCurrentPost(post[0]));
      }
      let meta = post[0]
      setPostMetaData(meta);
      
      // // during debugging, simulate network load time
      // setTimeout(function() {
        //   renderPostFromLink(post[0].link);
        //   //your code to be executed after 1 second
        // }, 1500);
        
        renderPostFromLink(meta);
        
        
        setFound(true);
    }
  }, [idRaw]);

  const renderSkeleton = (msg) => (
    <div>
      <Typography gutterBottom variant="h6" component="h2">
        {msg}
      </Typography>
      <Skeleton style={{borderRadius: 5}} variant="rectangular" width={"100%"} height={"60vh"} />
    </div>
  )

  function ImageRenderer(props) {
    return <img {...props} className={classes.markdownImage} />
  }
  

  const renderers = {
    math: ({value}) => <Tex block math={value} />,
    inlineMath: ({value}) => <Tex math={value} />,
    code: ({language, value}) => {
      return <SyntaxHighlighter wrapLongLines wrapLines style={coldarkDark} language={language} children={value} />
    },
    image: ImageRenderer
  }

  const pageVariants = {
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: "10vh"
    },
    FadeIn: {
      opacity: 1
    },
    FadeOut: {
      opacity: 0
    }
  }

  const pageTransitions = {
    duration: .2,
    type: "backInOut",
  }

  const navigate = useNavigate();
  return loadingPost ? <LinearProgress variant="indeterminate" /> :
  <motion.div
    initial="out"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransitions}
  >
    <div className={classes.actionBar}>
      <Tooltip title="Go Back" aria-label="go-home" arrow>
        {/* <Link to="/"> */}
          <IconButton onClick={() => {
            navigate(-1)
          }} color="primary" aria-label="go-home" size="large">
            <ArrowBack />
          </IconButton>
        {/* </Link> */}
      </Tooltip>
    </div>  
    <AnimatePresence mode='wait'>
      <Paper
        component={motion.div}
        initial="FadeOut"
        animate="FadeIn"
        exit="FadeOut"
        variants={pageVariants}
        transition={pageTransitions}
        className={classes.paper} elevation={3}>
        {
          !found ? (renderSkeleton("Post not found, please drop an email so I can have a look at this 👻 Thank you")) : 
            loadingPost ? <LoadingHeader postMetaData={postMetaData} /> :
          
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
        }
      </Paper>

    </AnimatePresence>
  </motion.div>;
}

export default HomeContent;
