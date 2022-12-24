import Buffer from 'buffer'
import jwt_decode from 'jwt-decode'

import {
  LOCALSTORAGE_AVATAR_NAME,
  LOCALSTORAGE_JWT_USER_NAME,
  LOCALSTORAGE_TOKEN_NAME,
  LOCALSTORAGE_USER_NAME,
} from '../config'
import Profile from './../asset/image/Avatar.png'

// import { get } from './ApiCaller'

const convertAvatar = (avatar) => {
  if (!avatar || avatar.length === 0) {
    return Profile
  }
  try {
    let buffer = Buffer.Buffer
    let result = buffer.from(avatar || []).toString('base64')
    return `data:image/png;base64,${result}`
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

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
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
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

  // async getUser() {
  //   if (typeof localStorage !== 'undefined') {
  //     const token = this.getItem(LOCALSTORAGE_TOKEN_NAME)
  //     const user = this.getItem(LOCALSTORAGE_USER_NAME)
  //     const avatar = this.getItem(LOCALSTORAGE_AVATAR_NAME)
  //     if (user && avatar) {
  //       return { user: user, avatar: avatar }
  //     } else {
  //       if (token) {
  //         try {
  //           const { memberId } = jwt_decode(token)

  //           const fetchedUser = await get(`/api/user/${memberId}`, {}, { token: token }).then(
  //             (res) => res.data.data
  //           )

  //           const simplifiedUser = {
  //             id: fetchedUser.id,
  //             member_id: fetchedUser.member_id,
  //             last_name: fetchedUser.last_name,
  //             first_name: fetchedUser.first_name,
  //             school_email: fetchedUser.school_email,
  //           }
  //           const simplifiedAvatar = convertAvatar(fetchedUser.avartar)

  //           this.setItem(LOCALSTORAGE_AVATAR_NAME, simplifiedAvatar)
  //           this.setItem(LOCALSTORAGE_USER_NAME, simplifiedUser)

  //           return { user: simplifiedUser, avatar: simplifiedAvatar }
  //         } catch (err) {
  //           // eslint-disable-next-line no-console
  //           console.log(err)
  //           if (err.response && err.response.status === 401) {
  //             this.deleteUser()
  //           }
  //         }
  //       } else {
  //         return token
  //       }
  //     }
  //   }
  //   return undefined
  // }

  deleteUser() {
    localStorage.removeItem(LOCALSTORAGE_AVATAR_NAME)
    localStorage.removeItem(LOCALSTORAGE_USER_NAME)
    localStorage.removeItem(LOCALSTORAGE_JWT_USER_NAME)
    localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME)
  }

  getToken() {
    return this.getItem(LOCALSTORAGE_TOKEN_NAME)
  }

  clear() {
    localStorage.clear()
  }
}

export default new LocalStorageUtils()
