import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

type RealTimeMsg = {
  conversationId: string;
  createdAt: Date;
  sender: string;
  text: string;
  updatedAt?: Date | null;
  __v?: number | null;
  _id?: string | null;
};

type SocketState = {
  socketState: Socket | {};
  isSocket: boolean;
  realTimeMsg: RealTimeMsg | null;
  realTimeUser: { userId: string; socketId: string }[] | null;
};

const initialState: SocketState = {
  socketState: {},
  isSocket: false,
  realTimeMsg: null,
  realTimeUser: null,
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
  },
});

export default socketSlice.reducer;
export const { socketInfo, isSocketFc, realTimeMsgFc, realTimeUserFc } =
  socketSlice.actions;
