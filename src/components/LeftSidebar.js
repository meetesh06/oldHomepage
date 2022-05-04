import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MailOutline from '@material-ui/icons/MailOutline';

import SimpleLink from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';


import { useSelector, useDispatch } from 'react-redux';
import { selectVisiblity, updateVisiblity } from '../features/sidebarState';



import {
  Link
} from "react-router-dom";

import BLOG from '../config';

const leftDrawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: leftDrawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: leftDrawerWidth,
  },

  leftSide: {
    backgroundColor: theme.blogLeftDrawerBackground,
    flexGrow: 1,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column"
  },
  leftTop: {
    flex: 1,
  },
  siteName: {
    fontWeight: theme.typography.fontWeightLight,
    color: theme.blogLogo,
    fontSize: "3rem",
    cursor: "pointer",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    textDecoration: "none"
  },
  siteDescription: {
    ...theme.typography.body2,
    color: theme.blogDescription,
    fontSize: "1rem"
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
  },
  largeAvatar: {
    width: leftDrawerWidth - 150,
    height: leftDrawerWidth - 150,
    alignSelf: "center",
  },
  authorName: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.authorName,
    fontWeight: theme.typography.fontWeightRegular,
    alignSelf: "center",
  },
  authorDes: {
    ...theme.typography.caption,
    color: theme.authorDescription,
    fontWeight: theme.typography.fontWeightMedium,
    padding: theme.spacing(),
    borderLeft: `2px solid ${theme.palette.primary.main}`
  },

}));

function LeftSidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const container = window !== undefined ? () => window().document.body : undefined;
  const mobileOpen =  useSelector(selectVisiblity);
  const dispatch = useDispatch();

  const handleSidebarToggle = () => {
    dispatch(updateVisiblity(!mobileOpen));
  }

  const drawer = (
    <div className={classes.leftSide}>
      <Typography component={Link} to="/" align="left" variant="h4" className={classes.siteName}>
        {BLOG.blogName}
      </Typography>
      <div className={classes.leftTop}>
        <Typography paragraph className={classes.siteDescription}>
          {BLOG.blogDescription}
          <br/>
          <br/>
        </Typography>
      </div>
      <div>
        <div className={classes.avatarContainer}>
          <Avatar
            align="center"
            alt={BLOG.authorName + "'s picture"}
            src={BLOG.authorImage}
            className={classes.largeAvatar} />
          <Typography align="left" variant="h6" className={classes.authorName}>
            {BLOG.authorName}
          </Typography>
          <Typography paragraph align="left" className={classes.authorDes}>
            {BLOG.authorDescription}
          </Typography>
          <Tooltip title={BLOG.authorEmail} aria-label="email" arrow>
            <SimpleLink href={"mailto:"+BLOG.authorEmail}>
              <IconButton color="primary" aria-label="author-email">
                <MailOutline />
              </IconButton>
            </SimpleLink>
          </Tooltip>
        </div>
      </div>
    </div>
  );

  

  return (

    <nav className={classes.drawer} aria-label="blog details">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleSidebarToggle}
          classes={{
              paper: classes.drawerPaper,
          }}
          ModalProps={{
              keepMounted: true
          }}
        >
        {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default LeftSidebar;
