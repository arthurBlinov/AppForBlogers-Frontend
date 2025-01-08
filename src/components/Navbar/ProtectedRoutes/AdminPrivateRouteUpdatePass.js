import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import UpdatePassword from '../../Users/Forms/UpdatePassword'



const AdminPrivateAuthors = () => 
  {
    const user = useSelector(state => state.users);
    const {userAuth} = user;
  return userAuth ? <UpdatePassword/> : <Navigate to='/login'/>
  }


export default AdminPrivateAuthors