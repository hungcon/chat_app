import React, {useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import useForm from "react-hook-form";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    img: {
        maxWidth: '100%',
        height: 'auto',
    },
    container: {
        marginTop: theme.spacing(8),
    },
    next:{
        borderRadius: '5em',
       float: 'right'
    },
    back: {
        borderRadius: '5em',
        float: 'left'
    },
    input: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    upload: {
        display: 'none',
    }
  }),
);

function getSteps() {
  return ['Enter your email', 'Choose your avatar', 'Welcome'];
}


 
export default function ConfigInformation(props) {
    
    const classes = useStyles();
    const { handleSubmit, register, errors } = useForm();
    const [email, setEmail] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const onSubmit = values => {
        setEmail(values.email);
        handleNext();
      };
    
   

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      };
    
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    
    

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <img src="./images/avatar.png" className={classes.img} alt=''/>
                        <div className={classes.input}>
                            <input
                                accept="image/*"
                                className={classes.upload}
                                id="contained-button-file"
                                multiple
                                type="file"
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
                </Container>
            </React.Fragment>
        </div>
    );
}