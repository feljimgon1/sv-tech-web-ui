import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from 'services/user/actions'
import { handleGetUser, handleActivateUser } from 'services/api/user.api'
import { Alert, CircularProgress } from '@mui/material'
import './user-verification.scss'
import { useNavigate } from 'react-router'

const UserVerificationComponent = () => {

  const dispatch = useDispatch()
  const [userData, setUserData] = useState({})
  const [isPendingRequest, setIsPendingRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setIsPendingRequest(true)
    const fetchUser = async () => {
      const getUserCall = await handleGetUser();
      setUserData(getUserCall.data);
      if (!getUserCall.data) {
        setErrorMessage('Usuario no encontrado')
        return
      }
      return getUserCall.data
    };
    const updateUser = async () => {
      try {
        const updateUserCall = await handleActivateUser();
        setUserData(updateUserCall.data);
        localStorage.setItem('user', JSON.stringify(updateUserCall.data))
      }
      catch (err) {
        setErrorMessage('Error al verificar el usuario')
      }
    };

    fetchUser()
    dispatch(setUser(userData))
    updateUser()
    dispatch(setUser(userData))
    setIsPendingRequest(false)

    setTimeout(() => {
      navigate('/profile')
    }, 3500);
  }, []);

  return (
    <div className='userData-verification-container'>
      {isPendingRequest && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      )}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {!errorMessage && !isPendingRequest && (
        <div className="success-animation">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
          <div className="success-text">Usuario verificado, redireccionando a su perfil<div className='loader' /></div>
        </div>
      )}
    </div>
  )
}

export default UserVerificationComponent