import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CallIcon from '@material-ui/icons/Call';
import FaceIcon from '@material-ui/icons/Face';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Typography, Button, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
   img: {
       margin: 'auto',
    maxWidth: '100%',
    height: 'auto'
   },
   red: {
       color: 'red'
   },
   font: {
       fontFamily: '"Marcellus", serif',
       fontWeight: 'bold'
   }, 
   information: {
       marginTop: theme.spacing(3),
       margin: 'auto'
   },
   input: {
        margin: theme.spacing(2),
   },
   btn: {
       margin: theme.spacing(3),
   }
}));

export default function PersonalInformation(props) {
    const classes = useStyles();
    return (
       <React.Fragment>
           <Header history={props.history}></Header>
           <Container>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <img className={classes.img} alt="complex" src="./images/per-avatar.jpg" />
                </Grid>
                <Grid item xs={6} className={classes.information}>
                    <Grid container spacing={3} >
                        <Grid item>
                            <CallIcon className={classes.red}/>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.font}>Phone number: </Typography>
                        </Grid>
                    </Grid>
                    <Grid>
                        <TextField
                            id="phoneNumber"
                            defaultValue="0962584892"
                            InputProps={{
                            
                            }}
                            variant="outlined"
                            className={classes.input}
                        />
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item>
                            <FaceIcon className={classes.red}/>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.font}>Full name: </Typography>
                        </Grid>
                    </Grid>
                    <Grid>
                    <TextField
                        id="fullName"
                        defaultValue="Hưng Phùng"
                        InputProps={{
                           
                        }}
                        variant="outlined"
                        className={classes.input}
                    />
                    </Grid>
                    <Grid container spacing={3} >
                        <Grid item>
                            <MailOutlineIcon className={classes.red}/>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.font}>Email: </Typography>
                        </Grid>
                    </Grid>
                    <Grid>
                    <TextField
                        id="email"
                        className={classes.input}
                        defaultValue="hungcon.507@gmail.com"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                    </Grid>
                    <Button variant="outlined" color="primary" className={classes.btn}>
                        Update
                    </Button>
                </Grid>
            </Grid>
           </Container>
       </React.Fragment>
    );
}