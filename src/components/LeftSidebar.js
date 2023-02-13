import React from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MailOutline from '@mui/icons-material/MailOutline';

import SimpleLink from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';


import { useSelector, useDispatch } from 'react-redux';
import { selectVisiblity, updateVisiblity } from '../features/sidebarState';



import {
  Link
} from "react-router-dom";

import BLOG from '../config';

const PREFIX = 'LeftSidebar';

const classes = {
  drawer: `${PREFIX}-drawer`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  leftSide: `${PREFIX}-leftSide`,
  leftTop: `${PREFIX}-leftTop`,
  siteName: `${PREFIX}-siteName`,
  siteDescription: `${PREFIX}-siteDescription`,
  avatarContainer: `${PREFIX}-avatarContainer`,
  largeAvatar: `${PREFIX}-largeAvatar`,
  authorName: `${PREFIX}-authorName`,
  authorDes: `${PREFIX}-authorDes`
};

const Root = styled('nav')((
  {
    theme
  }
) => ({
  [`&.${classes.drawer}`]: {
    [theme.breakpoints.up('md')]: {
      width: leftDrawerWidth,
      flexShrink: 0,
    },
  },

  [`& .${classes.drawerPaper}`]: {
    width: leftDrawerWidth,
  },

  [`& .${classes.leftSide}`]: {
    backgroundColor: theme.blogLeftDrawerBackground,
    flexGrow: 1,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column"
  },

  [`& .${classes.leftTop}`]: {
    flex: 1,
  },

  [`& .${classes.siteName}`]: {
    fontWeight: theme.typography.fontWeightLight,
    color: theme.blogLogo,
    fontSize: "3rem",
    cursor: "pointer",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    textDecoration: "none"
  },

  [`& .${classes.siteDescription}`]: {
    ...theme.typography.body2,
    color: theme.blogDescription,
    fontSize: "1rem"
  },

  [`& .${classes.avatarContainer}`]: {
    display: "flex",
    flexDirection: "column",
  },

  [`& .${classes.largeAvatar}`]: {
    width: leftDrawerWidth - 150,
    height: leftDrawerWidth - 150,
    alignSelf: "center",
  },

  [`& .${classes.authorName}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.authorName,
    fontWeight: theme.typography.fontWeightRegular,
    alignSelf: "center",
  },

  [`& .${classes.authorDes}`]: {
    ...theme.typography.caption,
    color: theme.authorDescription,
    fontWeight: theme.typography.fontWeightMedium,
    padding: theme.spacing(),
    borderLeft: `2px solid ${theme.palette.primary.main}`
  }
}));

const leftDrawerWidth = 240;

function LeftSidebar(props) {
  const { window } = props;

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
              <IconButton color="primary" aria-label="author-email" size="large">
                <MailOutline />
              </IconButton>
            </SimpleLink>
          </Tooltip>
        </div>
      </div>
    </div>
  );

  

  return (
    <Root className={classes.drawer} aria-label="blog details">
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
      <Hidden mdDown implementation="css">
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
    </Root>
  );
}

export default LeftSidebar;
