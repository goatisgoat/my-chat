import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = {
  userState: {
    name: string | null;
    email: string | null;
    _id: string | null;
  };
};

const initialState: UserState = {
  userState: { name: null, email: null, _id: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (
      state,
      action: PayloadAction<{ name: string; email: string; _id: string }>
    ) => {
      state.userState = action.payload;
    },
    deleteInfo: (state, action) => {
      state.userState = { name: null, email: null, _id: null };
    },
  },
});

export default userSlice.reducer;
export const { userInfo, deleteInfo } = userSlice.actions;
