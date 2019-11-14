import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
    button : {
        marginRight: theme.spacing(2),
    },
  }),
);

function Home() {
    const classes = useStyles();
    return (
        <h1 className={classes.link}>Home</h1>
    );
}

export default Home;