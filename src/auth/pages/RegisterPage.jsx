import React, { useMemo, useState } from 'react'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks'
import { startCreatingUserWithEmailPassword } from '../../store/auth'
import { AuthLayout } from '../layout/AuthLayout'


const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email:        [(value) => value.includes('@'),  'El correo debe de tener una @'],
  password:     [(value) => value.length >= 6,    'La contraseña debe de tener mas de 6 caracteres'],
  displayName:  [(value) => value.length >= 1,    'El nombre es obligatorio'],

}

export const RegisterPage = () => {
  const dispatch = useDispatch()
  const {status, errorMessage} = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo(() => status==='checking', [status])


  
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {displayName, email, password, onInputChange, formState, isFormValid, displayNameValid, emailValid, passwordValid} = useForm(formData, formValidations)


  const onSubmit = (evento) => {
    evento.preventDefault()
    console.log(formState);

    if(!isFormValid) return;

    setFormSubmitted(true)

    dispatch(startCreatingUserWithEmailPassword(formState))
  }
  
  return (
    <AuthLayout title='Crear Cuenta'>
    <form onSubmit={onSubmit}>
      <Grid container>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <TextField
            label='Nombre Completo'
            type='text'
            placeholder='Nombre Completo'
            fullWidth
            onChange={onInputChange}
            value={displayName}
            name='displayName'
            error={!!displayNameValid && formSubmitted}
            helperText={displayNameValid}


          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <TextField
            label='Correo'
            type='email'
            placeholder='correo@google.com'
            fullWidth
            onChange={onInputChange}
            value={email}
            name='email'
            error={!!emailValid && formSubmitted}
            helperText={emailValid}
          
                      />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <TextField
            label='contraseña'
            type='password'
            placeholder='contraseña'
            fullWidth
            onChange={onInputChange}
            value={password}
            name='password'
            error={!!passwordValid && formSubmitted}
            helperText={passwordValid}

          />
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} display= { !!errorMessage ? '' : 'none'}>
            <Alert severity='error'>
              {errorMessage}
            </Alert>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant='contained' fullWidth type='submit' disabled={isCheckingAuthentication}>
              Crear Cuenta
            </Button>
          </Grid>
        </Grid>

        <Grid container direction='row' justifyContent='end'>
          <Typography sx={{mr:1}}>
          Ya tienes cuenta? 
        </Typography>
          <Link component={RouterLink} color='inherit' to='/auth/login'>
            Ingresar
          </Link>
        </Grid>
      </Grid>
    </form>
  </AuthLayout>
  )
}
