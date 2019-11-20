import React from 'react'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    title: {
        color: 'blue'
    }
}));

export default function MessageHistory() {
    const classes = useStyles();

    return (
        <h1 className={classes.title}>Message History Component</h1>
    );
}