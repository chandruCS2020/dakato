import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@mui/material/Tooltip';
const isActive = (history, path) => {
if (history.location.pathname === path) {
    return { color: '#3f51b5', textDecoration: 'none' };
} else {
    return { color: '#ffffff', textDecoration: 'none' };
}
};

const useStyles = makeStyles((theme) => ({
grow: {
    flexGrow: 1,
},
menuButton: {
    marginRight: theme.spacing(-1),
    color:'#4f91db',
    fontSize:'4rem',
    
},
title: {
    [theme.breakpoints.up('sm')]: {
    display: 'block',
    color:'#fff',
    fontSize:'2rem',
    fontWieght:'700',
    letterSpacing:'0px',
    
    },
    color:'#fff',
    padding:'0 10px'
    
},
search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
    backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    },
},
searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
},
inputRoot: {
    color: 'inherit',
},
inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
    width: '20ch',
    },
},
sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
    display: 'flex',
    },
},
sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
    display: 'none',
    },
    color:'#fff',
},
}));

const MaterialAppBar = ({ history }) => {
const classes = useStyles();
const [anchorEl, setAnchorEl] = React.useState(null);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

const isMenuOpen = Boolean(anchorEl);
const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
};

const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
};

const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
};

const menuId = 'primary-search-account-menu';
const renderMenu = (
    <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={menuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMenuOpen}
    onClose={handleMenuClose}
    >
    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
);

const mobileMenuId = 'primary-search-account-menu-mobile';
const renderMobileMenu = (
    <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
    >
    <div style={{ backgroundColor: '#404040' }}>
        {!isAuthenticated() && (
        <Fragment>
            <MenuItem>
            <Link style={isActive(history, '/signin')} to='/signin'>
                <IconButton aria-label='Signin' color='inherit'>
                <AccountCircleIcon />
                </IconButton>
                Signin
            </Link>
            </MenuItem>

            <MenuItem>
            <Link style={isActive(history, '/signup')} to='/signup'>
                <IconButton aria-label='Signup' color='inherit'>
                <PersonAddIcon />
                </IconButton>
                Signup
            </Link>
            </MenuItem>
        </Fragment>
        )}

        {isAuthenticated() && (
        <MenuItem>
            <span
            style={{ cursor: 'pointer', color: '#ffffff' }}
            onClick={() =>
                signout(() => {
                history.push('/');
                })
            }
            >
            <IconButton aria-label='Signout' color='inherit'>
                <ExitToAppIcon />
            </IconButton>
            Signout
            </span>
        </MenuItem>
        )}
    </div>
    </Menu>
);
const [scroll, setscroll] = useState(false)
useEffect(() => {
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            setscroll(true)
        } else {
            setscroll(false)
        }
    }
}, [])
return (
    <div className={classes.grow}>
    <AppBar position='fixed' className={`headers ${scroll ? "active":"not"}`}>
        <Toolbar>
        <a href='/' style={{ color: '#ffffff', textDecoration: 'none' }}>
            <Typography className={classes.title} variant='h6' noWrap >
            Dakato
            </Typography>
        </a>

        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>

            {!isAuthenticated() && (
            <Fragment>
                <Link style={isActive(history, '/signin')} to='/signin' className='Navli'>
                <Tooltip title="Signin"> 
                    <IconButton aria-label='Signin' color='inherit'>
                        <AccountCircleIcon />
                        <Typography noWrap>Signin</Typography>
                    </IconButton>
                </Tooltip>
                </Link>

                <Link style={isActive(history, '/signup')} to='/signup' className='Navli'>
                <Tooltip title="Signup">
                    <IconButton aria-label='Signup' color='inherit'>
                        <PersonAddIcon />
                        <Typography noWrap>Signup</Typography>
                    </IconButton>
                </Tooltip>
                </Link>
            </Fragment>
            )}

            {isAuthenticated() && (
            <span
                style={{ cursor: 'pointer', color: '#ffffff' }}
                onClick={() =>
                signout(() => {
                    history.push('/');
                })
                }
                className='Navli'
            >
                <Tooltip title="Signout">
                    <IconButton aria-label='Signout' color='inherit'>
                    <ExitToAppIcon />
                    <Typography noWrap>Signout</Typography>
                    </IconButton>
                </Tooltip>
            </span>
            )}
        </div>
        <div className={classes.sectionMobile}>
            <IconButton
            aria-label='show more'
            aria-controls={mobileMenuId}
            aria-haspopup='true'
            onClick={handleMobileMenuOpen}
            color='inherit'
            >
            <MoreIcon />
            </IconButton>
        </div>
        </Toolbar>
    </AppBar>
    {renderMobileMenu}
    {renderMenu}
    </div>
);
};

export default withRouter(MaterialAppBar);
