import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { NavLink } from 'react-router-dom';

export default function Copyright() {
return (
    <Box mt={8} mb={4}>
    <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <NavLink to='/' className={'names'}>Dakato</NavLink>{'  '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
    </Box>
);
}
