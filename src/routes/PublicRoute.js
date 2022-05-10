import React from "react";

import { Outlet, Navigate } from "react-router-dom";

import LocalStorageUtils from "./../utils/LocalStorageUtils";

export const PublicRoute = (props) => {
  const user = LocalStorageUtils.getUser();
  console.log(user);
  return !user || user.username?.length <= 0 ? <Outlet /> : <Navigate to="/" />;
};
