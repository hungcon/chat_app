import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CallIcon from '@material-ui/icons/Call';
import FaceIcon from '@material-ui/icons/Face';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Typography, Button, TextField } from '@material-ui/core';
import axios from 'axios';
import useForm from "react-hook-form";

const useStyles = makeStyles(theme => ({
   img: {
        borderRadius: '50%',
        marginTop: theme.spacing(3),
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
        margin: theme.spacing(1),
   },
   btn: {
       margin: theme.spacing(3),
   }
}));

export default function PersonalInformation(props) {
    const classes = useStyles();
    const [userInfor, setUserInfor] = useState({phoneNumber: '', firstName: '', lastName: '', email: ''});
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = values => {
        values.userName = localStorage.getItem('userName');
        axios.post('http://localhost:4000/update_user_information', values)
        .then(result =>{
            console.log(result);
        })
        .catch(err => {
            console.log(err)
        })
    };

    const handleChange = name => event => {
        setUserInfor({ ...userInfor, [name]: event.target.value });
      };
    
    useEffect(() => {
        var data = {
            userInforId: localStorage.getItem('idUserInfor')
        }
        axios.post('http://localhost:4000/get_user_infor', data)
        .then(result => {
            setUserInfor(result.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return (
       <React.Fragment>
           <Header history={props.history}></Header>
           <Container>
           <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <img className={classes.img} alt="complex" src="./images/per-avatar.jpg" />
                </Grid>
                <Grid item xs={6} className={classes.information}>
                    <Grid container spacing={2} >
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
                            name="phoneNumber"
                            error={!!(errors && errors.phoneNumber)}
                            helperText={(errors && errors.phoneNumber) ? errors.phoneNumber.message : ''}
                            value={userInfor.phoneNumber}
                            // value='a'
                            inputRef={register({
                                required: 'Required',
                            })}
                            variant="outlined"
                            className={classes.input}
                            onChange={handleChange("phoneNumber")}
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <FaceIcon className={classes.red}/>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.font}>First name: </Typography>
                        </Grid>
                    </Grid>
                    <Grid>
                    <TextField
                        name="firstName"
                        id="firstName"
                        error={!!(errors && errors.firstName)}
                        helperText={(errors && errors.firstName) ? errors.firstName.message : ''}
                        value={userInfor.firstName}
                        inputRef={register({
                            required: 'Required',
                        })}
                        variant="outlined"
                        className={classes.input}
                        onChange={handleChange("firstName")}
                    />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <FaceIcon className={classes.red}/>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.font}>Last name: </Typography>
                        </Grid>
                    </Grid>
                    <Grid>
                     <TextField
                        id="lastName"
                        name="lastName"
                        error={!!(errors && errors.lastName)}
                        helperText={(errors && errors.lastName) ? errors.lastName.message : ''}
                        value={userInfor.lastName}
                        inputRef={register({
                            required: 'Required',
                        })}
                        variant="outlined"
                        className={classes.input}
                        onChange={handleChange("lastName")}
                    />
                    </Grid>
                    <Grid container spacing={2} >
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
                        name="email"
                        error={!!(errors && errors.email)}
                        helperText={(errors && errors.email) ? errors.email.message : ''}
                        className={classes.input}
                        value={userInfor.email}
                        inputRef={register({
                            required: 'Required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address"
                                }
                        })}
                        variant="outlined"
                        onChange={handleChange("email")}
                    />
                    </Grid>
                    <Button variant="outlined" color="primary" className={classes.btn} type="submit">
                        Update
                    </Button>
                </Grid>
            </Grid>
            </form>
           </Container>
       </React.Fragment>
    );
}