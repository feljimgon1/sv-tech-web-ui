import React from 'react'
import AuthenticationComponent from './authentication-component/AuthenticationComponent'
import UserVerificationComponent from './user-verification-component/UserVerificationComponent'

const SVTech = () => {

  const isLoggedIn = false
  const isUserVerified = false

  if (!isLoggedIn) {
    return (
      <AuthenticationComponent />
    )
  }

  if (!isUserVerified) {
    return (
      <UserVerificationComponent />
    )
  }

  return (
    <div>

    </div>
  )
}

export default SVTech