import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { SocketIdUserId, SocketState } from "../../model/socket";
import { RealTimeMsg } from "../../model/messageType";

const initialState: SocketState = {
  socketState: {},
  isSocket: false,
  realTimeMsg: null,
  realTimeUser: null,
  newConversationFriend: "",
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    socketInfo: (state, action: PayloadAction<Socket>) => {
      state.socketState = action.payload;
    },
    isSocketFc: (state, action: PayloadAction<boolean>) => {
      state.isSocket = action.payload;
    },
    realTimeMsgFc: (state, action: PayloadAction<RealTimeMsg>) => {
      state.realTimeMsg = action.payload;
    },
    realTimeUserFc: (state, action: PayloadAction<SocketIdUserId[]>) => {
      state.realTimeUser = action.payload;
    },
    newConversationFc: (state, action: PayloadAction<string>) => {
      state.newConversationFriend = action.payload;
    },
  },
});

export default socketSlice.reducer;
export const {
  socketInfo,
  isSocketFc,
  realTimeMsgFc,
  realTimeUserFc,
  newConversationFc,
} = socketSlice.actions;
