import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import api from "../../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/ConfigStore";

type Props = {
  conversations: {
    createdAt: Date;
    members: {
      userId: string;
      userName: string;
    }[];
    lastSenderName: string;
    lastMessage: string;
    updatedAt: Date;
    _id: string;
  };
  signedUserId: string | null;
};

// type FriendInfo = {
//   createdAt: Date;
//   email: string;
//   name: string;
//   updatedAt: Date;
//   __v: number;
//   _id: string;
// };

const UserList = ({ conversations, signedUserId }: Props) => {
  const realTimeMsg = useSelector(
    (state: RootState) => state.socket.realTimeMsg
  );

  const [friendId, setFriendId] = useState(
    conversations.members.find((f) => f.userId !== signedUserId)
  );

  const navigate = useNavigate();

  const lastMsg = () => {
    if (conversations._id === realTimeMsg?.conversationId) {
      return realTimeMsg.text;
    }

    return conversations?.lastMessage;
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
          <div>{friendId?.userName}</div>
          {conversations?.lastMessage ? (
            <div>{lastMsg()}</div>
          ) : (
            <div>메시지가 없습니다</div>
          )}
        </NameMassageWrap>
      </ImgWrap>
      <Time>
        {conversations?.updatedAt ? lastTime(conversations?.updatedAt) : ""}
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
  border-bottom: 1px solid #6f6f6f78;
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
