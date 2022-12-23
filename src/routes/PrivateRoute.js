import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import LocalStorageUtils from '../utils/LocalStorageUtils'

export const PrivateRoute = () => {
  const user = LocalStorageUtils.getJWTUser()
  const token = LocalStorageUtils.getToken()

  console.log(token)
  console.log(user)
  return user && user.sub?.length >= 0 ? <Outlet /> : <Navigate to="/auth" replace />
}
