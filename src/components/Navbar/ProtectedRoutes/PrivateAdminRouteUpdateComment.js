import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import UpdateComment from '../../Comments/UpdateComment'
const PrivateAdminRouteUpdateComment = () => 
  {
    const user = useSelector(state => state.users);
    const {userAuth} = user;
        return userAuth ? <UpdateComment/> : <Navigate to='/login'/>
  }


export default PrivateAdminRouteUpdateComment