import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {createRef} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import { useState } from "react";

const Login = () => {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
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
    <div className="login-signup-form animated fadeInDown">
    <div className="form">
      <form onSubmit={onSubmit}>
        <h1 className="title">ورود به اکاونت</h1>

        {message &&
          <div className="alert">
            <p>{message}</p>
          </div>
        }

        <input ref={emailRef} type="email" placeholder="ایمیل"/>
        <input ref={passwordRef} type="password" placeholder="گذرواژه"/>
        <button className="btn btn-block">ورود</button>
        <p className="message">حساب ایجاد نکرده ایید? <Link to="/signup">ایجاد حساب</Link></p>
      </form>
    </div>
  </div>
  )
}

export default Login