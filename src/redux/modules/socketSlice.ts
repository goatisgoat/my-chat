import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

type RealTimeMsg = {
  conversationId: string;
  createdAt: Date;
  sender: string;
  lastSenderName: string;
  text: string;
  updatedAt: Date | null;
  __v?: number | null;
  _id?: string | null;
};

type SocketState = {
  socketState: Socket | {};
  isSocket: boolean;
  realTimeMsg: RealTimeMsg | null;
  realTimeUser: { userId: string; socketId: string }[] | null;
  newConversationFriend: string;
};

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
    realTimeUserFc: (
      state,
      action: PayloadAction<{ userId: string; socketId: string }[]>
    ) => {
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
