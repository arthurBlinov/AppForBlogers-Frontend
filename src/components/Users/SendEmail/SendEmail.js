import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { sendEmailAction } from "../../../redux/slices/sendEmail/sendEmailSlices";

//Form schema
const formSchema = Yup.object({
  to: Yup.string().required('Recipients Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
  
});
const SendEmail = () => {
  //dispatch
  const dispatch = useDispatch();
  const user = useSelector(state => state?.users)
  const { loading } = user;
  const navigate = useNavigate();
  
  useEffect(() => {
      sendEmailAction(user?.profile?.email);
  }, [dispatch, user?.profile?.email])
  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      to: user?.profile?.email,
      subject: "",
      message: "",
      
    },
    onSubmit: (values) => {
      const data = {
        to: user?.profile?.email,
        subject: values?.subject,
        message: values?.message
      }
    dispatch(sendEmailAction(data));
    navigate(`/profile/${user?.profile?._id}`)
    },
    
    validationSchema: formSchema,
  });
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Send Mesage
          {/* Email title */}
          <span className="text-green-300">email title</span>
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          {/* Display err here */}
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          {/* {emailSent && <div>Sent</div>} */}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik?.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Recipient Email
              </label>
              {/* Recipient Email */}
              <div className="mt-1">
                <input
                value={formik?.values?.to}
                onChange={formik?.handleChange('to')}
                onBlur={formik?.handleBlur('to')}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* Err msg */}
              <div className="text-red-500">
                {formik?.touched?.to && formik?.errors?.to}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <div className="mt-1">
                {/* Subject */}
                <input
                 value={formik?.values?.subject}
                 onChange={formik?.handleChange('subject')}
                 onBlur={formik?.handleBlur('subject')}
                  id="subject"
                  name="subject"
                  type="text"
                  autoComplete="subject"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.subject && formik.errors.subject}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              {/* email message */}
              <textarea
               value={formik?.values?.message}
               onChange={formik?.handleChange('message')}
               onBlur={formik?.handleBlur('message')}
                rows="5"
                cols="10"
                className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                type="text"
              ></textarea>
              {/* err here */}
              <div className="text-red-500">
                {formik.touched.message && formik.errors.message}
              </div>
            </div>
            {/* Submit btn */}
            <div>
             {loading ?  <button
                disabled
                className="w-full flex justify-center 
                py-2 px-4 border border-transparent 
                rounded-md shadow-sm text-sm font-medium 
                text-white bg-gray-600"
              >
                Loading
              </button> :  <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SendEmail;