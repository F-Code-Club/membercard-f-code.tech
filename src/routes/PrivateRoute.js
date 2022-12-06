import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import LocalStorageUtils from '../utils/LocalStorageUtils'

export const PrivateRoute = () => {
  const user = LocalStorageUtils.getJWTUser()
  return user && user.id?.length >= 0 ? <Outlet /> : <Navigate to="/login" replace />
}
