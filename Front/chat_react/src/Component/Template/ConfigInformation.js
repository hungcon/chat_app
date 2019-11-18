import React, {useState, useRef} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
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
        marginTop: theme.spacing(5),
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
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const fileInput = useRef(null);
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const onSubmit = values => {
        setEmail(values.email);
        setPhoneNumber(values.phoneNumber);
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
        // var userInfor = new FormData();
        // userInfor.append('email', email);
        // userInfor.append('phoneNumber', phoneNumber);
        // userInfor.append('avatar', avatarFile);

        var userInfor = {
            email: email,
            phoneNumber: phoneNumber,
            avatar: avatarFile
        };
        axios.post('http://localhost:4000/create_user_information', userInfor, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(result => {
         console.log(result.data)
        
        })
        .catch(err => {
            console.log(err)
        })
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
                        <TextField
                            className={classes.input}
                            required
                            name="email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!(errors && errors.email)}
                            helperText={(errors && errors.email) ? errors.email.message : ''}
                            id="email"
                            label="Email Address"
                            autoFocus
                            inputRef={register({
                            required: 'Required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address"
                                }
                            })}
                        />
                        <TextField
                            className={classes.input}
                            name="phoneNumber"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="phoneNumber"
                            label="Phone Number"
                            inputRef={register({
                                
                            })}
                        />
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