import React from 'react'
import './login-form.scss'
import {
  Card,
  TextField,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch } from 'react-redux';
import { loginValidators } from 'services/utils/authValidations'
import { setToken } from 'services/user/actions';
import { setUser } from 'services/user/actions';
import { apiCall } from '../../../services/api/common.api';
import { setNotification } from '../../../services/notification/actions';

/**
 * Renders a login form with username and password fields, a password visibility toggle,
 * and a submit button. Also displays an error message if the form submission fails validation.
 *
 * @return {JSX.Element} The login form component.
 */
const LoginForm = () => {

  const dispatch = useDispatch()

  // Form fields
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loadingSubmit, setLoadingSubmit] = React.useState(false)

  // Password handler
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // Alerts
  const [showErrorMessage, setShowErrorMessage] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleCloseSnackbar = () => {
    setShowErrorMessage(false);
  };

  const handleChange = (e) => {
    setShowErrorMessage(false)
    if (e.target.name === 'username') setUsername(e.target.value)
    if (e.target.name === 'password') setPassword(e.target.value)
  }

  const submit = async (e) => {
    e.preventDefault()
    let validators = loginValidators(password, username)
    if (validators[0]) {
      setShowErrorMessage(true)
      setErrorMessage(validators[1])
      return
    }
    // Handle server response
    setLoadingSubmit(true)

    const userLogin = await apiCall('POST', '/users/login', undefined, JSON.stringify({
      email: username,
      password: password
    }))

    userLogin ?
      dispatch(setNotification({
        message: userLogin.message,
        success: userLogin.success,
      })) :
      dispatch(setNotification({
        message: 'Se ha producido un error, inténtelo de nuevo más tarde',
        success: false,
      }))

    localStorage.setItem('access_token', userLogin.token)
    setLoadingSubmit(false)
  }

  return (
    <div className='login-container'>
      <form onSubmit={submit}>
        <TextField
          className='input'
          name='username'
          label='Usuario'
          variant='filled'
          type='text'
          onChange={e => handleChange(e)}
        />
        <TextField
          className='input'
          name='password'
          label='Contraseña'
          variant="filled"
          type={showPassword ? "text" : "password"}
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
        <LoadingButton
          loading={loadingSubmit}
          variant='contained'
          type='submit'
          onClick={submit}
          className='btn'
        >
          Iniciar sesión
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
    </div>
  )
}

export default LoginForm