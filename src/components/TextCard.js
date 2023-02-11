import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Button, CardActions } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { useState } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  card: {
    // width: 325,
    padding: theme.spacing(1)
  },
  newsItem: { 
    marginRight: theme.spacing(1),
    fontWeight: 'bold', 
    color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
  }
}))

export default function TextCard(props) {
  const classes = useStyles();
  const { title, text, links, textList, index } = props
  const [hovered, setHovered] = useState(false);

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        key={index}
        layout 
        component={motion.div}
        whileHover="hover"
        variants={{
          hover: {
            scale: 1.02,
          }
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        raised={hovered}
        
        >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body" color="text.secondary">
              {
              text && text
              }
          </Typography>
          <Typography 
            ref={ref}
            component={motion.ul}
            variants={listContainer}
            initial="hidden"
            animate={controls}
            // animate="show"
            variant="body"
            style={{
              padding: 0
            }}
            color="text.secondary">
            {
              textList && (
                textList.map((data,index) => 
                  <motion.li key={`${data[0]}-${index}`} style={{listStyle: 'none'}} variants={listItem}>
                    <div className={classes.newsItem}>
                      {data[0]}
                    </div>
                    <div>
                      {data[1]}
                    </div>
                  </motion.li>
                )
              )
            }
          </Typography>
          
        </CardContent>
        {
          links && links.length > 0 && (
            <CardActions>
              {
                links.map((link, index) => {
                  return <Button key={`${link[1]}-${index}`} href={link[0]} target="_blank" size="small">{link[1]}</Button>
                })
              }
            </CardActions>
          )
        }
      </Card>
    </div>
  );
}