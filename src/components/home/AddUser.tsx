import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux/config/ConfigStore";
import { ReactNode, useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { Userstate } from "../../model/user";
import { Conversation } from "../../model/conversation";

type Props = {
  conversation: Conversation[];
  userState: Userstate;
};

type AllUsers = Userstate;

const AddUser = ({ conversation, userState }: Props) => {
  const { realTimeUser } = useSelector((state: RootState) => state.socket);
  const socket = useSelector((state: RootState) => state.socket.socketState);
  const [realTimeFriends, setRealTimeFriends] = useState<Conversation[]>([]);
  const [isOpenList, setIsOpenList] = useState(false);
  const [allUsers, setAllUsers] = useState<AllUsers[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onlineFriends = conversation?.filter((con) =>
      con.members.some((m) =>
        realTimeUser?.find(
          (real) => real.userId === m.userId && real.userId !== userState._id
        )
      )
    );

    setRealTimeFriends(onlineFriends);
  }, [realTimeUser, userState._id, conversation]);

  useEffect(() => {
    if (userState._id) {
      const getAllUsers = async () => {
        const response = await api.get(`/user/all-users/${userState._id}`);
        setAllUsers(response.data.allUsers);
      };
      getAllUsers();
    }
  }, []);

  const createConversation = async (
    id: string | null,
    friendName: string | null
  ) => {
    try {
      const response = await api.post(`/conversation`, {
        senderId: userState._id,
        senderName: userState.name,
        receiverId: id,
        receiverName: friendName,
      });

      if (!response) throw new Error();

      const socketAsSocket = socket as Socket;

      socketAsSocket.emit("createChat", {
        receiverId: id,
        senderId: userState._id,
      });
      navigate(`/message/${response.data.savedConversation._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const existedConversation = (conversationId: string | null) => {
    navigate(`/message/${conversationId}`);
  };

  const allUsersList = () => {
    return allUsers?.map((user) => {
      let conversationId = "";
      return conversation.find((con) => {
        conversationId = con._id;
        return (
          con.members[0].userId === user._id ||
          con.members[1].userId === user._id
        );
      }) ? (
        <UserList>
          <UserListImg>
            <div></div>
            <div>{user.name}</div>
          </UserListImg>
          <div>
            <MakeMsgBtn onClick={() => existedConversation(conversationId)}>
              진행중
            </MakeMsgBtn>
          </div>
        </UserList>
      ) : (
        <UserList>
          <UserListImg>
            <div></div>
            <div>{user.name}</div>
          </UserListImg>
          <div>
            <MakeMsgBtn onClick={() => createConversation(user._id, user.name)}>
              대화 시작
            </MakeMsgBtn>
          </div>
        </UserList>
      );
    });
  };

  return (
    <>
      <Container>
        <AddBtn onClick={() => setIsOpenList((pre) => !pre)}>+</AddBtn>
        {userState && realTimeFriends.length > 0
          ? realTimeFriends.map((f) => (
              <OnLineUser onClick={() => navigate(`/message/${f._id}`)}>
                <OnLineUserImg></OnLineUserImg>
                <OnLineCircle></OnLineCircle>
              </OnLineUser>
            ))
          : null}
      </Container>
      {isOpenList ? (
        <>
          {" "}
          <ModalOuter onClick={() => setIsOpenList((pre) => !pre)}></ModalOuter>
          <ModalInner>
            <ListTitle>UserList - Total</ListTitle>
            {allUsersList() as ReactNode}
          </ModalInner>
        </>
      ) : null}
    </>
  );
};

export default AddUser;

const Container = styled.div`
  padding: 10px;
  padding-left: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const AddBtn = styled.div`
  width: 45px;
  height: 45px;
  margin-right: 25px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(90deg, #8f60ff 20%, #eb6aff 80%);
`;

const OnLineUser = styled.div`
  width: 55px;
  height: 55px;
  margin-right: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(90deg, #8f60ff 20%, #eb6aff 80%);
  position: relative;
`;

const OnLineUserImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
`;

const OnLineCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #80fb80;
  bottom: 5px;
  right: 5px;
  position: absolute;
`;

///
const ModalOuter = styled.div`
  background-color: rgba(2, 1, 1, 0.493);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const ModalInner = styled.div`
  width: 100%;
  height: 90%;
  padding: 20px;
  background-color: #e7def0;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

const ListTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const UserList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const UserListImg = styled.div`
  display: flex;
  align-items: center;

  & > div:first-child {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #da9999;

    margin-right: 10px;
  }
`;

const MakeMsgBtn = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #da9999;
  cursor: pointer;
`;
