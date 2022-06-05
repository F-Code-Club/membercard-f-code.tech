import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { get } from '../utils/ApiCaller'
import LocalStorageUtils from '../utils/LocalStorageUtils'

export const PrivateRoute = () => {
  const user = LocalStorageUtils.getUser()
  if (user && user.id?.length >= 0) {
    get('/api/user/' + user.id, {}, { token: LocalStorageUtils.getToken() })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
  return user && user.id?.length >= 0 ? <Outlet /> : <Navigate to="/login" replace />
}
