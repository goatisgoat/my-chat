type ConversationMembers = {
  userId: string;
  userName: string;
};

export type Conversation = {
  createdAt: Date;
  members: ConversationMembers[];
  lastSenderName: string;
  lastMessage: string;
  updatedAt: Date;
  _id: string;
};
