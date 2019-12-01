import React , { useState } from 'react';
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
import Header from './Header';


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

const cards = [1, 2, 3];

export default function Home() {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  }

  const getSearchValue = () => {
    console.log(searchValue)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header></Header>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom className={classes.text} >
             Welcome to chat app
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph className={classes.text}>         
                Your friends list is shown below. You can search more another friend by searching by email in search box.
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
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Friend Name
                    </Typography>
                  </CardContent>
                  <CardActions >
                    <Button size="small" color="primary" variant="contained">
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
      </main>
    </React.Fragment>
  );
}