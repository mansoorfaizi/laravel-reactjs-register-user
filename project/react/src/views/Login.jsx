
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {createRef} from "react";
import { useStateContext } from '../context/ContextProvider';

const Login = () => {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)
  const onSubmit = (ev) => {
    ev.preventDefault()

  const payload = {
    email: emailRef.current.value,
    password: passwordRef.current.value,
  }

  axiosClient.post('/login', payload)
  .then(({data}) => {
    setUser(data.user)
    setToken(data.token);
  })
  .catch((err) => {
    const response = err.response;
    if (response && response.status === 422) {
      setMessage(response.data.message)
    }
  })
}
  return (
        <form onSubmit={onSubmit}>
          <h1 className='title'>Login into your account</h1>
          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }
          <input ref={emailRef} type="email" placeholder='Email' />
          <input ref={passwordRef} type="password" placeholder='password' />
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Not Registered? <Link to={"/signup"}>Create an account</Link>
          </p>
        </form>
  )
}

export default Login