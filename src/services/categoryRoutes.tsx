import axios from "axios";

import {API_URI, CATEGORIES_URL, RATES_URL} from "../utils/consts";

class CategoryRoutes {

  getAll = async () => {
    try {
      const {data} = await axios.get(API_URI + '/' + CATEGORIES_URL, {
        headers: {
          authorization: localStorage.token
        }
      })
      return data
    } catch (e: any) {
      return new Error(e)
    }
  }

  create = async (data: object) => {
    try {
      const response = await axios.post(API_URI + '/' + CATEGORIES_URL, data, {
        headers: {
          authorization: localStorage.token
        }
      })
      return {status: response.status, message: 'success'}
    } catch (e: any) {
      return {status: e.response.status, message: e.response.data}
    }
  }
  delete = async (id: number) => {
    try {
      const response = await axios.delete(API_URI + '/' + CATEGORIES_URL, {
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
      const response: any = await axios.put(API_URI + '/' + CATEGORIES_URL, data, {
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

export default CategoryRoutes