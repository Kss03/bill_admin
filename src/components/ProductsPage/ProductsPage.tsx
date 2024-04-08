import React, {useContext, useEffect, useRef, useState} from "react";
import ProductRoutes from "../../services/productRoutes";
import {Button, Modal} from "react-bootstrap";
import {Context} from "../../App";
import CategoryRoutes from "../../services/categoryRoutes";
import {DeleteBtn, EditBtn} from "../Buttons/Buttons";
import {Link} from "react-router-dom";
import {CATEGORIES_URL} from "../../utils/consts";

const productRouter = new ProductRoutes()
const categoryRouter = new CategoryRoutes()

const ProductsPage = () => {

  const {isAuthState} = useContext(Context)

  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAuth, setIsAuth, onAuth] = isAuthState
  useEffect(() => {
    onAuth()
    getDataFromDB()
  }, []);

  const getDataFromDB = async () => {
    const data = await productRouter.getAll()
    setItems(data)
    console.log('ITEMS::: ', items)
    setIsLoaded(true)
  }

  const deleteProduct = async (id: number, name: string) => {
    const answ = window.confirm(`Czy napewno chcesz usunąć kategorię "${name}"`)
    if (answ) {
      const resp = await productRouter.deleteOne(id)
      alert(resp.message)
      getDataFromDB()
    }
  }



  return (
    <section className=' section rates-page '>
      <div className="my-container rounded-bottom-3">
        <div className=" bg-white rounded-3">
          <div className="section-title mb-3">
            <h3>Towary</h3>
          </div>
          <div className='d-flex flex-nowrap mx-5 justify-content-between align-items-center pb-4'>
            <div>
              <CreateNewProd getDataFromDB={getDataFromDB}/>
              <Link to={CATEGORIES_URL}><button className="btn btn-secondary ms-3 text-uppercase fw-bold px-4 py-2">Zarządzanie kategoriami</button></Link>
            </div>
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
                    <th>#</th>
                    <th>Nazwa</th>
                    <th>Kategoria</th>
                    <th>Cena</th>
                    <th>Ilość</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {items.length >0 && items.map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item.id}</th>
                      <td >{item.name}</td>
                      <td >{item.category_name}</td>
                      <td>{item.price} płn</td>
                      <td>{item.quantity}</td>
                      <td className='d-flex flex-nowrap justify-content-end'>
                        <EditProductModal getDataFromDB={getDataFromDB} item={item} />
                        <DeleteBtn action={() => deleteProduct(item.id, item.name)}/>
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
  item: any
  getDataFromDB: any
}
const EditProductModal: React.FC<EditRateProps> = ({getDataFromDB, item}) => {

  const [show, setShow] = useState(false);
  const [message,  setMessage] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
  }, []);

  const nameRef: any = useRef()
  const barcodeRef: any = useRef()
  const categoryIdRef: any = useRef()
  const priceRef: any = useRef()


  const getCategories = async () => {
    const categoryList = await categoryRouter.getAll()
    setCategories(categoryList)
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editProduct = async (e: any) => {
    e.preventDefault()
    const data = {
      id: item.id,
      name: nameRef.current.value ? nameRef.current.value : item.name,
      price: priceRef.current.value ? priceRef.current.value : item.price,
      category_id: categoryIdRef.current.value ? categoryIdRef.current.value : item.category_id,
      barcode: barcodeRef.current.value ? barcodeRef.current.value : item.barcode
    }
    const response = await productRouter.edit(data)
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
        <form action="" onSubmit={editProduct}>
          <Modal.Body>
            <div className="form-group mb-3">
              <label htmlFor="name" className="formlabel ">Nazwa</label>
              <input type="text" aria-label="name" className="form-control rounded-3 w-100" ref={nameRef}/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="category_id" className="formlabel ">Kategoria</label>
              <select className="form-select" aria-label="category_id" ref={categoryIdRef}>
                <option value="">Wybierz kategorie</option>
                {
                  categories.length > 0 && categories.map((item: any, index) => {
                    return <option key={index} value={item.id}>{item.name}</option>
                  })
                }
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="price" className="form-label">Cena</label>
              <input type="text" className="form-control rounded-3 w-100" aria-label="price" ref={priceRef}/>
            </div>
            <div className="form-group">
              <label htmlFor="barcode" className="form-label">Kod kreskowy</label>
              <input type="text" className="form-control rounded-3 w-100" aria-label="price" ref={barcodeRef}/>
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


interface CreateNewProdProps {
  getDataFromDB: any
}
const CreateNewProd: React.FC<CreateNewProdProps> = ({getDataFromDB}) => {

  const [show, setShow] = useState(false);
  const [message,  setMessage] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
  }, []);

  const nameRef: any = useRef()
  const barcodeRef: any = useRef()
  const categoryIdRef: any = useRef()
  const quantityRef: any = useRef()
  const priceRef: any = useRef()

  const getCategories = async () => {
    const categoryList = await categoryRouter.getAll()
    setCategories(categoryList)
  }

  const createProduct = async (e: any) => {
    e.preventDefault()
    const response = await productRouter.create({
      "name": nameRef.current.value,
      "barcode": barcodeRef.current.value,
      "category_id": Number(categoryIdRef.current.value),
      "quantity": Number(quantityRef.current.value),
      "price": Number(priceRef.current.value)
    })
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
      <Button type='button' className='btn btn-success text-uppercase fw-bold px-5 py-2' onClick={handleShow}>Utworz pozycje</Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nowa pozycja</Modal.Title>
        </Modal.Header>
        <form action="" onSubmit={createProduct}>
          <Modal.Body>
            <div className="form-group mb-3">
              <label htmlFor="name" className="formlabel ">Nazwa</label>
              <input type="text" aria-label="name" className="form-control rounded-3 w-100" ref={nameRef}/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="barcode" className="formlabel ">Kod kreskowy</label>
              <input type="text" aria-label="barcode" className="form-control rounded-3 w-100" ref={barcodeRef}/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="category_id" className="formlabel ">Kategoria</label>
              <select className="form-select" aria-label="category_id" ref={categoryIdRef} required>
                <option value="">Wybierz kategorie</option>
                {
                  categories.length > 0 && categories.map((item: any, index) => {
                    return <option key={index} value={item.id}>{item.name}</option>
                })
                }
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="quantity" className="formlabel ">Ilość towaru</label>
              <input type="number" aria-label="quantity" className="form-control rounded-3 w-100" ref={quantityRef}/>
            </div>
            <div className="form-group">
              <label htmlFor="price" className="form-label">Cena</label>
              <input type="number" step={0.01} className="form-control rounded-3 w-100" aria-label="price" ref={priceRef} required/>
            </div>
            <div className="text-center pt-3" role="alert">
              {message}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="px-4 me-3" variant="secondary" onClick={handleClose}>
              Zamknij
            </Button>
            <Button className="px-4" variant="success" type="submit">
              Utworz
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ProductsPage