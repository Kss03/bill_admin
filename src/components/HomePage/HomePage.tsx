import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../../App";
import OrderRouter from "../../services/orderRoutes"
import {DeleteBtn, EditBtn, NavigateToEditOrderBtn} from "../Buttons/Buttons";
import {DateTime} from "../../utils/DateTime";

const orderRouter = new OrderRouter()

function HomePage() {

  const dateTime = new DateTime()

  const {isAuthState} = useContext(Context)

  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAuth, setIsAuth, onAuth] = isAuthState
  useEffect(() => {
    onAuth()
    getDataFromDB()
  }, []);

  const getDataFromDB = async () => {
    const data = await orderRouter.getAll('open')
    setItems(data)
    setIsLoaded(true)
  }



  return (
    <section className="section home-page">
      <div className="my-container">
        <div className="bg-white rounded-3">
          <div className="section-title mb-3">
            <h3>Aktywne</h3>
          </div>
          <div className="d-flex flex-nowrap mx-5 justify-content-between align-items-center pb-4">
            <div className="table-block mx-5 pb-5 w-100">
              {
                isLoaded &&
                <table className="table table-hover table-bordered">
                  <thead className="table-light">
                  <tr>
                    <th style={{width: 30}}>Numer</th>
                    <th>Suma</th>
                    <th>Czas</th>
                    <th>Stół</th>
                    <th>Komentarz</th>
                    <th style={{width: 50}}></th>
                  </tr>
                  </thead>
                  <tbody>
                  {items.length >0 && items.map((item: any, index: number) => {
                    item.duration = dateTime.getDuration(dateTime.parseDate(item.opened), Date.now())
                    return (
                      <tr key={index}>
                        <th scope="row">{item.id}</th>
                        <td >{item.order_cost}</td>
                        <td >{item.duration}</td>
                        <td>{item.table_number}</td>
                        <td>{item.comment}</td>
                        <td className='d-flex flex-nowrap justify-content-end'>
                          <NavigateToEditOrderBtn id={item.id} />
                        </td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage