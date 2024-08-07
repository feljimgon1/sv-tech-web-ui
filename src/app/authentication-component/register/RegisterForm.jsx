import React, { useEffect } from 'react'
import './register.scss'
import { Alert, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { registerValidators } from '../authValidations.js'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const RegisterForm = () => {

  // Form fields
  const [name, setName] = React.useState('')
  const [surname, setSurname] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [repeatPassword, setRepeatPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
  const handleClickShowRepeatPassword = () => setShowRepeatPassword(!showRepeatPassword);
  const handleMouseDownRepeatPassword = () => setShowRepeatPassword(!showRepeatPassword);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false)

  // Alerts
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false)
  const [showErrorMessage, setShowErrorMessage] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleChange = (e) => {
    setShowErrorMessage(false)
    if (e.target.name === 'name') setName(e.target.value)
    if (e.target.name === 'surname') setSurname(e.target.value)
    if (e.target.name === 'email') setEmail(e.target.value)
    if (e.target.name === 'password') setPassword(e.target.value)
    if (e.target.name === 'repeat-password') setRepeatPassword(e.target.value)
  }

  const handleCloseSnackbar = () => {
    setShowErrorMessage(false);
  };

  const submit = (e) => {
    e.preventDefault()
    let validators = registerValidators(password, email)
    if (password !== repeatPassword) {
      setShowErrorMessage(true)
      setErrorMessage('Las contraseñas no coinciden')
      setLoadingSubmit(false)
      return
    }
    if (validators[0]) {
      setShowErrorMessage(true)
      setErrorMessage(validators[1])
      return
    }
    setLoadingSubmit(true)
    // Handle server response
    fetch(
      'http://localhost:5000/api/v1/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          password: password
        }),
        mode: 'cors',
      },
    ).then((res) => {
      if (res.status === 200) {
        setShowSuccessMessage(true)
      }
      return res.json()
    }).then((data) => {
      if (data.error) {
        setShowErrorMessage(true)
        setErrorMessage(data.error)
        setLoadingSubmit(false)
      } else {
        setLoadingSubmit(false)
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 2500);
      }
    })
  }

  return (
    <div className='register-container'>
      <form onSubmit={submit}>
        <TextField
          className='input'
          name='name'
          label='Nombre'
          variant='filled'
          type='text'
          required={true}
          onChange={e => handleChange(e)}
        />
        <TextField
          className='input'
          name='surname'
          label='Apellidos'
          variant='filled'
          type='text'
          required={true}
          onChange={e => handleChange(e)}
        />
        <TextField
          className='input'
          name='email'
          label='Email'
          variant='filled'
          type='email'
          required={true}
          onChange={e => handleChange(e)}
        />
        <TextField
          className='input'
          name='password'
          label='Contraseña'
          variant='filled'
          type={showPassword ? "text" : "password"}
          required={true}
          onChange={e => handleChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          className='input'
          name='repeat-password'
          label='Repita la contraseña'
          variant='filled'
          type={showRepeatPassword ? "text" : "password"}
          required={true}
          onChange={e => handleChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowRepeatPassword}
                  onMouseDown={handleMouseDownRepeatPassword}
                >
                  {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <LoadingButton
          loading={loadingSubmit}
          type='submit'
          variant='contained'
          onClick={submit}
        >
          Registrar
        </LoadingButton>
      </form>
      {showErrorMessage && <Snackbar
        open={showErrorMessage}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>}

      {showSuccessMessage && <Snackbar
        open={showSuccessMessage}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Usuario creado satisfactoriamente
        </Alert>
      </Snackbar>}
    </div>
  )
}

export default RegisterForm