import React from 'react'
import './user-verification.scss'

const UserVerificationCompoent = () => {
  return (
    <div className='user-verification-component'>
      <h1>Check your email and click on the link to verify your account</h1>
      <p>Didn't receive the email? <a href=''>Resend</a></p>
    </div>
  )
}

export default UserVerificationCompoent