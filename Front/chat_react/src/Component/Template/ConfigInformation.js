import React, {useState, useRef} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';
import useForm from "react-hook-form";
import axios from "axios";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    form: {
        position: 'relative',
    },
    img: {
        width: '100%',
        height: '300px',
    },
    container: {
        marginTop: theme.spacing(3),
    },
    next:{
        borderRadius: '5em',
       float: 'right',
       marginTop: theme.spacing(1),
    },
    back: {
        borderRadius: '5em',
        float: 'left',
        marginTop: theme.spacing(1),
    },
    input: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    upload: {
        display: 'none',
    },
  }),
);

function getSteps() {
  return ['Enter your email', 'Choose your avatar', 'Welcome to Fakebook'];
}


 
export default function ConfigInformation(props) {
    
    const classes = useStyles();
    const { handleSubmit, register, errors } = useForm();
    const [userInfor , setUserInfor] = useState({firstName:'', lastName: '', phoneNumber: '', email: ''})
    const [avatarFile, setAvatarFile] = useState(null);
    const fileInput = useRef(null);
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const onSubmit = values => {
        setUserInfor(values);
        handleNext();
      };
    
    const getAvatarFile = (event) => {
        event.preventDefault();
        setAvatarFile(fileInput.current.files[0]);
        handleNext();
    }

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      };
    
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const finish = () => {
        userInfor.userName = localStorage.getItem('userName');
        
        axios.post('http://localhost:4000/create_user_information',userInfor)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err)
        });
    }
    
    

    return (
        <div className={classes.root}>
           <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <React.Fragment >
                <CssBaseline />
                <Container maxWidth="sm" className={classes.container}>
                    {activeStep === 0 &&
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <img src="./images/email.jpg" className={classes.img} alt=''/>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoFocus
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        
                                        fullWidth
                                        error={!!(errors && errors.firstName)}
                                        helperText={(errors && errors.firstName) ? errors.firstName.message : ''}
                                        id="firstName"
                                        label="First Name"
                                        inputRef={register({
                                        required: 'Required',
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        
                                        fullWidth
                                        error={!!(errors && errors.lastName)}
                                        helperText={(errors && errors.lastName) ? errors.lastName.message : ''}
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        inputRef={register({
                                        required: 'Required',
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        
                                        name="email"
                                        variant="outlined"
                                        fullWidth
                                        error={!!(errors && errors.email)}
                                        helperText={(errors && errors.email) ? errors.email.message : ''}
                                        id="email"
                                        label="Email Address"
                                        inputRef={register({
                                        required: 'Required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Invalid email address"
                                            }
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                    className={classes.input}
                                    name="phoneNumber"
                                    variant="outlined"
                                    error={!!(errors && errors.phoneNumber)}
                                    helperText={(errors && errors.phoneNumber) ? errors.phoneNumber.message : ''}
                                    fullWidth
                                    id="phoneNumber"
                                    label="Phone Number"
                                    inputRef={register({
                                        required: 'Required',
                                    })}
                                    />
                                </Grid>
                            </Grid>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.back}>
                                Back
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.next}
                            >
                                Next
                            </Button>
                        </form>
                    }
                    {activeStep === 1 &&
                    <form onSubmit={getAvatarFile} className={classes.form}>
                        <img src="./images/avatar.png" className={classes.img} alt=''/>
                        <div className={classes.input}>
                            <input
                                accept="image/*"
                                className={classes.upload}
                                id="contained-button-file"
                                multiple
                                type="file"
                                name="avatarPath"
                                ref={fileInput}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span" color="secondary">
                                Choose your avatar
                                </Button>
                            </label>
                        </div>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.back}>
                            Back
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.next}
                        >
                            Next
                        </Button>
                    </form>
                    }
                    {activeStep === 2 &&
                        <div>
                            <img src="./images/success.png" alt="" className={classes.img}/>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.back}>
                                Back
                            </Button>
                            <Button
                                onClick={finish}
                                variant="contained"
                                color="primary"
                                className={classes.next}
                            >
                                Next
                            </Button>
                        </div>
                    }
                </Container>
            </React.Fragment>
        </div>
    );
}