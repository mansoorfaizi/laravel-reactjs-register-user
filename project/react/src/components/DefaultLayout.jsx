import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import "../index.css"
const DefaultLayout = () => {
    const {user, token} = useStateContext();

    if (!token){
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
      ev.preventDefault()
    }

  return (
    <div id="defaultLayout">
    <aside>
      <Link to={"/dashboard"}>Dashboard</Link>
      <Link to={"/user"}>User</Link>
    </aside>
    <div className='content'>
      <header>
        <div>header</div>
        <div>
          {user.name}
          <a href="#" onClick={onLogout} className='btn-logout'>Logout</a>
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