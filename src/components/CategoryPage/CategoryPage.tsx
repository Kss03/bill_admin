import React, {useContext, useEffect, useRef, useState} from "react";
import {DeleteBtn, EditBtn} from "../Buttons/Buttons";
import {Context} from "../../App";
import CategoryRoutes from "../../services/categoryRoutes";
import {Button, Modal} from "react-bootstrap";

const categoryRouter = new CategoryRoutes()

const CategoryPage = () => {

  const {isAuthState} = useContext(Context)

  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAuth, setIsAuth, onAuth] = isAuthState

  useEffect(() => {
    onAuth()
    getDataFromDB()
  }, []);

  const getDataFromDB = async () => {
    const data = await categoryRouter.getAll()
    setItems(data)
    setIsLoaded(true)
  }

  const remove = async (id: number, name: string) => {
    const answ = window.confirm(`Czy napewno chcesz usunąć kategorię "${name}"?`)
    if (answ) {
      const resp = await categoryRouter.delete(id)
      if (resp.status !== 200) {
        alert(resp.message)
      } else {
        getDataFromDB()
      }
    }
  }

  return (
    <section className=' section rates-page '>
      <div className="my-container rounded-bottom-3">
        <div className=" bg-white rounded-3">
          <div className="section-title mb-3">
            <h3>Kategorii</h3>
          </div>
          <div className='d-flex flex-nowrap mx-5 justify-content-between align-items-center pb-4'>
            <CreateNewCategory getDataFromDB={getDataFromDB}/>
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
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {items.map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <th>{item.name}</th>
                      <td className='d-flex flex-nowrap justify-content-end'>
                        <EditCategoryModal getDataFromDB={getDataFromDB} id={item.id}/>
                        <DeleteBtn action={() => remove(item.id, item.name)}/>
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

interface EditCategoryProps {
  id: number,
  getDataFromDB: any
}
const EditCategoryModal: React.FC<EditCategoryProps> = ({getDataFromDB, id}) => {

  const [show, setShow] = useState(false);
  const [message,  setMessage] = useState('')

  const nameRef: any = useRef()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editCategory = async (e: any) => {
    e.preventDefault()
    const data = {
      id,
      name: nameRef.current.value
    }
    const response = await categoryRouter.edit(data)
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
        <form action="" onSubmit={editCategory}>
          <Modal.Body>
            <div className="form-group mb-3">
              <label htmlFor="name" className="formlabel ">Nazwa</label>
              <input type="text" aria-label="name" className="form-control rounded-3 w-100" ref={nameRef}/>
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


interface CreateNewCategoryProps {
  getDataFromDB: any
}
const CreateNewCategory: React.FC<CreateNewCategoryProps> = ({getDataFromDB}) => {

  const [show, setShow] = useState(false);
  const [message,  setMessage] = useState('')

  const nameRef: any = useRef()

  const createRate = async (e: any) => {
    e.preventDefault()
    const response = await categoryRouter.create({"name": nameRef.current.value})
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
      <Button type='button' className='btn btn-success text-uppercase fw-bold px-5 py-2' onClick={handleShow}>Utworz Kategorię</Button>

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


export default CategoryPage