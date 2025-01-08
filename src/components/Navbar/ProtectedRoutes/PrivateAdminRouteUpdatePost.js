import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import UpdatePost from '../../Posts/Forms/UpdatePost'
const PrivateAdminRouteUpdatePost = () => 
  {
    const user = useSelector(state => state.users);
    const {userAuth} = user;
  return userAuth ? <UpdatePost/> : <Navigate to='/login'/>
  }


export default PrivateAdminRouteUpdatePost