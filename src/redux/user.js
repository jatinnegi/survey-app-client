import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    userType: "",
  },
  reducers: {
    fetchUser: (state, action) => {
      const { payload } = action;

      state.userId = payload.userId;
      state.userType = payload.userType;
    },
  },
});

export default slice.reducer;
export const { fetchUser } = slice.actions;
