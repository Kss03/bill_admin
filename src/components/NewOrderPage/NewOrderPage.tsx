import React, {useEffect, useState, useRef} from 'react'
import RatesRoutes from "../../services/ratesRoutes";
import OrderRoutes from "../../services/orderRoutes";
import {DateTime} from "../../utils/DateTime";
import ActiveOrders from "../ActiveOrders";

interface Ref extends React.MutableRefObject<any> {

}

const ratesRouter = new RatesRoutes()
const orderRouter = new OrderRoutes()
const NewOrderPage: React.FC = () => {

  const dateTime = new DateTime()

  const [rates, setRates] = useState([])
  const [message, setMessage] = useState('')

  const tableNumRef: Ref = useRef()
  const peopleNumRef: Ref = useRef()
  const rateRef: Ref= useRef()
  const commentRef: Ref = useRef()
  const discountRef: Ref = useRef()
  const formRef: Ref = useRef()


  useEffect(() => {
    getRates()
  }, []);
  const getRates = async () => {
    const list = await ratesRouter.getRates()
    setRates(list)
  }

  type inputOrder = {
    table_number: number,
    people_number: number,
    rate_id: number,
    comment: string,
    opened: string,
    discount: number
  }

  const onCreateNewOrder = async (e: any) => {
    e.preventDefault()
    const data: inputOrder = {
      table_number: Number(tableNumRef.current.value),
      people_number: Number(peopleNumRef.current.value),
      rate_id: Number(rateRef.current.value),
      comment: commentRef.current.value,
      opened: dateTime.getNowStr(),
      discount: Number(discountRef.current.value)
    }

    const response =  await orderRouter.create(data)
    console.log(response)
    setMessage(response.message)
    if (response.status === 200) {
      setTimeout(() => {
        tableNumRef.current.value = tableNumRef.current.defaultValue
        peopleNumRef.current.value = peopleNumRef.current.defaultValue
        rateRef.current.value = rateRef.current.defaultValue
        commentRef.current.value = commentRef.current.defaultValue
        discountRef.current.value = discountRef.current.defaultValue
      }, 3000)
    }
  }

  return (
    <section className="section home-page">
      <div className="my-container">
        <div className="row">
          <div className="col col-9">
            <div className="bg-white rounded-3">
              <div className="section-title mb-5">
                <h3>Nowe zamówienie</h3>
              </div>
              <div className="mx-5 justify-content-between align-items-center pb-4">
                <form onSubmit={onCreateNewOrder} ref={formRef}>
                  <div className="row mb-3 justify-content-center">
                    <div className="col col-2 d-flex justify-content-end align-items-center">
                      <label htmlFor="table_number" className="form-label fw-bold mb-0">Numer stola</label>
                    </div>
                    <div className="col col-4">
                      <input type="number" id="table_number" className="form-control rounded-3 rounded-3" ref={tableNumRef} min={0}/>
                    </div>
                  </div>
                  <div className="row mb-3 justify-content-center">
                    <div className="col col-2 d-flex justify-content-end align-items-center">
                      <label htmlFor="people_number" className="form-label fw-bold mb-0">Ilość osób</label>
                    </div>
                    <div className="col col-4">
                      <input type="number" id="people_number" className="form-control rounded-3 rounded-3" defaultValue={1} ref={peopleNumRef} min={0}/>
                    </div>
                  </div>
                  <div className="row mb-3 justify-content-center">
                    <div className="col col-2 d-flex justify-content-end align-items-center">
                      <label htmlFor="rate_id" className="form-label fw-bold mb-0">Taryf</label>
                    </div>
                    <div className="col col-4">
                      <select className="form-select" aria-label="category_id" required ref={rateRef}>
                        <option value="">Wybierz kategorie</option>
                        {
                          rates.length > 0 && rates.map((item: any, index) => {
                            return <option key={index} value={item.id}>{item.name}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3 justify-content-center">
                    <div className="col col-2 d-flex justify-content-end align-items-center">
                      <label htmlFor="discount" className="form-label fw-bold mb-0">Rabat</label>
                    </div>
                    <div className="col col-4">
                      <div className='input-group'>
                        <span className="input-group-text rounded-start-3" id="discount-descr">%</span>
                        <input aria-describedby="discount-descr" type="number" id="discount" className="form-control rounded-3 rounded-start-0" defaultValue={0} min={0} max={100} ref={discountRef}/>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3 justify-content-center">
                    <div className="col col-2 d-flex justify-content-end align-items-center">
                      <label htmlFor="comment" className="form-label fw-bold mb-0">Komentarz</label>
                    </div>
                    <div className="col col-4">
                      <textarea id="comment" className="form-control rounded-3 rounded-3" rows={3} ref={commentRef}/>
                    </div>
                  </div>
                  <div className="row mb-3 justify-content-center">
                    <div className="col col-2"></div>
                    <div className="col col-4 justify-content-start">
                      <button type={"submit"} className="btn btn-success px-5 fw-bold rounded-3 me-3">Utworz</button>
                      <p className="h5 pt-2 text-warning">{message}</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col col-3">
            <ActiveOrders />
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewOrderPage