
import React, { createRef, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

const SignUp = () => {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const {setUser, setToken} = useStateContext()
  const {errors, setErrors} = useState(null)
  
  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    console.log(payload)
    axiosClient.post('/signup', payload) 
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })

      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">ایجاد حساب</h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} type="text" placeholder="نام کامل"/>
          <input ref={emailRef} type="email" placeholder="ایمیل آدرس"/>
          <input ref={passwordRef} type="password" placeholder="گذرواٰژه"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="تکرار گذروازه"/>
          <button className="btn btn-block">ایجاد</button>
          <p className="message">حساب دارید ؟<Link to="/login">ورود به حساب</Link></p>
        </form>
      </div>
    </div>
      
  )
}

export default SignUp