import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';

import Spinner from './UI/Spinner/Spinner';
import * as actions from '../store/actions';
import logo from '../assets/logo.png';
import authBackground from '../assets/background.jpg';

const useStyles = makeStyles((theme) =>({
    root: {
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `url(${authBackground})`,
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.up("md")]: {
            backgroundAttachment: 'fixed',
            backgroundSize: '100% 100%'
        }
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '600px',
        margin: '0 auto',
        marginTop: 1.5,
        [theme.breakpoints.down("md")]: {
            width: '320px'
        }
    },
    logo: {
        height: '4em',
        margin: '-2.5rem'
	},
    content: {
        width: '60%',
        margin: 'auto',
        padding: '4em 0 !important',
        [theme.breakpoints.down("md")]: {
            width: '90%',
            padding: '0em !important'
        }
    },
    loginHeader: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff'
    },
    loginButton: {
        ...theme.typography.button1,
        fontSize: '0.7rem',
        width: '100%',
        height: 35,
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary,
        [theme.breakpoints.down("sm")]: {
            marginBottom: '2em'
        }
    },
    contact: {
        marginTop: '2em',
        [theme.breakpoints.down("md")]: {
            marginTop: '0.4em'
        }
    }
  }));

const Auth = (props) => {
    const classes = useStyles();

    const [formState, setFormState] = useState({ 'email': '', 'password': ''});

    const controls = {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }

    const checkValidaty = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.minLength && isValid;
        }

        return isValid;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (checkValidaty(formState.email, controls.email.validation) && checkValidaty(formState.password, controls.password.validation)) {
            props.onAuth(formState.email, formState.password);
        }
    }

    const formElementsArray = [];

    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    const updateInputValue = (type, value) => {
        setFormState({ ...formState, [type]: value })
    }

    let checkingForm = null;
    if (props.loading) {
        checkingForm = <Spinner />
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p style={{color: '#7d0633'}}>{props.error}</p>
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to='/dashboard' />
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                        className={classes.loginHeader}
                        title={<img alt="company logo" className={classes.logo} src={logo} />}>
                </CardHeader>
                <CardContent className={classes.content}>
                    {authRedirect}
                    <Grid container direction="column" align="center">
                        <Grid item style={{ marginTop: '2em', marginBottom: errorMessage ? '0em' : '2em' }}>
                            <Typography variant="subtitle2" align="center" style={{ textTransform: 'uppercase' }}>Sign In Now To Continue.</Typography>
                        </Grid>

                        <Grid item>
                            {errorMessage}
                        </Grid>

                        <Grid item>
                            <TextField 
                                variant="outlined"
                                placeholder="Enter email"
                                style={{ width: '100%' }}
                                size="small"
                                value={formState.email}
                                onChange={(event) => updateInputValue('email', event.target.value)}
                                InputProps={{ 
                                    endAdornment: 
                                    <InputAdornment position="end">
                                        <AlternateEmailIcon color="white" style={{ fontSize: 30 }} />
                                    </InputAdornment>
                                }} 
                            />
                        </Grid>

                        <Grid item>
                            <TextField 
                                variant="outlined"
                                placeholder="Password"
                                type="password"
                                style={{ width: '100%' }}
                                size="small"
                                value={formState.password}
                                onChange={(event) => updateInputValue('password', event.target.value)}
                                InputProps={{ 
                                    endAdornment: 
                                    <InputAdornment position="end">
                                        <LockIcon color="white" style={{ fontSize: 30 }} />
                                    </InputAdornment>
                                }} 
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" className={classes.loginButton} onClick={submitHandler}>
                                <span>LOGIN</span>
                            </Button>
                        </Grid>
                    
                        <Grid item className={classes.contact}>
                            <p>If you have not an account, please contact the administrator.</p>
                        </Grid>

                        
                        <br />
                        {checkingForm}
                    </Grid>
                </CardContent>
            </Card>
        </div>
        
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);