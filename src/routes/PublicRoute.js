import React from 'react'

import { Outlet, Navigate } from 'react-router-dom'

import LocalStorageUtils from './../utils/LocalStorageUtils'

export const PublicRoute = () => {
  const user = LocalStorageUtils.getJWTUser()
  return !user || user.id?.length <= 0 ? <Outlet /> : <Navigate to="/" replace />
}
