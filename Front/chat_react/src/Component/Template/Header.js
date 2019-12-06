import React , { useState } from 'react';
import { AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Notifications from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer +1,
  },
  typo: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(2),
  },
  text: {
    fontFamily: 'Courgette, cursive'
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));


export default function Header(props) {
  const classes = useStyles();
  const [menuState, setMenuState] = useState({anchorEl: null});
  const [notiState, setNotiState] = useState({anchorEl: null});

  const openMenu = (event) => {
    setMenuState({anchorEl: event.currentTarget});
  };

  const closeMenu = () => {
    setMenuState({anchorEl: null});
  };

  const openNoti = (event) => {
    setNotiState({anchorEl: event.currentTarget});
  };

  const closeNoti = () => {
    setNotiState({anchorEl: null});
  };

  const signOut = () => {
    localStorage.removeItem('userName');
    props.history.push('/');
  }

  return (
      <AppBar position="relative" className = {classes.appBar}>
        <Toolbar>
          <Typography className={classes.typo}></Typography>
          <React.Fragment>
            <Avatar alt="Hung Con" src="./images/per-avatar.jpg" />
          </React.Fragment>
          <React.Fragment>
            < IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={openNoti}>
              <Notifications />
            </IconButton>
            <Menu anchorEl={notiState.anchorEl} open={Boolean(notiState.anchorEl)} onClose={closeNoti}>
              <MenuItem>
                <ListItemIcon>
                  <Avatar alt="Hung Con" src="./images/per-avatar.jpg" />
                </ListItemIcon>
                <Typography variant="inherit">Friend Request</Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Avatar alt="Hung Con" src="./images/per-avatar.jpg" />
                </ListItemIcon>
                <Typography variant="inherit">A very long text that overflows</Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Avatar alt="Hung Con" src="./images/per-avatar.jpg" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  A very long text that overflows
                </Typography>
              </MenuItem>
            </Menu>
            < IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={openMenu}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={menuState.anchorEl} open={Boolean(menuState.anchorEl)} onClose={closeMenu}>
                <MenuItem  >Profiles</MenuItem>
                <MenuItem  onClick={signOut}>Sign out</MenuItem>
            </Menu>  
            
          </React.Fragment>
        </Toolbar>
      </AppBar>
    );
  }