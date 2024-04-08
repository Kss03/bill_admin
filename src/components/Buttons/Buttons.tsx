import {CiEdit} from "react-icons/ci";
import {TiDelete} from "react-icons/ti";
import React from "react";
import {useNavigate} from "react-router-dom";
import {ORDERS_URL} from "../../utils/consts";



interface BtnProps {
  action: Function,
  classes?: string
}

interface BtnNavigate {
  id: number
}

const NavigateToEditOrderBtn: React.FC<BtnNavigate> = ({id}) => {
  const navigate = useNavigate()
  return (
    <EditBtn classes="btn-light" action={() => navigate(`${ORDERS_URL}/${id}`, {state: {id}})} />
  )
}
const EditBtn: React.FC<BtnProps> = ({action, classes}: BtnProps) => {
  return <button type='button'
                 onClick={() => action()}
                 className={`btn px-2 py-1 d-flex justify-content-center align-items-center fs-4 btn-secondary me-2 rounded-3 ${classes}`}>
    <CiEdit/></button>
}


const DeleteBtn: React.FC<BtnProps> = ({action, classes}: BtnProps) => {
  return <button
    onClick={() => action()}
    type='button'
    className={`btn px-2 py-1 d-flex justify-content-center align-items-center fs-4 btn-danger rounded-3 ${classes}`}>
    <TiDelete/></button>
}

export {EditBtn, DeleteBtn, NavigateToEditOrderBtn}