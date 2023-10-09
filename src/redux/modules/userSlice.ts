import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Userstate } from "../../model/user";

type UserState = {
  userState: Userstate;
};

const initialState: UserState = {
  userState: { name: null, email: null, _id: null, userImgUrl: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, action: PayloadAction<Userstate>) => {
      state.userState = action.payload;
    },
    deleteInfo: (state, action) => {
      state.userState = {
        name: null,
        email: null,
        _id: null,
        userImgUrl: null,
      };
    },
  },
});

export default userSlice.reducer;
export const { userInfo, deleteInfo } = userSlice.actions;
