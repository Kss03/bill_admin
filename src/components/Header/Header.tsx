import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import Clock from 'react-live-clock'
import { CLOSED_URL, HOME_URL, ORDERS_URL, PRODUCTS_URL, RATES_URL } from '../../utils/consts'
import {Context} from "../../App";

const Header: React.FC = () => {

  const {userState, isAuthState} = useContext(Context)

  const [user, setUser] = userState
  const [isAuth, setIsAuth] = isAuthState

  const onLogOut = () => {
    localStorage.removeItem('token')
    setUser({})
    setIsAuth(false)
  }

  return (
    <header className='header'>
      <div className=" my-container">
        <nav className='header-nav py-3 d-flex justify-content-between flex-nowrap'>
          <div className='nav-links d-flex justify-content-between flex-nowrap'>
            <Link className='text-decoration-none nav-blocks border-0 rounded-0 rounded-start-2' to={HOME_URL}>Aktywne</Link>
            <Link className='text-decoration-none nav-blocks border-0 rounded-0 ' to={ORDERS_URL}>Nowe zamówienie</Link>
            <Link className='text-decoration-none nav-blocks border-0 rounded-0 active' to={CLOSED_URL}>Zamknięte</Link>
            <Link className='text-decoration-none nav-blocks border-0 rounded-0 ' to={PRODUCTS_URL}>Towary</Link>
            <Link className='text-decoration-none nav-blocks border-0 rounded-0 ' to={RATES_URL}>Taryfy</Link>
          </div>
          <div className='text-decoration-none nav-blocks border-0 rounded-0 w-100 text-end pe-4'><Clock format={'HH:mm:ss'} ticking={true}/></div>
          <div className="text-decoration-none nav-blocks border-0 rounded-0 rounded-end-2 p-0 d-flex justify-content-center"><button type="button" className="btn btn-secondary rounded-0 fw-bold rounded-end-2" onClick={onLogOut}>Wyloguj</button></div>
        </nav>
      </div>
    </header>
  )
}

export default Header