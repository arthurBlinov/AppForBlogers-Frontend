import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { logoutAction, updateUserPasswordAction } from "../../../redux/slices/users/usersSlices";

const formSchema = Yup.object({
  oldPassword: Yup.string().required('Old password is required'),
  newPassword: Yup.string().required('New password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirming the new password is required'),
});

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state?.users);
  const { isPassUpdated, appErr, serverErr, userAuth } = user;

  // Formik setup
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: values => {
      // Dispatch the action
      dispatch(updateUserPasswordAction(values));
    },
    validationSchema: formSchema,
  });

  // Redirect on success
  if (isPassUpdated) {
    dispatch(logoutAction());
    navigate(`/`);
  }

  return (
    <div className="min-h-screen bg-gray-700  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Change your password
        </h2>
        <h3 className="text-center pt-2">
          {serverErr || appErr ? <p>{serverErr} {appErr}</p> : null}
        </h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik?.handleSubmit}>
            {/* Old Password */}
            <div className="flex items-center pl-6 mb-6 border border-gray-50 bg-white rounded-full">
              <span className="inline-block pr-3 border-r border-gray-50">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">
                  <path d="M15.6243..." fill="black" />
                </svg>
              </span>
              <input
                value={formik?.values?.oldPassword}
                onChange={formik.handleChange("oldPassword")}
                onBlur={formik.handleBlur("oldPassword")}
                className="w-full border-gray-300 border-2 pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                type="password"
                placeholder="Old Password"
              />
            </div>
            <div className="text-red-400 mb-2">
              {formik?.touched?.oldPassword && formik?.errors?.oldPassword}
            </div>

            {/* New Password */}
            <div className="flex items-center pl-6 mb-6 border border-gray-50 bg-white rounded-full">
              <span className="inline-block pr-3 border-r border-gray-50">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">
                  <path d="M15.6243..." fill="black" />
                </svg>
              </span>
              <input
                value={formik?.values?.newPassword}
                onChange={formik.handleChange("newPassword")}
                onBlur={formik.handleBlur("newPassword")}
                className="w-full border-gray-300 border-2 pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                type="password"
                placeholder="New Password"
              />
            </div>
            <div className="text-red-400 mb-2">
              {formik?.touched?.newPassword && formik?.errors?.newPassword}
            </div>

            {/* Confirm New Password */}
            <div className="flex items-center pl-6 mb-6 border border-gray-50 bg-white rounded-full">
              <span className="inline-block pr-3 border-r border-gray-50">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">
                  <path d="M15.6243..." fill="black" />
                </svg>
              </span>
              <input
                value={formik?.values?.confirmNewPassword}
                onChange={formik.handleChange("confirmNewPassword")}
                onBlur={formik.handleBlur("confirmNewPassword")}
                className="w-full border-gray-300 border-2 pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                type="password"
                placeholder="Confirm New Password"
              />
            </div>
            <div className="text-red-400 mb-2">
              {formik?.touched?.confirmNewPassword && formik?.errors?.confirmNewPassword}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="inline-flex bg-indigo-700 justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-200  hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
