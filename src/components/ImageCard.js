import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  AnimatePresence,
  motion
} from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  card: {
    // width: 325,
    // margin: theme.spacing(4),
    padding: theme.spacing(1)
  },
  newsItem: { 
    marginRight: theme.spacing(1),
    fontWeight: 'bold', 
    color: theme.palette.type === 'dark' ? theme.palette.info.dark : theme.palette.info.light
  }
}))

export default function ImageCard(props) {
  const classes = useStyles();
  const [hovered, setHovered] = React.useState(false);

  const { title, text, imageUri, links, index, small } = props

  return (
    <div
    className={small ? undefined : classes.card}
      >
      <Card
        key={index}
        color='primary'
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
          <CardMedia
            component="img"
            height="220"
            image={imageUri}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography
              variant="subtitle1" color="text.secondary">
              {text}
            </Typography>
          </CardContent>
          {
            links && links.length > 0 && (
              <CardActions>
                {
                  links.map((link, idx) => {
                    return <Button key={`${link[1]}-${idx}`} size="small">{link[1]}</Button>
                  })
                }
              </CardActions>
            )
          }
      </Card>
    </div>
  );
}