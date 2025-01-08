import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import UsersList from '../../Users/UsersList'


const AdminPrivateAuthors = () => 
  {
    const user = useSelector(state => state.users);
    const {userAuth} = user;
  return userAuth ? <UsersList/> : <Navigate to='/login'/>
  }


export default AdminPrivateAuthors