import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

import { API_URI } from "../utils/consts";

interface userData {
  login: string,
  role: string
}

class AuthRouter {
  updateToken = (token: string) => {
    localStorage.setItem("token", "Bearer " + token)
  }

  getUserData = (token: string) => {
    const data: userData = jwtDecode(token)
    return data
  }

  login = async (userData: object) => {
    try {
      const url = API_URI + '/auth/login'
      const res: any = await axios.post(url, userData)
      return res
    } catch (e: any) {
      return e.response
    }
  }
  check = async () => {
    try {
      const token = localStorage.token
      const url = API_URI + "/auth/check"
      const {data} = await axios.get(url, {
        headers: {
          authorization: token
        }
      })
      this.updateToken(data.token)
      return true
    } catch (e: any) {
      return false
    }
  }
}

export default AuthRouter