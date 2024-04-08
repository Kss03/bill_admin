import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom"
import {ORDERS_URL} from "../utils/consts";
import OrderRoutes from "../services/orderRoutes";
import {Context} from "../App";

const orderRouter = new OrderRoutes()

const ActiveOrders = () => {

  const {isAuthState} = useContext(Context)

  const [orderList, setOrderList] = useState<any>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAuth, setIsAuth, onAuth] = isAuthState

  useEffect(() => {
    getDataFromDB()
  }, []);

  const getDataFromDB = async () => {
    const data = await orderRouter.getAll('open')
    const idList = data.map((item: any) => item.id)
    setOrderList(idList)
    setIsLoaded(true)
  }

  return (
    <div className="bg-white rounded-3">
      <div className="section-title mb-3">
        <h3 className="h5">Otwarte pozycji</h3>
      </div>
      <div className="d-flex mx-3 justify-content-start align-items-start pb-4">
        {isLoaded && orderList.map((orderId: any, index: number) => <Link key={index} state={{id: orderId}} className="me-2" to={ORDERS_URL + `/${orderId}`}>{orderId},</Link>)}
      </div>
    </div>
  )
}

export default ActiveOrders