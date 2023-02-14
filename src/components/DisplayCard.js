import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, CardMedia } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';

const PREFIX = 'DisplayCard';

const classes = {
  card: `${PREFIX}-card`,
  newsItem: `${PREFIX}-newsItem`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.card}`]: {
    // width: 325,
    padding: theme.spacing(1)
  },

  [`& .${classes.newsItem}`]: { 
    marginRight: theme.spacing(1),
    fontWeight: 'bold', 
    color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
  }
}));

const StaticCardContent = (props) => {
  const { title, text, textList, created } = props;

  const [ref, inView] = useInView();

  const controls = useAnimation();
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

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return(
    <CardContent>
      {
        created && 
        <Typography variant="body2" color="text.secondary">
          {created}
        </Typography>
      }
      {
        title && 
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      }
      {
        text &&
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      }
      {
        textList && 
        <Typography 
          ref={ref}
          component={motion.ul}
          variants={listContainer}
          initial="hidden"
          animate={controls}
          // animate="show"
          variant="body2"
          style={{
            padding: 0
          }}
          color="text.secondary">
          {
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
          }
        </Typography>
      }
      
    </CardContent>
  );

}

export default function DisplayCard(props) {

  const { title, links, index, imageUri,  href, id } = props
  const [hovered, setHovered] = useState(false);

  
  
  return (
    <Root className={classes.card} >

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
        {
          imageUri &&
            <CardMedia
              component="img"
              height="220"
              image={imageUri}
              alt={title}
            />
        }
        {
          href ? (
            <div id={id ? id : undefined}>
              <Link href={href}>
                <CardActionArea>
                  <StaticCardContent {...props} />
                </CardActionArea>
              </Link>
            </div>
          ) : <StaticCardContent {...props} />
        }
        
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
    </Root>
  );
}