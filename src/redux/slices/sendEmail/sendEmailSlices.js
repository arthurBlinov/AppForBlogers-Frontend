import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//Custom action to reset the data for redirect
const resetEmailSentAction = createAction("emailSent/reset");

//Create
export const sendEmailAction = createAsyncThunk(
  "/send-email",
  async (data, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;

    const { userAuth } = user;
    console.log(userAuth, data.to, data?.subject, data?.message);
    
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      await axios.post(
        `${baseURL}/api/email/send-email`,
        {
          to: data.to,
          subject: data?.subject,
          message: data?.message,
        },
        config
      );
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      //Customise the default error handler
      return rejectWithValue(err?.response?.data);
    }
  }
);

//fetch single Comment
export const fetchCommentAction = createAsyncThunk(
  "fetch-emails",
  async (id, { rejectWithValue, getState }) => {
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseURL}/api/email`, config);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      //Customise the default error handler
      return rejectWithValue(err?.response?.data);
    }
  }
);

const sendMailSlices = createSlice({
  name: "email",
  initialState: {},
  extraReducers: builder => {
    // create
    builder.addCase(sendEmailAction?.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetEmailSentAction, (state, action) => {
      state.isEmailSent = true;
    });
    builder.addCase(sendEmailAction?.fulfilled, (state, action) => {
      state.mailSent = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isEmailSent = false;
    });
    builder.addCase(sendEmailAction?.rejected, (state, action) => {
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
      state.loading = false;
    });
  },
});

export default sendMailSlices.reducer;
