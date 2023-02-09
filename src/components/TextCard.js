import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Button, CardActions } from '@mui/material';
import { useTheme } from '@emotion/react';
import { motion } from 'framer-motion';

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
  const { title, text, links, textList } = props
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
            component={motion.ul}
            variants={listContainer}
            initial="hidden"
            animate="show"
            variant="body"
            style={{
              padding: 0
            }}
            color="text.secondary">
            {
              textList && (
                textList.map((data) => 
                  <motion.li style={{listStyle: 'none'}} variants={listItem}>
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
                links.map((link) => {
                  return <Button size="small">{link[1]}</Button>
                })
              }
            </CardActions>
          )
        }
      </Card>
    </div>
  );
}