import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from 'services/user/actions'
import { handleGetUser, handleActivateUser } from 'services/api/user.api'

const UserVerificationComponent = () => {

  const dispatch = useDispatch()
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      const getUserCall = await handleGetUser();
      setUserData(getUserCall.data);
      return getUserCall.data
    };
    const updateUser = async () => {
      const updateUserCall = await handleActivateUser();
      setUserData(updateUserCall.data);
    };

    fetchUser()
    dispatch(setUser(userData))
    updateUser()
    dispatch(setUser(userData))
  }, []);

  return (
    <div className='userData-verification-container'>
      
    </div>
  )
}

export default UserVerificationComponent