import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';
import UpdateCategory from '../../Categories/UpdateCategory';

const AdminRouteUpdate = () => {
    const user = useSelector(state => state?.users);
    const {userAuth} = user;
  return (
        userAuth?.isAdmin ? <UpdateCategory/> : <Navigate to='/login'/>
  )
}

export default AdminRouteUpdate