import React , { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Header from './Header';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  typo: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
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


export default function Home(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [listFriend, setListFriend] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const getSearchValue = () => {
    if(searchValue === ""){
      setSearching(false);
    } else {
      let data = {
        searchValue: searchValue,
        userName: localStorage.getItem('userName')
      }
      axios.post('http://localhost:4000/find_friend', data)
      .then(result => {
        setSearchResult(result.data);
        setSearching(true);
      })
      .catch(err => {
        console.log(err);
      })
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function fetchData() {
    var data = {
      userId: localStorage.getItem('idUserInfor')
    }
    axios.post('http://localhost:4000/get_all_friend', data)
    .then(result => {
      setListFriend(result.data);
    })
    .catch(err => {
      console.log(err);
    })
  };

  const requestFriend = () => {
    var data = {
      requesterId: '5dee0f7b5ddb4c224ca3b593',
      recipientId: '5df1a5c0f1dce91bb8ca0309'
    }
    axios.post('http://localhost:4000/request_friend', data )
    .then(result => {
      console.log(result);
      setOpen(true);
    })
    .catch( err => {
      console.log(err)
    })
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header history={props.history} ></Header>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom className={classes.text} >
             Welcome to chat app
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph className={classes.text}>         
                Your friends list is shown below. You can search more another friend by searching by name in search box.
            </Typography>
            <TextField
              label="Search Friend"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={getSearchValue}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Container>
        </div>
        {!searching &&
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {listFriend.map(friend => (
              <Grid item key={friend._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title={friend.lastName}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {friend.firstName + " " + friend.lastName}
                    </Typography>
                  </CardContent>
                  <CardActions >
                    <Button size="small" color="primary" variant="contained" onClick = {() => props.history.push('message-history')}>
                      Send Message
                    </Button>
                    <Button size="small" color="secondary" variant="contained">
                      Unfriend
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        }
        {searching &&
        <Container className={classes.cardGrid} maxWidth="md">
          {searchResult.length === 0 ? 
          <Typography component="h3" variant="h4" align="center" color="red" gutterBottom className={classes.text} >
            Not found
          </Typography>
          :
          <Grid container spacing={4}>
            {searchResult.map(friend => (
              <Grid item key={friend._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title={friend.lastName}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {friend.firstName + " " + friend.lastName}
                    </Typography>
                  </CardContent>
                  <CardActions >
                    <Button size="small" color="primary" variant="contained" onClick = {() => props.history.push('message-history')}>
                      Add Friend
                    </Button>
                    <Button size="small" color="secondary" variant="contained">
                      Unfriend
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          }
        </Container>
        }
      </main>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText id="context">
            Your friend request have been sent
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{margin: 'auto'}}>
          <Button onClick={handleClose} color="primary" variant="outlined">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}