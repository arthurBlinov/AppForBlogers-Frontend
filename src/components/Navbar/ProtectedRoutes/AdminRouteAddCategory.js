import React from 'react'
import { useSelector } from 'react-redux';
import {Route, Navigate} from 'react-router-dom';
import AddNewCategory from '../../Categories/AddNewCategory';




const PrivateProtectedRoute = () => {
    const user = useSelector(state=> state?.users);
    const {userAuth} = user;
    return (
    userAuth?.isAdmin ? <AddNewCategory/>:<Navigate to='/login'/> 
  )
}

export default PrivateProtectedRoute