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
import LinearProgress from '@mui/material/LinearProgress';
import Copyright from '../core/Copyright';

import Layout from '../core/Layout';
import { Emails, signup } from '../auth';
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

export default function Signup() {
const [values, setValues] = useState({
    email: '',
    error: '',
    loading:'',
    success: false,
});
const history=useHistory();
const { email, success, error,loading } = values;

const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
};

const clickSubmit = (event) => {
    event.preventDefault(); // so that browser does not reload
    setValues({ ...values, error: false,loading:true });
    const form = new FormData();
    form.append("email",email);
    const data1 = {
        email : form.get("email")
    };
    fetch(`https://api-dakato.herokuapp.com/email-verification`, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
        }).then((data) => {
            console.log(data)
    if (data.status!==200) {
        setValues({ ...values, error: data, success: false,loading:false });
    } else {
        setValues({
        ...values,
        email: '',
        error: '',
        success: true,
        loading:false
        });
    }
    }); // sending js object
    
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
    Verification link has sent to the mail.
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
        Sign up
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
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                onChange={handleChange('email')}
                type='email'
                value={email}
                autoComplete='off'
            />
            </Grid>
        </Grid>
        <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={clickSubmit}
            disabled={loading}
        >
            Verify
        </Button>
        <Grid container justify='flex-end'>
            <Grid item>
            <Link to='/signin' variant='body2'>
                Already have an account? Sign in
            </Link>
            </Grid>
        </Grid>
        </form>
    </div>
    </Container>
);

return (
    <Layout
    >
    {signUpForm()}
    <Copyright />
    </Layout>
);
}
