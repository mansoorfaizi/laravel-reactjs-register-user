
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const onSubmit = (ev) => {
    ev.preventDefault()
  }
  return (
    
        <form onSubmit={onSubmit}>
          <h1 className='title'>Signup for free</h1>
          <input type="text" placeholder='Full Name' />
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='password' />
          <input type="password" placeholder='password confirmation' />
          <button className='btn btn-block'>Signup</button>
          <p className='message'>
            Already Registered? <Link to={"/login"}>Sign in</Link>
          </p>
        </form>
      
  )
}

export default SignUp