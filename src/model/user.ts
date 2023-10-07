export type Userstate = {
  name: string | null;
  email: string | null;
  _id: string | null;
};

export type FriendInfo = {
  createdAt: Date;
  email: string;
  name: string;
  updatedAt: Date;
  __v: number;
  _id: string;
};
