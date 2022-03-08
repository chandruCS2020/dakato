import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Copyright from '../core/Copyright';
import LinearProgress from '@mui/material/LinearProgress';
import Layout from '../core/Layout';
import { signup } from '../auth';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
},
avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
},
form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
},
submit: {
    margin: theme.spacing(3, 0, 2),
},
}));

export default function Info(props) {
const [values, setValues] = useState({
    email: '',
    error: '',
    loading:'',
    success: false,
});
const history = useHistory();
const { email, success, error ,loading} = values;
console.log(props.handleNext)
const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
};

const clickSubmit = (event) => {
    event.preventDefault(); // so that browser does not reload
    setValues({ ...values, error: false ,loading:true});
    const data1 = {
        "email":email
    }
    fetch(`https://api-dakato.herokuapp.com/getImageLink`, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
        }).then((data) => {
    if (data.status!==200) {
        setValues({ ...values, error: "user not exist", loading:false,success: false });
    } else {
        setValues({
        ...values,
        email: '',
        error: '',
        loading:false,
        success: true,
        });
        history.push('/signinmap')
    }
    });
};

const showError = () => (
    <div
    className='alert alert-danger'
    style={{ display: error ? '' : 'none' }}
    >
    {error}
    </div>
);

const showSuccess = () => (
    <div
    className='alert alert-info'
    style={{ display: success ? '' : 'none' }}
    >
        Continue to enter password
    </div>
);

const classes = useStyles();

const signUpForm = () => (
    <Container component='main' maxWidth='xs' className='head'>
    {showSuccess()}
    {showError()}
    <CssBaseline />
    <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
        Sign In
        </Typography>
        {loading && <>
            <Box sx={{ width: '100%',margin:'50px 0 20px 0' }}>
                <LinearProgress />
            </Box>
        </>}
        <form className={classes.form} noValidate>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                autoComplete='off'
                onChange={handleChange('email')}
                type='email'
                name='email'
                value={email}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email'
                autoFocus
            />
            </Grid>
            {/* <Grid item xs={12}>
            <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                onChange={handleChange('password')}
                value={password}
                autoComplete='current-password'
            />
            </Grid> */}
        </Grid>
        <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={clickSubmit}
        >
            Continue
        </Button>
        </form>
    </div>
    </Container>
);

return (
    <Layout
    title='Signup page'
    description='Signup to MERN E-commerce App'
    className='container col-md-8 offset-md-2'
    >
    {signUpForm()}
    <Copyright />
    </Layout>
);
}
