import React from 'react';
import {
  TextField,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { authRequest, authSuccess, authFailed, authError } from '../../../../redux/userRelated/userSlice';
import { setNotification, clearNotification } from '../../../../redux/notificationRelated/notificationSlice';
import { apiCall } from 'services/api/common.api';
import useGoogleAuth from './GoogleAuth'; // Import the custom hook
import { FcGoogle } from "react-icons/fc";
import { loginValidators } from '../authValidations';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notification = useSelector(state => state.notification);

  const { login } = useGoogleAuth();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleCloseSnackbar = () => {
    dispatch(clearNotification());
  };

  const handleChange = (e) => {
    if (e.target.name === 'username') setUsername(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();

    // Validation
    let validators = loginValidators(password, username);
    if (validators[0]) {
      dispatch(setNotification({
        message: validators[1],
        success: false
      }));
      return;
    }

    setLoadingSubmit(true);
    dispatch(authRequest());

    try {
      const userLogin = await apiCall('POST', '/users/login', undefined, JSON.stringify({
        email: username,
        password: password,
      }));

      console.log(userLogin);

      if (userLogin.success) {
        dispatch(authSuccess(userLogin.data));
        dispatch(setNotification({
          message: userLogin.message,
          success: true,
        }));
        navigate('/')
      } else {
        dispatch(authFailed(userLogin.message));
        dispatch(setNotification({
          message: userLogin.message,
          success: false,
        }));
      }
    } catch (error) {
      dispatch(authError('Login failed, please try again.'));
      dispatch(setNotification({
        message: 'Se ha producido un error, inténtelo de nuevo más tarde',
        success: false,
      }));
    } finally {
      setLoadingSubmit(false);
    }
  };

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
        <div className="submit-container">
          <LoadingButton
            loading={loadingSubmit}
            variant='contained'
            type='submit'
            onClick={submit}
            className='btn'
          >
            Iniciar sesión
          </LoadingButton>
          <FcGoogle onClick={login} />
        </div>
      </form>
      {notification?.message && (
        <Snackbar
          open={!!notification.message}
          autoHideDuration={2500}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={notification.success ? "success" : "error"}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default LoginForm;
