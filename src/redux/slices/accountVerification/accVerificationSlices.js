import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";


//Create
export const accVerificationSendTokenAction = createAsyncThunk(
  "account/token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;

    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseURL}/api/users/generate-verify-email-token`,
        {
          to: email,
          from: 'blinov.arthur.2023@gmail.com',
          subject: 'verify email'
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


//verify account
export const verifyAccountAction = createAsyncThunk(
    "/account/verify/:token",
    async (tokens, { rejectWithValue, getState, dispatch }) => {
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      try {
        const { data } = await axios.put(
          `${baseURL}/api/users/verify-account/${tokens}`,
          { to: user?.email,
            from: 'blinov.arthur.2023@gmail.com',
            subject: 'verify email'
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

//slices 
const accVerificationSlices = createSlice({
    name: "account",
    initialState: {},
    extraReducers: builder => {
      // create
      builder.addCase(accVerificationSendTokenAction?.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(accVerificationSendTokenAction?.fulfilled, (state, action) => {
        state.tokenSent = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        
      });
      builder.addCase(accVerificationSendTokenAction?.rejected, (state, action) => {
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
        state.loading = false;
      });
      //verify
      builder.addCase(verifyAccountAction?.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(verifyAccountAction?.fulfilled, (state, action) => {
        state.verified = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        
      });
      builder.addCase(verifyAccountAction?.rejected, (state, action) => {
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
        state.loading = false;
      });
    },
  });
  
  export default accVerificationSlices.reducer;






