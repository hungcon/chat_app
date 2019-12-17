import React , { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar,
  Button,
  Badge,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/MenuOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import HomeIcon from '@material-ui/icons/HomeOutlined';
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
  name: {
    width: '65%',
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
  const [invisible, setInvisible] = useState(false);
  const [menuState, setMenuState] = useState({anchorEl: null});
  const [notiState, setNotiState] = useState({anchorEl: null});
  const [status, setStatus] = useState(false);

  const openMenu = (event) => {
    setMenuState({anchorEl: event.currentTarget});
  };

  const closeMenu = () => {
    setMenuState({anchorEl: null});
  };

  const openNoti = (event) => {
    setInvisible(true);
    setNotiState({anchorEl: event.currentTarget});
  };

  const closeNoti = () => {
    setNotiState({anchorEl: null});
  };

  const signOut = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('idUserInfor');
    props.history.push('/');
  }

  async function fetchData() {
    var data = {
      idRequester: localStorage.getItem('idUserInfor')
    }
    axios.post('http://localhost:4000/get_all_friend_request', data)
    .then(result => {
      setListRequest(result.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const showAllFriendRequest = () => {
    if (listRequest.length === 0) {
      return (
        <MenuItem>Have no request</MenuItem>
      );
    } else {
      return (
      listRequest.map(request => (
          <MenuItem key={request._id}>
            <ListItemIcon>
              <Avatar alt="Hung Con" src="./images/per-avatar.jpg" />
            </ListItemIcon>
            <Typography className={classes.name}>{request.recipient.firstName + " " + request.recipient.lastName}</Typography>
            {
              request.status === 0 ?
                <Button size="small" color="secondary" variant="outlined" onClick={cancleRequest} value={request.recipient._id}>
                  Cancle
                </Button>
              :
                <div>
                  <Button size="small" color="primary" variant="outlined" style={{marginLeft: '10px', marginRight: '10px'}} onClick={acceptFriend} value={request.recipient._id}>
                    Accept
                  </Button>
                  <Button size="small" color="secondary" variant="outlined" onClick={cancleRequest} value={request.recipient._id}>
                    Delete
                  </Button>
                </div>
            }
        </MenuItem>
        ))
      )
    } 
  }

  const cancleRequest = (e) => {
    var data = {
      idCancle: e.currentTarget.value,
      userId: localStorage.getItem('idUserInfor')
    };
    axios.post('http://localhost:4000/cancle_request', data)
    .then(reuslt => {
      setStatus(true);
    })
    .catch(err => {
      console.log(err);
    })
  };

  const acceptFriend = (e) => {
    var data = {
      userId: localStorage.getItem('idUserInfor'),
      friendId: e.currentTarget.value
    };
    axios.post('http://localhost:4000/accept_friend', data)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
  };

  useEffect(() => {
    fetchData();
  }, [status]);

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
              <Badge badgeContent={listRequest.length} color="secondary" invisible={listRequest.length === 0 ? true : invisible}>
                <PeopleOutlineIcon />
              </Badge>
            </IconButton>
            <Menu anchorEl={notiState.anchorEl} open={Boolean(notiState.anchorEl)} onClose={closeNoti}>
              {showAllFriendRequest()}
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