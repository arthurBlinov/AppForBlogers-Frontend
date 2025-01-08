import React from "react";
import { useSelector } from "react-redux";
import AccountVerificationAlertWarning from "../Alerts/AccountVerificationAlert/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "../Alerts/AccountVerificationSuccessAlert";
import AdminNavbar from "../Navbar/AdminNavbar/AdminNavbar";
import PrivateNavbar from "../Navbar/PrivateNavbar/PrivateNavbar";
import PublicNavbar from "../Navbar/PubicNavbar/PublicNavbar";

const Navbar = () => {
  const state = useSelector(state => state?.users);
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;
  
  //account verification
  const account = useSelector(state => state?.accVerificationSlices)
  const { tokenSent } = account;


  return (
   <div>
      {isAdmin ? (<AdminNavbar isLogin={userAuth}/>) : userAuth ? (<PrivateNavbar isLogin={userAuth}/>) : (<PublicNavbar/>)}
      {(!userAuth?.isVerified && userAuth && !tokenSent) ? <AccountVerificationAlertWarning email={userAuth?.email}/> : tokenSent && <AccountVerificationSuccessAlert/>}
      
  
   
   </div>
  );
};

export default Navbar;
