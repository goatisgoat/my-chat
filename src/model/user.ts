export type Userstate = {
  name: string | null;
  email: string | null;
  userImgUrl: string | null;
  _id: string | null;
};

export type FriendInfo = {
  createdAt: Date;
  email: string;
  name: string;
  userImgUrl: string;
  updatedAt: Date;
  _id: string;
};
