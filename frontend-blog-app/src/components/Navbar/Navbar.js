import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutAction } from "../../redux/slices/users/usersSlices";
import AccountVerificationAlertWarning from "../Alerts/AccountVerificationAlert/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "../Alerts/AccountVerificationSuccessAlert";
import LoadingComponent from "../Loading/LoadingComponent";
import AdminNavbar from "../Navbar/AdminNavbar/AdminNavbar";
import PrivateNavbar from "../Navbar/PrivateNavbar/PrivateNavbar";
import PublicNavbar from "../Navbar/PubicNavbar/PublicNavbar";

const Navbar = () => {
  const dispatch = useDispatch()
;  //get user from store
  const state = useSelector(state => state?.users);
  const {userAuth, profile} = state;
  console.log(profile);
  const isAdmin = userAuth?.isAdmin;
  //const isClicked = document.getElementById('isClicked')
  // isClicked.addEventListener('click', () => 
  // <AccountVerificationSuccessAlert/>);
  
  //
  //account verification
  const account = useSelector(state => state?.accVerificationSlices)
  const {loading, appErr, serverErr,tokenSent, verified} = account;
  console.log(tokenSent);
  //const {loading, appErr, serverErr, token} = account;
  return (
   <div>
      {isAdmin ? (<AdminNavbar isLogin={userAuth}/>) : userAuth ? (<PrivateNavbar isLogin={userAuth}/>) : (<PublicNavbar/>)}
      {(!userAuth?.isVerified && userAuth && !tokenSent) ? <AccountVerificationAlertWarning email={userAuth?.email}/> : tokenSent && <AccountVerificationSuccessAlert/>}
      
  
   
   </div>
  );
};

export default Navbar;
