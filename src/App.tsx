import React, {useState, useEffect, createContext} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Header from './components/Header/Header';
import NewOrderPage from './components/NewOrderPage/NewOrderPage';
import {
  HOME_URL,
  ORDERS_URL,
  CLOSED_URL,
  PRODUCTS_URL,
  CATEGORIES_URL,
  RATES_URL,
  AUTH_URL,
  ORDER_PAGE_URL
} from './utils/consts';
import RatesPage from './components/RatesPage/RatesPage';
import AuthPage from './components/AuthPage/AuthPage';
import ProductsPage from "./components/ProductsPage/ProductsPage";
import AuthRoutes from './services/authRoutes';
import ClosedOrdersPage from "./components/ClosedOrdersPage/ClosedOrdersPage";
import OrderPage from "./components/OrderPage/OrderPage";
import CategoryPage from "./components/CategoryPage/CategoryPage";


const auth = new AuthRoutes()

function App() {

  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuth().finally(() => {
      setLoading(false)
    })
  }, [isAuth])

  const onAuth = async () => {
    const resp = await auth.check()
    if (resp) {
      const {login, role} = auth.getUserData(localStorage.token)
      setUser({login, role})
    }
    setIsAuth(resp)
  }

  if (loading) {
  return (
    <div>
      <h1>Loaging...</h1>
    </div>
  )
  }

  return (
    <Context.Provider 
      value={{userState: [user, setUser], 
      isAuthState: [isAuth, setIsAuth, onAuth]}}>
      <BrowserRouter>

        {isAuth && <Header />}

        <Routes>
          {!isAuth &&
            <>
              <Route path={AUTH_URL} element={<AuthPage />} />
              <Route path='*' element={<AuthPage />} />
            </>}
          {isAuth &&
            <>
              <Route path={HOME_URL}>
                <Route index element={<HomePage />} />
                <Route path={ORDERS_URL} element={<NewOrderPage />} />
                <Route path={ORDER_PAGE_URL} element={<OrderPage />}/>
                <Route path={CLOSED_URL} element={<ClosedOrdersPage />}/>
                <Route path={PRODUCTS_URL}>
                  <Route index element={<ProductsPage />} />
                  <Route path={CATEGORIES_URL} element={<CategoryPage />}/>
                </Route>
                <Route path={RATES_URL} element={<RatesPage />}/>
              </Route>
              <Route path='*' element={<HomePage />} />
            </>}


        </Routes>
      </BrowserRouter>
    </Context.Provider>


    // <div>
    //   <Add />
    //   <List />
    // </div>
  );
}

export default App;
export const Context = createContext<any>(null)