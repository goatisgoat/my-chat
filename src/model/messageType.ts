export type MessageType = {
  conversationId: string;
  createdAt: Date;
  senderId: string;
  text: string;
  senderImgUrl: string;
  updatedAt?: Date | null;
  _id?: string | null;
};

export type RealTimeMsg = {
  conversationId: string;
  createdAt: Date;
  senderId: string;
  senderImgUrl: string;
  text: string;
};
