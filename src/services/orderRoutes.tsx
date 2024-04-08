import axios from "axios";
import { jwtDecode } from "jwt-decode";

import {ORDERS_URL, API_URI, ORDER_PRODUCT_URL, CLOSE_ORDER_URL} from "../utils/consts";

class OrderRoutes {

  getAll = async (status: string | undefined = '') => {
    try {
      const {data} = await axios.get(API_URI + ORDERS_URL, {
        headers: {
          authorization: localStorage.token
        },
        params: {
          status: status
        }
      })
      return data
    } catch (e: any) {
      return new Error(e)
    }
  }
  getOne = async (id: number) => {
    try {
      const {data} = await axios.get(API_URI + ORDERS_URL + `/${id}`, {
        headers: {
          authorization: localStorage.token
        },
      })
      return data
    } catch (e: any) {
      return new Error(e)
    }
  }

  create = async (data: object) => {
    try {
      const response = await axios.post(API_URI + ORDERS_URL, data, {
        headers: {
          authorization: localStorage.token
        }
      })
      console.log(' RESP:', response.data.name)
      if (response.data.name === 'error') return {status: response.data.code, message: 'Utworzenie NIE powiodło się'}
      return {status: response.status, message: 'success'}
    } catch (e: any) {
      return {status: e.response.status, message: e.response.data}
    }
  }
  addProductToOrder = async (data: object) => {
    try {
      const response = await axios.post(API_URI + ORDER_PRODUCT_URL, data, {
        headers: {
          authorization: localStorage.token
        }
      })
      return {status: response.status, message: response.data}
    } catch (e: any) {
      return {status: e.response.status, message: e.response.data}
    }
  }

  getOrderedProducts = async (orderId: number) => {
    try {
      const {data} = await axios.get(API_URI + ORDER_PRODUCT_URL + `/${orderId}`, {
        headers: {
          authorization: localStorage.token
        }
      })
      return data
    } catch (e: any) {
      return {status: e.response.status, message: e.response.data}
    }
  }

  deleteOne = async (id: number) => {
    try {
      const response = await axios.delete(API_URI + ORDERS_URL, {
        headers: {
          authorization: localStorage.token
        },
        params: {
          id: id
        }
      })
      return {status: response.status, message: 'success'}
    } catch (e: any) {
      console.log(e.response)
      return {status: e.response.status, message: 'wistąpił bład'}
    }
  }

  close = async (data: any) => {
    try {
      const response = await axios.put(API_URI + CLOSE_ORDER_URL, data, {
        headers: {
          authorization: localStorage.token
        },
      })
      return {status: response.status, message: 'success'}
    } catch (e: any) {
      return {status: e.response.status, message: 'wistąpił bład'}
    }
  }
}

export default OrderRoutes