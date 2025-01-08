import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import SendEmail from '../../Users/SendEmail/SendEmail'
const AdminPrivateSendEmail = () => 
  {
    const user = useSelector(state => state?.users);
    const {userAuth, profile} = user;
    console.log(profile);
  return userAuth?.isAdmin ? <SendEmail/> : <Navigate to='/login'/>
  }


export default AdminPrivateSendEmail;