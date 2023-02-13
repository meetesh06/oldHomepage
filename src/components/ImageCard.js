import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {
  AnimatePresence,
  motion
} from 'framer-motion';

const PREFIX = 'ImageCard';

const classes = {
  card: `${PREFIX}-card`,
  newsItem: `${PREFIX}-newsItem`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.card}`]: {
    // width: 325,
    // margin: theme.spacing(4),
    padding: theme.spacing(1)
  },

  [`& .${classes.newsItem}`]: { 
    marginRight: theme.spacing(1),
    fontWeight: 'bold', 
    color: theme.palette.type === 'dark' ? theme.palette.info.dark : theme.palette.info.light
  }
}));

export default function ImageCard(props) {

  const [hovered, setHovered] = React.useState(false);

  const { title, text, imageUri, links, index, small } = props

  return (
    <Root
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
    </Root>
  );
}