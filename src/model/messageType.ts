export type MessageType = {
  conversationId: string;
  createdAt: Date;
  senderId: string;
  text: string;
  updatedAt?: Date | null;
  _id?: string | null;
};

export type RealTimeMsg = {
  conversationId: string;
  createdAt: Date;
  senderId: string;
  lastSenderName: string;
  text: string;
};
