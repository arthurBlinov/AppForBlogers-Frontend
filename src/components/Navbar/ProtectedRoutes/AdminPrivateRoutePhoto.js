import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import UpdateProfilePhoto from '../../Users/Forms/UploadProfilePhoto'
const AdminPrivateRoutePhoto = () => 
  {
    const user = useSelector(state => state.users);
    const {userAuth} = user;
  return userAuth ? <UpdateProfilePhoto/> : <Navigate to='/login'/>
  }


export default AdminPrivateRoutePhoto