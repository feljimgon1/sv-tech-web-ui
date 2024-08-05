import React from 'react'
import AuthenticationComponent from './authentication-component/AuthenticationComponent'

const SVTech = () => {
  
  const isLoggedIn = false

  if (!isLoggedIn) {
    return (
      <AuthenticationComponent />
    )
  }

  return (
    <div>

    </div>
  )
}

export default SVTech