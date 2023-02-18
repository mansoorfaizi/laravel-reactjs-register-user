import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'
import "../index.css"
const DefaultLayout = () => {
    const {user, token, setUser} = useStateContext();

    if (!token){
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
      ev.preventDefault()
      axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
    }

    useEffect( () =>{
      axiosClient.get('/user')
      .then(({data}) =>{
        setUser(data)
      }, [])
    })

  return (
    <div id="defaultLayout">
    <aside>
      <Link to={"/dashboard"}>صفحه اصلی</Link>
      <Link to={"/user"}>حساب ها</Link>
    </aside>
    <div className='content'>
      <header>
        <div>عنوان</div>
        <div>
          {user.name}
          <a href="#" onClick={onLogout} className='btn-logout'>خروج</a>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
</div>
  )
}

export default DefaultLayout