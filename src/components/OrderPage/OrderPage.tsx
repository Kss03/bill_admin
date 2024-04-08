import React, {useState, useEffect, useContext, FormEvent, useRef} from "react";
import OrderRoutes from "../../services/orderRoutes";
import ProductRoutes from "../../services/productRoutes";
import CategoryRoutes from "../../services/categoryRoutes";
import {Context} from "../../App";
import {getOrderCost} from "../../utils/func";
import {DateTime} from "../../utils/DateTime";
import ActiveOrders from "../ActiveOrders";
import {DeleteBtn} from "../Buttons/Buttons";
import { IoAdd } from "react-icons/io5";
import {useLocation} from "react-router-dom";

const orderRouter = new OrderRoutes()
const productRouter = new ProductRoutes()
const categoryRouter = new CategoryRoutes()
const dateTime = new DateTime()


const OrderPage: React.FC = () => {

  let location = useLocation().state.id || Number(window.location.pathname.split('/').slice(-1)[0])

  const {isAuthState} = useContext(Context)
  const [order, setOrder] = useState<any>()
  const [ordered, setOrdered] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAuth, setIsAuth, onAuth] = isAuthState

  useEffect(() => {
    onAuth()
    getOrder()
  }, []);

  useEffect(() => {
    onAuth()
    getOrder()
  }, [location, isLoaded]);

  useEffect(() => {
    if (isLoaded) refreshCostState(order)
  }, [ordered]);

  const getOrder = async () => {
    const response = await orderRouter.getOne(location)
    refreshCostState(response)
    setIsLoaded(true)
  }

  const closeOrder = async (payMethod: string) => {
    const data = {...order, pay_method: payMethod, closed: dateTime.getNowStr()}
    const response = await orderRouter.close(data)
    setIsLoaded(false)
  }

  const refreshCostState = (order: any) => {
    if (!order.closed) {
      let data = order
      let productTotal = 0
      ordered.forEach((item: any) => productTotal = productTotal + item.price * item.number)
      data.product_cost = productTotal
      data.time_cost = getOrderCost(Date.parse(data.opened), Date.now(), data.discount, data.rate_price)
      data.duration = dateTime.getDuration(Date.parse(data.opened), Date.now())
      data.order_cost = data.time_cost + productTotal
      setOrder({...data})
    } else {
      setOrder(order)
    }
  }

  return (
    <section className="section order-section mb-5">
      <div className="my-container">
        <div className="row">
          <div className="col-9">
            {isLoaded && <OrderSection order={order} closeOrder={closeOrder} />
            }
          </div>
          <div className="col col-3">
            {isLoaded && <ActiveOrders />}
          </div>
          <div className="col col-9">
            {isLoaded && <ProductSection location={location} order={order} setOrder={setOrder} ordered={ordered} setOrdered={setOrdered}/>}
          </div>
        </div>
      </div>
    </section>
  )
}

interface OrderSectionProps {
  order: any,
  closeOrder: (payMethod: string) => {}
}
const OrderSection: React.FC<OrderSectionProps> = ({order, closeOrder}) => {
  const payments = [
    ['card', 'karta'],
    ['cash', 'gotówka'],
    ['mix', 'mix']
  ]

  const paymentRef: any = useRef()

  return (
    <div className="bg-white rounded-3 mb-4">
      <div className="section-title mb-3">
        <h3>Zamowienie №{order.id}</h3>
      </div>
      <div className="d-flex flex-nowrap mx-3 flex-column justify-content-start align-items-start pb-4">
        <h2 className="fw-normal">Rachuner №{order.id} do zapłaty {order.order_cost} zł</h2>
        <p>Stan: {order.status}</p>
        <p>Utworzony: {order.opened}</p>
        {order.closed && <p>Zamknięty: {order.closed}</p>}
        <p>Czas: {order.duration}</p>
        <p>Taryf: {order.rate_name}</p>
        <p >Koszt czasu: {order.time_cost} zł</p>
        <p>Ilość osób: {order.people_number}</p>
        <p>Numer Stolu: {order.table_number}</p>
        <p>Koszt towarów: {order.product_cost}</p>
      {order.status === 'open' ?
        <>
          <div className="form-group mb-3 d-flex flex-row align-items-center ">
            <label htmlFor="category_id" className="form-label me-3">Płatność:</label>
            <select className="form-select" aria-label="category_id" ref={paymentRef}>
              {
                payments.map((item: any, index) => {
                  return <option key={index} value={item[0]}>{item[1]}</option>
                })
              }
            </select>
          </div>
          <button onClick={() => closeOrder(paymentRef.current.value)} className="btn btn-danger btn-lg ms-3 mb-3 px-5">Zamknij pozycje</button>
        </>
        : <p>Płatność: {order.pay_method}</p>}
      </div>
    </div>
  )
}

interface ProductSectionProps {
  order: any,
  setOrder: any,
  ordered:any,
  setOrdered: any,
  location: number
}

const ProductSection: React.FC<ProductSectionProps> = ({order, setOrder, ordered, setOrdered, location}) => {

  const [productList, setProductList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getStoreData()
  }, []);

  useEffect(() => {
    getStoreData()
  }, [location]);

  useEffect(() => {
    if (!isLoaded) getStoreData()
  }, [isLoaded]);

  const getStoreData = async () => {
    const categories = await categoryRouter.getAll()
    const products = await productRouter.getAll()
    const orderedProducts = await orderRouter.getOrderedProducts(order.id)
    setCategoryList(categories)
    setProductList(products)
    setOrdered(orderedProducts)
    setIsLoaded(true)
  }

  const onSetOrderedTable = () => {
    let orderedTotalPrice: number = 0
    return ordered.map((item: any, index: number) => {
      orderedTotalPrice = orderedTotalPrice + item.price * item.number
      return (
        <tr key={index}>
          <td >{item.name} <small className="text-secondary"> / {item.price} zł</small></td>
          <td >{item.number}</td>
          <td>{item.price * item.number} zł</td>
          <td className='d-flex flex-nowrap justify-content-end'>
            <DeleteBtn action={() => console.log('CLICK')}/>
          </td>
        </tr>
      )
    })
  }

  const onSetProductTable = () => {
    return categoryList.map((cat: any) => {

      const filteredProducts = productList.filter((prod: any) => prod.category_id === cat.id)

      return (
        <>
          <tr className={`${cat.id}_position_toggle`} onClick={() => {
            let children = document.querySelectorAll(`.position-${cat.id}`)
            children.forEach((child :any) => {
              child.classList.toggle('d-none')
            })
          }}>
            <td>{cat.name}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {filteredProducts.map((prod: any, index: number) => {
            return(
              <tr key={index} className={`position-${cat.id} d-none`}>
                <td></td>
                <td>{prod.name} (<small className="text-secondary">{prod.price} zł</small>)</td>
                <td>{prod.quantity}</td>
                <td>
                  <AddProductToOrderForm order_id={order.id} product_id={prod.id} quantity={prod.quantity} setIsLoaded={setIsLoaded}/>
                </td>
              </tr>
            )
          })}
        </>
      )
    })
  }

  return (
    <div className="bg-white rounded-3">
      <div className="section-title mb-3">
        <h3>Produkty</h3>
      </div>
      <div className="d-flex flex-nowrap mx-3 flex-column justify-content-start align-items-start pb-4">
        <div className="w-75 mb-5">
          <h5 className="fw-bolder">Lista zamowień: </h5>
          <table className="table table-sm table-bordered">
            <thead className="table-info">
            <tr>
              <th className="col-6">Nazwa</th>
              <th className="col-2">Ilość</th>
              <th className="col-3">Suma</th>
              <th className="col-1"></th>
            </tr>
            </thead>
            <tbody>
              {isLoaded && onSetOrderedTable()}
            </tbody>
          </table>
        </div>
        <div className="w-100">
          <h5 className="fw-bolder">Dodaj pozycje</h5>
          <div className="d-flex w-100 justify-content-end mb-3"><input type="text" className="form-control w-auto" placeholder="wyszukaj"/></div>
          <table className="table table-sm table-bordered table-hover mb-4">
            <thead className="table-info">
              <tr>
                <th className="col-3">Kategoria</th>
                <th className="col-4">Nazwa</th>
                <th className="col-2">Na stanie</th>
                <th className="col-3">Ilość</th>
              </tr>
            </thead>
            <tbody>
              {isLoaded && onSetProductTable()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

interface AddProductToOrderFormProps {
  setIsLoaded: any
  order_id: number,
  product_id: number,
  quantity: number
}
const AddProductToOrderForm: React.FC<AddProductToOrderFormProps> = ({order_id, product_id, quantity, setIsLoaded}) => {

  const numberRef: any = useRef()
  const addProductToOrder = async (e: any, order_id: number, product_id: number) => {
    e.preventDefault();
    const data = {order_id, product_id, number: Number(numberRef.current.value)}
    const response = await orderRouter.addProductToOrder(data)
    setIsLoaded(false)
  }

  return (
    <form  onSubmit={(e) => {
      addProductToOrder(e, order_id, product_id)}}>
      <div className="d-flex flex-row flex-nowrap align-items-center justify-content-end">
        <input className="form-control w-100 rounded-end-0 p-0 ps-3" type="number" min={1} max={quantity ? quantity : 1000} disabled={quantity < 1} ref={numberRef}/>
        <button type="submit" className=" h-100 btn btn-success rounded-0 rounded-end-2 p-0 d-flex justify-content-center align-items-center fs-4"><IoAdd /></button>
      </div>
    </form>
  )
}


export default OrderPage