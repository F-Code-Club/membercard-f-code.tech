import jwt_decode from 'jwt-decode'

import { LOCALSTORAGE_TOKEN_NAME, LOCALSTORAGE_USER_NAME } from '../config'
import { get } from './ApiCaller'

class LocalStorageUtils {
  getItem(key, defaultValue = '""') {
    if (typeof localStorage === 'undefined') {
      return undefined
    }
    let item = localStorage.getItem(key)
    if (item && item === 'undefined') {
      item = defaultValue
    }
    return JSON.parse(item)
  }

  setItem(key, value = '') {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  removeItem(key) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key)
    }
  }

  getJWTUser() {
    if (typeof localStorage !== 'undefined') {
      const token = this.getItem(LOCALSTORAGE_TOKEN_NAME)
      if (token) {
        try {
          const jwtUser = jwt_decode(token)
          return jwtUser
        } catch (err) {
          if (err.response && err.response.status === 401) {
            this.deleteUser()
          }
        }
      } else return token
    }
    return undefined
  }

  async getUser() {
    if (typeof localStorage !== 'undefined') {
      const token = this.getItem(LOCALSTORAGE_TOKEN_NAME)
      const user = this.getItem(LOCALSTORAGE_USER_NAME)
      if (user) {
        return user
      } else {
        if (token) {
          try {
            const { memberId } = jwt_decode(token)
            const fetchedUser = await get(`/api/user/${memberId}`, {}, { token: token }).then(
              (res) => {
                console.log(res.data.data)
              }
            )
            this.setItem(LOCALSTORAGE_USER_NAME, fetchedUser)
            return fetchedUser
          } catch (err) {
            if (err.response && err.response.status === 401) {
              this.deleteUser()
            }
          }
        } else return token
      }
    }
    return undefined
  }

  deleteUser() {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME)
    localStorage.removeItem(LOCALSTORAGE_USER_NAME)
  }

  getToken() {
    return this.getItem(LOCALSTORAGE_TOKEN_NAME)
  }

  clear() {
    localStorage.clear()
  }
}

export default new LocalStorageUtils()
