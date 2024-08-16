import React from 'react'
import { Alert, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useDispatch } from 'react-redux';
import { registerValidators } from 'services/utils/authValidations'
import { apiCall } from 'services/api/common.api'
import { setNotification } from 'services/notification/actions'
import { FcGoogle } from 'react-icons/fc';
import useGoogleAuth from '../login/GoogleAuth';

const RegisterForm = () => {
  const dispatch = useDispatch()
  const { login } = useGoogleAuth(); // Use the custom hook

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

  const submit = async (e) => {
    e.preventDefault()
    let validators = registerValidators(name, surname, password, email)
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
    const userRegister = await apiCall('POST', '/users/register', undefined, JSON.stringify({
      name: name,
      surname: surname,
      email: email,
      password: password
    }))

    userRegister ?
      dispatch(setNotification({
        message: userRegister.message,
        success: userRegister.success,
      })) :
      dispatch(setNotification({
        message: 'Se ha producido un error, inténtelo de nuevo más tarde',
        success: false,
      }))

    setLoadingSubmit(false)
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
        <div className="submit-container">
          <LoadingButton
            loading={loadingSubmit}
            type='submit'
            variant='contained'
            onClick={submit}
          >
            Registrar
          </LoadingButton>
          <FcGoogle onClick={login} />
        </div>
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