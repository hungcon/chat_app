import React , { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/MenuOutlined';
import Button from '@material-ui/core/Button';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import Badge from '@material-ui/core/Badge';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer +1,
    background: 'linear-gradient(to right, #e65c00, #f9d423)',
  },
  title: {
    fontFamily: 'Bungee Shade, cursive',
    fontSize: '20px',
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
  const [listRequest, setListRequest] = useState([]);
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

  useEffect(() => {
    axios.post('http://localhost:4000/get_all_friend_request')
    .then(result => {
      setListRequest(result.data);
      console.log(listRequest);
      console.log(result.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
      <AppBar position="relative" className = {classes.appBar}>
        <Toolbar>
          < IconButton edge="start"  color="inherit" aria-label="menu" onClick={() => props.history.push('/home')}>
            <HomeIcon />
          </IconButton>
          <Typography className={classes.title}>CHAT APP</Typography>
          <Typography className={classes.typo}></Typography>
          {/* Avatar */}
          <React.Fragment>
            <Avatar alt="Hung Con" src="./images/per-avatar.jpg" />
          </React.Fragment>
          {/* End Avatar */}
         
          <React.Fragment>
             {/* Friend Request */}
            < IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={openNoti}>
              <Badge badgeContent={listRequest.length} color="secondary">
                <PeopleOutlineIcon />
              </Badge>
            </IconButton>
            <Menu anchorEl={notiState.anchorEl} open={Boolean(notiState.anchorEl)} onClose={closeNoti}>
              {listRequest.map(request => (
                <MenuItem key={request._id}>
                  <ListItemIcon>
                    <Avatar alt="Hung Con" src="./images/per-avatar.jpg" />
                  </ListItemIcon>
                  <Typography>{request.recipient.firstName + request.recipient.lastName}</Typography>
                  <Button size="small" color="primary" variant="contained" style={{marginRight: '10px'}}>
                    Accept
                  </Button>
                  <Button size="small" color="secondary" variant="contained">
                    Delete
                  </Button>
                </MenuItem>
              ))}
            </Menu>
             {/* End Friend Request */}
            < IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={() => props.history.push('/message-history')}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            {/* Function */}
            < IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={openMenu}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={menuState.anchorEl} open={Boolean(menuState.anchorEl)} onClose={closeMenu}>
                <MenuItem  onClick={() => props.history.push('/personal-information')}>Profiles</MenuItem>
                <MenuItem  onClick={signOut}>Sign out</MenuItem>
            </Menu>  
            {/*End  Function */}
            
          </React.Fragment>
        </Toolbar>
      </AppBar>
    );
  }