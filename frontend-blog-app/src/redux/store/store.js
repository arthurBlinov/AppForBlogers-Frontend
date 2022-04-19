import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlices';
import categoriesReducer from '../slices/categories/categoriesSlices';
import postSlices from '../slices/posts/postSlices';
import comments from '../slices/comments/commentSlices';
import sendMailSlices from '../slices/sendEmail/sendEmailSlices';
import accVerificationSlices from '../slices/accountVerification/accVerificationSlices';

const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categoriesReducer,
        posts: postSlices,
        comments,
        sendMailSlices,
        accVerificationSlices
    }
})
export default store;