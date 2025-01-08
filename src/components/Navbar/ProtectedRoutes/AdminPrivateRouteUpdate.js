import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'
import UpdateProfileForm from '../../Users/Forms/UpdateProfileForm'

const AdminPrivateRouteUpdate = () => 
  {
    const user = useSelector(state => state.users);
    const {userAuth} = user;
    return userAuth ? <UpdateProfileForm/> : <Navigate to='/login'/>;
  }


export default AdminPrivateRouteUpdate