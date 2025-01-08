import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountVerificationAlertWarning from "./components/Alerts/AccountVerificationAlert/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "./components/Alerts/AccountVerificationSuccessAlert";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import UpdateComment from "./components/Comments/UpdateComment";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import CreatePost from "./components/Posts/Forms/CreatePost";
import UpdatePost from "./components/Posts/Forms/UpdatePost";
import PostDetails from "./components/Posts/PostDetails";
import PostsList from "./components/Posts/PostsList";
import SendEmail from "./components/Users/SendEmail/SendEmail";
import BlockUser from "./components/Users/BlockUser";
import AccountVerified from "./components/Users/Forms/AccountVerified";
import Login from "./components/Users/Forms/Login";
import Register from "./components/Users/Forms/Register";
import UpdatePassword from "./components/Users/Forms/UpdatePassword";
import UpdateProfileForm from "./components/Users/Forms/UpdateProfileForm";
import UploadProfilePhoto from "./components/Users/Forms/UploadProfilePhoto";
import Profile from "./components/Users/Profile/Profile";
import UsersList from "./components/Users/UsersList";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminPrivateRoute from "./components/PrivateRoute/AdminPrivateRoute";
import AdminRouteAddCategory from '../src/components/Navbar/ProtectedRoutes/AdminRouteAddCategory'
import AdminRouteCategoryList from '../src/components/Navbar/ProtectedRoutes/AdminRouteCategoryList';
import AdminRouteUpdate from '../src/components/Navbar/ProtectedRoutes/AdminRouteUpdate';
import PrivateAdminRouteCreate from "./components/Navbar/ProtectedRoutes/PrivateAdminRouteCreate.js";
import PrivateAdminRouteUpdatePost from "./components/Navbar/ProtectedRoutes/PrivateAdminRouteUpdatePost";
import PrivateAdminRouteUpdateComment from "./components/Navbar/ProtectedRoutes/PrivateAdminRouteUpdateComment";
import PrivateAdminProfile from "./components/Navbar/ProtectedRoutes/PrivateAdminProfile";
import AdminPrivateRoutePhoto from "./components/Navbar/ProtectedRoutes/AdminPrivateRoutePhoto";
import AdminPrivateRouteUpdate from "./components/Navbar/ProtectedRoutes/AdminPrivateRouteUpdate";
import AdminPrivateSendEmail from "./components/Navbar/ProtectedRoutes/AdminPrivateSendEmail";
import AdminPrivateRouteVerification from "./components/Navbar/ProtectedRoutes/AdminPrivateRouteVerification";
import AdminPrivateAuthors from "./components/Navbar/ProtectedRoutes/AdminPrivateAuthors";
import AdminPrivateRouteUpdatePass from '../src/components/Navbar/ProtectedRoutes/AdminPrivateRouteUpdatePass';
//import CreatePost from "./components/Posts/Forms/CreatePost";
const App = () => {
  // const user = useSelector((state) => state?.user);
  // const { userAuth, verificationToken } = user;
  return (
    <BrowserRouter>
      <Navbar />
      {/* {userAuth && !userAuth.isAccountVerified && (
        <AccountVerificationAlertWarning />
      )}
      {verificationToken && <AccountVerificationSuccessAlert />} */}
      <Routes>
        {/* <PrivateRoute exact path="/send-mail/" component={SendEmail} />
        <PrivateRoute
          exact
          path="/update-comment/:id"
          component={UpdateComment}
        /> */}
        {/* <PrivateRoute
          exact
          path="/verify-account/:token"
          component={AccountVerified}
        />
        <AdminPrivateRoute exact path="/block-user/:id" component={BlockUser} />
        <PrivateRoute
          exact
          path="/update-password"
          component={UpdatePassword}
        /> */}
        <Route
          exact
          path="/account/verify/:token"
          element={<AccountVerified/>}
        />
        <Route 
        
          exact
          path="/add-category"
          element={<AdminRouteAddCategory/>}
        />
        <Route exact path='/verify-account/:token' element={<AdminPrivateRouteVerification/>}/>
        <Route
          exact
          path="/category-list"
          element={<AdminRouteCategoryList/>}
        />
        {/* <PrivateRoute
          exact
          path="/update-profile"
          component={UpdateProfileForm}
        /> */}
        <Route
          exact
          path="/update-category/:id"
          element={<AdminRouteUpdate/>}
        />
        {/* <PrivateRoute exact path="/profile/:id" component={Profile} /> */}
        <Route exact path="/" element={<HomePage/>} />
        {/* <PrivateRoute
          exact
          path="/upload-profile-photo/:id"
          component={UploadProfilePhoto}
        /> */}
        <Route exact path='/password/password' element={<AdminPrivateRouteUpdatePass/>}/>
        <Route exact path='/users/all' element={<AdminPrivateAuthors/>}/>
        <Route exact path='/send-email' element={<AdminPrivateSendEmail/>}/>
        <Route exact path='/update-profile/:id' element={<AdminPrivateRouteUpdate/>}/>
        <Route exact path='/upload-profile-photo/:id' element={<AdminPrivateRoutePhoto/>}/>
       <Route exact path='/profile/:id' element={<PrivateAdminProfile/>}/>
       <Route exact path="/update-comment/:id" element={<PrivateAdminRouteUpdateComment/>}/>
       <Route exact path="/posts" element={<PostsList/>} />
        {/* <AdminPrivateRoute exact path="/users" component={UsersList} /> */}
        <Route exact path="/postdetails/:id" element={<PostDetails/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/create-post" element={<PrivateAdminRouteCreate/>} />
        <Route exact path="/update-post/:id" element={<PrivateAdminRouteUpdatePost/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
