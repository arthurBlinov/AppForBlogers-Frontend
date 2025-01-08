import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import CreatePost from '../../Posts/Forms/CreatePost';

const PrivateAdminRouteCreate = () => {
    const user = useSelector(state => state.users);
    const {userAuth} = user;
  return userAuth ? <CreatePost/> : <Navigate to='/login'/>;
}

export default PrivateAdminRouteCreate;