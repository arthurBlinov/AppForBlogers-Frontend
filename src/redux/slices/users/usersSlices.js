import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from '../../../utils/baseURL';

//register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//for redirect
const resetUserAction = createAction('users/profile/reset');
const resetUserPasswordAction = createAction('users/password/update');
const resetDeleteUserAction = createAction('/users/reset/delete')
//update
export const updateUserProfileAction = createAsyncThunk(
  "/user/update-profile/:id",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      
      const { data } = await axios.put(
        `${baseUrl}/api/users/update-profile/${userData?._id}`,
        userData,
        config
      );
      //dispatch
      dispatch(resetUserAction());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//update password action
export const updateUserPasswordAction = createAsyncThunk(
  "password/update",
  async (passwordsData, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      
      const { data } = await axios.put(
        `${baseUrl}/api/users/password/password`,
        passwordsData,
        config
      );
      console.log(data);
      
      //dispatch
      dispatch(resetUserPasswordAction());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Login
export const loginUserAction = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue, }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userData, config
      );
      //save user into local storage
       localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//profile
export const userProfileAction = createAsyncThunk(
  "user/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/users/profile/${id}`,
    
        config
      );
      
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
)
//delete user
export const deleteUserAction = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/users/delete/${id}`,
    
        config
      );
      
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
)
export const viewedProfile = createAsyncThunk(
  'user/view', 
  async(viewedId, {rejectWithValue, getState, dispatch}) => {
    const user = getState()?.users;
    const {userAuth} = user;
    
    const config ={
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      }
    }
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/viewed`,
         {id: viewedId},
      
        config
      );
      
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  })
//follow
export const followUserAction = createAsyncThunk(
  "user/follow",
  async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
      
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/following`,
       {followId: userToFollowId},
        config
      );
      
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
)
//logout action 
export const logoutAction = createAsyncThunk(
    'user/logout', async (payload, {rejectWithValue, getState, dispatch}) => {
      try {
       localStorage.removeItem('userInfo');
      } catch (error) {
        if(!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
)
//upload photo
export const uploadProfileAction = createAsyncThunk(
  "user/profile-photo",
  async (imgData, { rejectWithValue, getState, dispatch }) => {
    
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      let formData = new FormData();
         formData.append("image", imgData?.image);
      
      const { data } = await axios.put(
        `${baseUrl}/api/users/upload-profile-photo/${imgData._id}`,
        formData,
        config
      );
      //dispatch action
      //dispatch(resetPost());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//fetch user details
export const fetchUserDetailsAction = createAsyncThunk(
  'user/details',
  async(id, {rejectWithValue, getState, dispatch}) => {
    try {
      const {data} = await axios.get(`${baseUrl}/api/users/${id}`)
      return data;
    } catch (error) {
      if(!error.response) throw error;
      return rejectWithValue(error?.response?.data)
    }
  }
)
//fetch all users
export const fetchUsersAction = createAsyncThunk(
  'user/list',
  async(list, {rejectWithValue, getState, dispatch}) => {
    
    //get user token
    const user = getState()?.users;
    const {userAuth} = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    }
    try {
      const {data} = await axios.get(`${baseUrl}/api/users/users/all`, config);
     
      return data;
    } catch (error) {
      console.log('hello');
      if(!error.response) throw error;
      return rejectWithValue(error?.response?.data)
    }
  }
)
//block user action
export const blockUserAction = createAsyncThunk(
  'user/block',
  async(id, {rejectWithValue, getState, dispatch}) => {
    //get user token
    const user = getState()?.users;
    const {userAuth} = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    }
    try {
      const {data} = await axios.put(`${baseUrl}/api/users/block-user/${id}`, {}, config);
     
      return data;
    } catch (error) {
      if(!error.response) throw error;
      return rejectWithValue(error?.response?.data)
    }
  }
)

//unblock user action
export const unBlockUserAction = createAsyncThunk(
  'user/unblock',
  async(id, {rejectWithValue, getState, dispatch}) => {
    
    //get user token
    const user = getState()?.users;
    const {userAuth} = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    }
    try {
      const {data} = await axios.put(`${baseUrl}/api/users/unblock-user/${id}`, {}, config);
     
      return data;
    } catch (error) {
      if(!error.response) throw error;
      return rejectWithValue(error?.response?.data)
    }
  }
)

//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

 


//slices
const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: builder => {
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //profile
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });

    //logout 
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = false;
    
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //upload-photo
    builder.addCase(uploadProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(uploadProfileAction.fulfilled, (state, action) => {
      state.profilePhoto = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(uploadProfileAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
     //update user profile
     builder.addCase(updateUserProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetUserAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateUserProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.updated = action?.payload;
      state.isUpdated = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateUserProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //update password
    builder.addCase(updateUserPasswordAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetUserPasswordAction, (state, action) => {
      state.isPassUpdated = true;
    });
    builder.addCase(updateUserPasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordUpdated = action?.payload;
      state.isUpdated = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateUserPasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //delete action
    
    builder.addCase(deleteUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetDeleteUserAction, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.deleted = action?.payload;
      state.isDeleted = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch details
    builder.addCase(fetchUserDetailsAction.pending, (state,action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch all users
    builder.addCase(fetchUsersAction.pending, (state,action) => {
      state.loading = true;
     
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.usersList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });
    //user follow
    builder.addCase(followUserAction.pending, (state,action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.followed = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(followUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    
    builder.addCase(viewedProfile.pending, (state,action) => {
      state.loading = true;
     
    });
    builder.addCase(viewedProfile.fulfilled, (state, action) => {
      state.viewed = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(viewedProfile.rejected, (state, action) => {
      state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });
    //block user
    builder.addCase(blockUserAction.pending, (state,action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.block = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //unblock user
    builder.addCase(unBlockUserAction.pending, (state,action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unBlockUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.unblock = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unBlockUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default usersSlices.reducer;
