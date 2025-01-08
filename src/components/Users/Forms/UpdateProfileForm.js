import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { deleteUserAction, fetchUserDetailsAction, updateUserProfileAction } from "../../../redux/slices/users/usersSlices";


const formSchema = Yup.object({
  firstName: Yup.string().required('firstName is required'),
  lastName: Yup.string().required('last Name is required'),
  email: Yup.string().required('Email is required'),
})
const UpdateProfileForm = () => {
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const user = useSelector(state => state?.users);
  const {userDetails, loading, appErr, serverErr, isDeleted} = user;
  
  useEffect(() => {
    dispatch(fetchUserDetailsAction(id));
  }, [dispatch, id])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      email: userDetails?.email,
    },
    onSubmit: values => {
      const data = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.email,
      }

      dispatch(updateUserProfileAction(data))
      setUpdated(true);
    },
    validationSchema: formSchema
  })
  if(updated)
   {
    setUpdated(false);
    return navigate(`/profile/${id}`)
   }
   if(isDeleted) return <Navigate to='/'/>
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h3 className="mt-6 text-center text-2xl font-extrabold text-gray-300">
        <span className="text-green-300">{userDetails?.firstName} {userDetails?.lastName}</span> do you want to update your profile?
        </h3>
        {/* Err */}
        {serverErr || appErr ? <h2 className="text-red-300 text-center">{serverErr} {appErr}</h2> : null}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik?.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1">
                {/* First name */}
                <textarea
                  value={formik?.values?.firstName}
                  onBlur={formik?.handleBlur('firstName')}
                  onChange={formik?.handleChange('firstName')}
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="text-red-500">
                {formik.touched.firstName && formik.errors.firstName}
              
              </div>
            </div>
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1">
                {/* Last Name */}
                <textarea
                value={formik?.values?.lastName}
                onBlur={formik?.handleBlur('lastName')}
                onChange={formik?.handleChange('lastName')}
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.lastName && formik.errors.lastName}
                
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                {/* Email */}
                <textarea
                  value={formik?.values?.email}
                  onBlur={formik?.handleBlur('email')}
                  onChange={formik?.handleChange('email')}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.email && formik.errors.email}
            </div>
            </div>
            
            <div>
              {/* submit btn */}
             {loading ? (
                <button
                disabled
                className="w-full flex justify-center 
                py-2 px-4 border border-transparent 
                rounded-md shadow-sm text-sm font-medium 
                text-white bg-gray-600 
                "
              >
                Loading...
              </button>
             ) : (
              <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
             )}
              <button
              onClick={() => dispatch(deleteUserAction(id))}
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 mt-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
             Delete Account
            </button>
            </div>
          </form>

          <div className="mt-4 mb-3">
            <div className="relative">
              <div className="flex flex-col justify-center items-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
