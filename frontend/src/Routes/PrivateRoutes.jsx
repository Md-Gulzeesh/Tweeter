import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const isAuth = useSelector(store=>store.isAuth);
    console.log(isAuth)
  if (!isAuth) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default PrivateRoutes