import { Google } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch } from 'react-redux';
import { checkingAuthentication } from '../../store/auth/thunks';

export const LoginPage = () => {
    const {email, password, onInputChange} = useForm({
      email: 'isamed92@google.com',
      password: '12345'
    })

    const dispatch = useDispatch()

    const onSubmit = (event) => {
      event.preventDefault()

      // console.log({email, password});

      dispatch(checkingAuthentication())

    }

    const onGoogleSignIn = () => {
      console.log('on google sign in');

      dispatch(checkingAuthentication())


    }


  return (
    <AuthLayout title='Login'>
      <form autoComplete='off' onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label='correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name={email}
              value={email}
              onChange={onInputChange}
              />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label='contraseña'
              type='password'
              placeholder='contraseña'
              fullWidth
              name={password}
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button variant='contained' fullWidth type='submit'>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant='contained' fullWidth onClick={onGoogleSignIn}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
