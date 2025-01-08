import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import CategoryList from '../../Categories/CategoryList'

const AdminRouteCategoryList = () => {
  const user = useSelector(state => state.users);
  const {userAuth} = user;
  return (
    
        userAuth?.isAdmin ? <CategoryList/> : <Navigate to='/login'/>
   
  )
}

export default AdminRouteCategoryList