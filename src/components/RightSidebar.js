import React from 'react';
import Hidden from '@material-ui/core/Hidden';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AccountTree from '@material-ui/icons/AccountTree';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Nature from '@material-ui/icons/Nature';
import Collapse from '@material-ui/core/Collapse';

import {
  Link
} from "react-router-dom";

const BLOG = {
  rightDrawerWidth: 300
}

const useStyles = makeStyles((theme) => ({
  rightAside: {
    width: BLOG.rightDrawerWidth,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(3),
  },
  lineageHolder: {
    marginTop: theme.spacing(3)
  },
  lineageList: {
    maxHeight: 300,
    overflow: "scroll"
  }
}));

function RightSidebar(props) {
  const classes = useStyles();
  const lineageData = props.lineage;

  const [open, setOpen] = React.useState(true);
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    axios.get('http://numbersapi.com/'+Math.floor(Math.random() * 1000))
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        setData("Homer says D'Oh");
      })
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Hidden smDown implementation="css">
      <div className={classes.rightAside}>
        <Card className={classes.root}>
          <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Fact of the do'h
              </Typography>
              <Typography variant="h5" component="h2">
                {data}
              </Typography>
          </CardContent>
        </Card>

        {
          lineageData.name === undefined ? (<br/>) : (
            <div className={classes.lineageHolder}>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <AccountTree />
                </ListItemIcon>
                <ListItemText primary={lineageData.name} secondary="post lineage shows all the posts in this series." />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List className={classes.lineageList} dense={true}>
                  {
                    lineageData.list.map((post, index) => {
                      return (
                        <ListItem key={"lineage-"+index} component={Link} to={`/post/${post.id}/${post.title}`} selected={post.id === lineageData.id} button>
                          <ListItemAvatar>
                            <Avatar>
                              <Nature style={{ color: post.id === lineageData.id ? "green" : "gray" }}/>
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={post.title}
                            secondary={post.created}
                          />
                        </ListItem>
                      );
                    })
                  }                  
                </List>
              </Collapse>
            </div>
          )
        }
        
          
        

                  
      </div>
    </Hidden>
  );
}

export default RightSidebar;
