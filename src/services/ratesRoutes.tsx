import axios from "axios";

import { RATES_URL, API_URI } from "../utils/consts";

class RatesRoutes {

  getRates = async () => {
    try {
      const {data} = await axios.get(API_URI + RATES_URL, {
        headers: {
          authorization: localStorage.token
        }
      })
      return data
    } catch (e: any) {
      return new Error(e)
    }
  }

  createRate = async (data: object) => {
    try {
      const response = await axios.post(API_URI + RATES_URL, data, {
        headers: {
          authorization: localStorage.token
        }
      })
      return {status: response.status, message: 'success'}
    } catch (e: any) {
      return {status: e.response.status, message: e.response.data}
    }
  }
  deleteOne = async (id: number) => {
    try {
      const response = await axios.delete(API_URI + RATES_URL, {
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

  edit = async (data: any) => {
    try {
      const response: any = await axios.put(API_URI + RATES_URL, data, {
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

export default RatesRoutes