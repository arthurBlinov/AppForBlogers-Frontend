import { PlusCircle, BookOpen } from "@styled-icons/heroicons-outline";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction, fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlices";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  
});

const AddNewCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //get data from store
  const state = useSelector(state => state?.category);
  const {loading, appErr, serverErr, isCreated} = state;
  //formik
  const formik = useFormik({
    initialValues: {
     title: ''
    },
    onSubmit: values => {
      //dispath the action
      dispatch(createCategoryAction(values)).then(() => {
            // Refresh the category list after deletion
            dispatch(fetchCategoriesAction());
            navigate("/category-list");
          });;
    },
    validationSchema: formSchema,
  })
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpen className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Category
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              These are the categories user will select when creating a post
            </p>
        {/* Display Error */}
        <div>
          {appErr || serverErr ? <h2 className="text-red-500 text-center text-lg">{serverErr} {appErr}</h2> : null}
        </div>
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
                onChange={formik.handleChange('title')}
                onBlur={formik.handleBlur('title')}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
              />
            </div>
          </div>
          <div>
            <div>
              {/* Submit */}
              {loading ?  <button
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
              </button> : <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <PlusCircle
                    className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Add new Category
              </button>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
