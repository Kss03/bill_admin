import React, {useRef, useState, useContext} from 'react'
import AuthRouter from '../../services/authRoutes'
import { Context } from '../../App'


const AuthPage = () => {

  const auth = new AuthRouter()

  const {userState, isAuthState} = useContext(Context)

  const [user, setUser] = userState
  const [isAuth, setIsAuth] = isAuthState

  const loginRef: any = useRef()
  const passwordRef: any = useRef()

  const [isLoggedMsg, setIsLoggedMsg] = useState('')

  const onSubmitForm = async (e: any) => {
    e.preventDefault()
    try {
      const response = await auth.login({'login': loginRef.current.value, 'password': passwordRef.current.value})
      console.log(response)
      if (response.status === 200) {
        const token = response.data.token
        auth.updateToken(token)
        const {login, role} = auth.getUserData(token)
        setUser({login, role})
        setTimeout(() => {
          setIsLoggedMsg('')
          setIsAuth(true)
        }, 1000)
      }
      setIsLoggedMsg(response.data.message)
    } catch (e) {
      setIsLoggedMsg('Logowanie nie powiodło się')
    }
  }

  return (
    <div className='w-auto mx-auto px-5 py-4 pb-2 bg-white auth-page-container shadow-lg rounded-3' >
      <h5 className="mb-3 text-body-secondary ">Admin Panel</h5>
      <form action="" onSubmit={onSubmitForm}>
        <div className="input-group mb-3">
          <input type="text" required className="form-control rounded-3" placeholder="login" aria-label="login" aria-describedby="basic-addon1" ref={loginRef}/>
        </div>
        <div className="input-group mb-3">
          <input type="password" required className="form-control rounded-3" placeholder="password" aria-label="password" aria-describedby="basic-addon1"  ref={passwordRef}/>
        </div>
        <button type='submit' className='btn btn-success text-uppercase fs-6 w-100 rounded-3'>Zaloguj się</button>
      </form>
      <p className="pt-4">{isLoggedMsg}</p>
    </div>
  )
}

export default AuthPage