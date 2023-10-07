import { Socket } from "socket.io-client";
import { RealTimeMsg } from "./messageType";

export type SocketState = {
  socketState: Socket | {};
  isSocket: boolean;
  realTimeMsg: RealTimeMsg | null;
  realTimeUser: { userId: string; socketId: string }[] | null;
  newConversationFriend: string;
};

export type SocketIdUserId = {
  userId: string;
  socketId: string;
};
