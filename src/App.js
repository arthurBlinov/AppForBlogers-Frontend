import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import PostDetails from "./components/Posts/PostDetails";
import PostsList from "./components/Posts/PostsList";
import AccountVerified from "./components/Users/Forms/AccountVerified";
import Login from "./components/Users/Forms/Login";
import Register from "./components/Users/Forms/Register";
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

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
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
        <Route
          exact
          path="/update-category/:id"
          element={<AdminRouteUpdate/>}
        />
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path='/password/password' element={<AdminPrivateRouteUpdatePass/>}/>
        <Route exact path='/users/all' element={<AdminPrivateAuthors/>}/>
        <Route exact path='/send-email' element={<AdminPrivateSendEmail/>}/>
        <Route exact path='/update-profile/:id' element={<AdminPrivateRouteUpdate/>}/>
        <Route exact path='/upload-profile-photo/:id' element={<AdminPrivateRoutePhoto/>}/>
       <Route exact path='/profile/:id' element={<PrivateAdminProfile/>}/>
       <Route exact path="/update-comment/:id" element={<PrivateAdminRouteUpdateComment/>}/>
       <Route exact path="/posts" element={<PostsList/>} />
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
