import React, {useState, useEffect, useRef, useContext} from 'react'
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import RatesRoutes from "../../services/ratesRoutes";
import {Button, Modal} from "react-bootstrap";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {Context} from "../../App";
import {DeleteBtn, EditBtn} from "../Buttons/Buttons";

const rateRouter = new RatesRoutes()
const RatesPage = () => {

  const {isAuthState} = useContext(Context)

  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAuth, setIsAuth, onAuth] = isAuthState

  useEffect(() => {
    onAuth()
    getDataFromDB()
  }, []);

  const getDataFromDB = async () => {
    const data = await rateRouter.getRates()
    setItems(data)
    setIsLoaded(true)
  }

  const deleteRate = async (id: number, name: string) => {
    const answ = window.confirm(`Czy napewno chcesz usunąć taryf "${name}"?`)
    if (answ) {
      const resp = await rateRouter.deleteOne(id)
      alert(resp.message)
      getDataFromDB()
    }
  }

  const editRate = () => {

  }

  // @ts-ignore
  return (
    <section className=' section rates-page '>
      <div className="my-container rounded-bottom-3">
        <div className=" bg-white rounded-3">
          <div className="section-title mb-3">
            <h3>Taryfy</h3>
          </div>
          <div className='d-flex flex-nowrap mx-5 justify-content-between align-items-center pb-4'>
            <CreateNewRateModal getDataFromDB={getDataFromDB}/>
            <div className='input-group w-auto'>
              <label className='text-uppercase fw-bold input-group-text fs-6' htmlFor="#rateSearch ">szukaj</label>
              <input id='#rateSearch' type="text" className=' form-control'/>
            </div>
          </div>
          <div className="table-block mx-5 pb-5">
            {
              isLoaded &&
              <table className="table table-hover table-bordered">
                <thead className="table-light">
                <tr>
                  <th>Nazwa</th>
                  <th>Cena</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {items.map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <th>{item.name}</th>
                      <td>{item.price} płn</td>
                      <td className='d-flex flex-nowrap justify-content-end'>
                        <EditRateModal getDataFromDB={getDataFromDB} item={item}/>
                        <DeleteBtn action={() => deleteRate(item.id, item.name)}/>
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
    </section>
  )
}

interface EditRateProps {
  item: any,
  getDataFromDB: any
}
const EditRateModal: React.FC<EditRateProps> = ({getDataFromDB, item}) => {

  const [show, setShow] = useState(false);
  const [message,  setMessage] = useState('')

  const priceRef: any = useRef()
  const nameRef: any = useRef()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editRate = async (e: any) => {
    e.preventDefault()
    const data = {
      id: item.id,
      name: nameRef.current.value ? nameRef.current.value : item.name,
      price: priceRef.current.value ? priceRef.current.value : item.price
    }
    const response = await rateRouter.edit(data)
      .then((resp) => {
        setMessage(resp.message)
        if (resp.status !== 200) {
          return
        }
        setTimeout(() => {
          getDataFromDB(false)
          handleClose()
          setMessage('')
        }, 1000)
      })
  }

  return (
    <>
      <EditBtn action={handleShow}/>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj</Modal.Title>
        </Modal.Header>
        <form action="" onSubmit={editRate}>
          <Modal.Body>
            <div className="form-group mb-3">
              <label htmlFor="name" className="formlabel ">Nazwa</label>
              <input type="text" aria-label="name" className="form-control rounded-3 w-100" ref={nameRef}/>
            </div>
            <div className="form-group">
              <label htmlFor="price" className="form-label">Cena</label>
              <input type="text" className="form-control rounded-3 w-100" aria-label="price" ref={priceRef}/>
            </div>
            <div className="text-center pt-3" role="alert">
              {message}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Zamknij
            </Button>
            <Button variant="success" type="submit">
              Zapisz
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

interface CreateNewRateProps {
  getDataFromDB: any
}
const CreateNewRateModal: React.FC<CreateNewRateProps> = ({getDataFromDB}) => {

  const [show, setShow] = useState(false);
  const [message,  setMessage] = useState('')

  const nameRef: any = useRef()
  const priceRef: any = useRef()

  const createRate = async (e: any) => {
    e.preventDefault()
    const response = await rateRouter.createRate({"name": nameRef.current.value, "price": priceRef.current.value})
      .then((resp) => {
        setMessage(resp.message)
        if (resp.status !== 200) {
          return
        }
        setTimeout(() => {
          getDataFromDB(false)
          handleClose()
          setMessage('')
        }, 1000)
      })
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // @ts-ignore
  return (
    <>
      <Button type='button' className='btn btn-success text-uppercase fw-bold px-5 py-2' onClick={handleShow}>Utworz</Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nowy Taryf</Modal.Title>
        </Modal.Header>
        <form action="" onSubmit={createRate}>
          <Modal.Body>
            <div className="form-group mb-3">
              <label htmlFor="name" className="formlabel ">Nazwa</label>
              <input type="text" aria-label="name" className="form-control rounded-3 w-100" ref={nameRef}/>
            </div>
            <div className="form-group">
              <label htmlFor="price" className="form-label">Cena</label>
              <input type="text" className="form-control rounded-3 w-100" aria-label="price" ref={priceRef}/>
            </div>
            <div className="text-center pt-3" role="alert">
              {message}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Zamknij
            </Button>
            <Button variant="success" type="submit">
              Utworz
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default RatesPage