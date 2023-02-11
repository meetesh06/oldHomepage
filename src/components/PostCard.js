import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { parsePostUrl } from './helper';

const useStyles = makeStyles((theme) => ({
  card: {
    // width: 325,
    // padding: theme.spacing(1),
    // paddingTop: 0,
    // paddingBottom: theme.spacing(2)
  },
  newsItem: { 
    marginRight: theme.spacing(1),
    fontWeight: 'bold', 
    color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
  }
}))

export default function PostCard(props) {
  const classes = useStyles();
  const { post } = props
  const [hovered, setHovered] = React.useState(false);

  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
        // staggerDirection: -1
      }
    }
  }

  const listItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }
  
  return (
    <div className={classes.card} >

      <Card
        layout 
        component={motion.div}
        whileHover="hover"
        variants={{
          hover: {
            scale: 1.02,
          }
        }}
        // style={{ paddingBottom: 50 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        raised={hovered}
        >
          <CardActionArea
            component={Link}
            id={`post-${post.id}`}
            to={parsePostUrl(post.id, post.title)}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                  {post.created}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body" color="text.secondary">
                  {post.description}
              </Typography>
            </CardContent>

          </CardActionArea>
      </Card>
    </div>
  );
}