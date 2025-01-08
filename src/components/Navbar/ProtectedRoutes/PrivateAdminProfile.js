import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import Profile from '../../../components/Users/Profile/Profile'
const PrivateAdminProfile = () => 
  {
    const user = useSelector(state => state.users);
    const {userAuth} = user;
  return userAuth ? <Profile/> : <Navigate to='/login'/>
  }


export default PrivateAdminProfile