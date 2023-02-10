import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import {
    motion
} from 'framer-motion';

import AnimatedText from '../components/AnimatedText'
import { Link, NavLink, useLocation } from 'react-router-dom';

import {
  SITENAME
} from '../config'

const pages = [
  ['Home', "/", false],
  ['Blog', "/blog", false],
  ['Thesis (coming soon)', "/thesis", true]
];


function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const location = useLocation();

  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const container = {
    visible: {
      transition: {
        staggerChildren: 0.04
      }
    }
  }

  return (
    <AppBar elevation={0} position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ position: 'relative', top: -5, display: { xs: 'inline-block', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navbar button"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  disabled={page[2]}
                  key={`nav-${page[1]}`}
                  component={Link}
                  to={page[1]}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <motion.div
            key="header-logo"
            style={{
                flexGrow: 1
            }}
            className="App"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <div className="container">
              <AnimatedText type="heading1" text={SITENAME} />
            </div>
          </motion.div>


          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              const currPath = location.pathname === page[1]
              return <Button
                disabled={page[2]}
                key={`nav-${page[1]}`}
                component={Link}
                to={page[1]}
                sx={(theme) => { return {my: 2, fontWeight: currPath ? "bold" : "normal", color: currPath ? 'text.primary' : 'text.secondary'} }}
              >
                {page[0]}
              </Button>
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;