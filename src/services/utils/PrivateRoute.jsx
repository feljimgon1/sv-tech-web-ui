import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from 'hooks/useAuth'

const PrivateRoute = ({ children }) => {

  //TODO: Apply for roles

  const navigate = useNavigate()

  const auth = useAuth()

  useEffect(() => {
    console.log(auth);
    if (!auth) {
      navigate('/login')
    }
  }, [auth, navigate])

  return (
    <>
      {auth ? children : () => {}}
    </>
  )
}

export default PrivateRoute