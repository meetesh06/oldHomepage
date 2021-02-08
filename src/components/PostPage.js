
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

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

import {
  Link
} from "react-router-dom";

import {
  motion
} from 'framer-motion';

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
    axios.get('/posts.json')
      .then(function (response) {
        if(response.data.posts.length === 0) {
          setLoadingPost(false);
          setFound(false);
        } else {
          const post = JSONPath({path: `$.posts[?(@.id === '${id}')]`, json: response.data})
          if(post.length < 1) {
            setLoadingPost(false);
            setFound(false);
          } else {
            setFound(true);
            if(post[0].lineage !== undefined) {
              const lineageList = JSONPath({path: `$.posts[?(@.lineage === '${post[0].lineage}')]`, json: response.data});
              lineageList.sort(sortPosts);
              props.setLineage({list: lineageList, id, name: post[0].lineage});
            } else {
              props.setLineage({});
            }
            setPostMetaData(post[0]);
            renderPostFromLink(post[0].link);
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
      <Skeleton variant="rect" width={"100%"} height={"60vh"} />
    </div>
  )

  const renderers = {
    math: ({value}) => <Tex block math={value} />,
    inlineMath: ({value}) => <Tex math={value} />,
    code: ({language, value}) => {
      return <SyntaxHighlighter wrapLongLines wrapLines style={xonokai} language={language} children={value} />
    },

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

  // const handleScroll = () => {
  //   let ele = document.getElementById("main-holder");
  //   let height = ele.scrollHeight - ele.clientHeight;
  //   let curr = ele.scrollTop;
  //   let calc = height - curr;
  //   let scrollPrecent = 100 - calc/(height/100);
  //   setScrollProgress(scrollPrecent);
  // }

  // React.useEffect(() => {
  //   document.getElementById("main-holder").addEventListener('scroll', handleScroll);

  //   // cleanup this component
  //   return () => {
  //     document.getElementById("main-holder").removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return(
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
            <IconButton color="primary" aria-label="go-home">
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
