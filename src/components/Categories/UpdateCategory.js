import { PlusCircle, BookOpen } from "@styled-icons/heroicons-outline";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryAction,
  fetchCategoriesAction,
  updateCategoriesAction,
  deleteCategoriesAction,
} from "../../redux/slices/categories/categoriesSlices";
import { useNavigate, useParams } from "react-router";

//Form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

const UpdateCategory = () => {
   //get data from store
  const state = useSelector(state => state?.category);
  const { loading, appErr, serverErr, category, isEdited, isDeleted } = state;
  const dispatch = useDispatch();
  const {id} = useParams();
  const [isUpdated,setUpdated] = useState(false);
  const navigate = useNavigate();

  //fetch single category
  useEffect(() => {
    dispatch(fetchCategoryAction(id));
  }, []);
  const deleteCategory = () => {
    dispatch(deleteCategoriesAction(category?._id)).then(() => {
      // Refresh the category list after deletion
      dispatch(fetchCategoryAction());
      navigate("/category-list");
    });
  };
  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: category?.title,
    },
    onSubmit: values => {
      dispatch(updateCategoriesAction({ title: values.title, id})).then(() => {
        dispatch(fetchCategoriesAction());
        navigate("/category-list");
      });
      setUpdated(true);
    },
    validationSchema: formSchema,
  });
  useEffect(() => {
      if(isUpdated){
        setUpdated(false);
        navigate('/category-list');
      }
  }, [isUpdated])
//redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpen className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Category
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              These are the categories user will select when creating a post
            </p>
            {/* Display err */}
            <div>
              {appErr || serverErr ? (
                <h2 className="text-red-500 text-center text-lg">
                  {serverErr} {appErr}
                </h2>
              ) : null}
            </div>
          </p>
        </div>
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
              />
              <div className="text-red-400 mb-2">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                <button
                  disabled
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 "
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircle
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Loading please wait...
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PlusCircle
                        className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Update Category
                  </button>
                  <button
                    onClick={deleteCategory}
                    type="submit"
                    className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Delete Category
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
