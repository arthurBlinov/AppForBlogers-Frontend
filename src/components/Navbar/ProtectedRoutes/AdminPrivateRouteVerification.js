import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import AccountVerified from '../../Users/Forms/AccountVerified'
const AdminPrivateRouteVerification = () => 
  {
    const user = useSelector(state => state.users);
    const {userAuth} = user;
    console.log(userAuth);
  return userAuth ? <AccountVerified/> : <Navigate to='/login'/>
  }


export default AdminPrivateRouteVerification;