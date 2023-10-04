import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import api from "../../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/ConfigStore";

type Props = {
  conversations: {
    createdAt: Date;
    members: string[];
    updatedAt: Date;
    __v: number;
    _id: string;
  };
  userId: string | null;
};

type FriendInfo = {
  createdAt: Date;
  email: string;
  name: string;
  updatedAt: Date;
  __v: number;
  _id: string;
};

type LastMessage = {
  conversationId: string;
  createdAt: Date;
  sender: string;
  text: string;
  updatedAt: Date;
  __v: number;
  _id: string;
};

const UserList = ({ conversations, userId }: Props) => {
  const realTimeMsg = useSelector(
    (state: RootState) => state.socket.realTimeMsg
  );
  const [friendId, setFriendId] = useState(
    conversations.members.find((f) => f !== userId)
  );
  const [friendInfo, setFriendInfo] = useState<FriendInfo | null>(null);
  const [lastMessage, setLastMessage] = useState<LastMessage | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getFriendName = async () => {
      const response = await api.get(`/user/${friendId}`);
      setFriendInfo(response.data.user);
    };

    const getLastMessage = async () => {
      const response = await api.get(`/message/last/${conversations._id}`);
      setLastMessage(response.data.message);
    };
    getFriendName();
    getLastMessage();
  }, [userId]);

  const lastMsg = () => {
    if (conversations._id === realTimeMsg?.conversationId) {
      return realTimeMsg.text;
    }

    return lastMessage?.text;
  };

  const lastTime = (d: Date) => {
    const date = new Date(d);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`;
  };
  return (
    <ListContainer onClick={() => navigate(`/message/${conversations._id}`)}>
      <ImgWrap>
        <UserImg></UserImg>
        <NameMassageWrap>
          <div>{friendInfo?.name}</div>
          {lastMessage?.text ? (
            <div>{lastMsg()}</div>
          ) : (
            <div>메시지가 없습니다</div>
          )}
        </NameMassageWrap>
      </ImgWrap>
      <Time>
        {lastMessage?.createdAt ? lastTime(lastMessage?.createdAt) : ""}
      </Time>
    </ListContainer>
  );
};

export default UserList;

const ListContainer = styled.div`
  width: 90%;
  height: 80px;
  padding: 5px;
  margin: 0 auto;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid gray;
`;
const ImgWrap = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
  background-color: white;
`;

const NameMassageWrap = styled.div`
  & > div:first-child {
    font-size: 18px;
    font-weight: 800;
  }
  & > div:last-child {
    font-size: 13px;
    color: #c2c2c2;
  }
`;

const Time = styled.div`
  font-size: 15px;
`;
