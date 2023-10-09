type ConversationMembers = {
  userId: string;
  userName: string;
  userImgUrl: string;
};

export type Conversation = {
  createdAt: Date;
  members: ConversationMembers[];
  lastMessage: string;
  updatedAt: Date;
  _id: string;
};
