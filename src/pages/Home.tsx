import styled from "styled-components";
import Search from "../components/home/Search";
import UserList from "../components/home/UserList";
import AddUser from "../components/home/AddUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/config/ConfigStore";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { io } from "socket.io-client";
import {
  socketInfo,
  isSocketFc,
  realTimeMsgFc,
  realTimeUserFc,
} from "../redux/modules/socketSlice";
import { Socket } from "dgram";

type Conversation = {
  createdAt: Date;
  members: string[];
  updatedAt: Date;
  __v: number;
  _id: string;
};

const Home = () => {
  const { userState } = useSelector((state: RootState) => state.user);
  const [conversation, setConversation] = useState<Conversation[]>([]);

  const socket = useSelector((state: RootState) => state.socket.socketState);
  const isSocket = useSelector((state: RootState) => state.socket.isSocket);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(socket).length === 0) {
      const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
      dispatch(socketInfo(socket));
    }
  }, []);

  useEffect(() => {
    if (
      userState._id &&
      isSocket === false &&
      Object.keys(socket).length !== 0
    ) {
      const socketAsSocket = socket as Socket;

      socketAsSocket.emit("addUser", userState._id);
      socketAsSocket.on("getUsers", (users) => dispatch(realTimeUserFc(users)));
      socketAsSocket.on("getMessageInHome", (message) => {
        dispatch(realTimeMsgFc({ ...message, createdAt: new Date() }));
      });

      dispatch(isSocketFc(true));
    }
  }, [userState._id]);

  useEffect(() => {
    const getConversation = async () => {
      const response = await api.get(`/conversation/${userState?._id}`);
      setConversation(response.data.conversation);
    };

    getConversation();
  }, [userState._id]);

  const conversationSort = () => {
    const sorted = conversation.sort((a, b) => {
      const newA = new Date(a.createdAt);
      const newB = new Date(b.createdAt);

      const yearA = newA.getFullYear();
      const monthA = newA.getMonth() + 1;
      const dayA = newA.getDate();
      const timeA = newA.getTime();

      const yearB = newB.getFullYear();
      const monthB = newB.getMonth() + 1;
      const dayB = newB.getDate();
      const timeB = newB.getTime();

      const totalNumA = yearA + monthA + dayA + timeA;

      const totalNumB = yearB + monthB + dayB + timeB;

      return totalNumB - totalNumA;
    });

    return sorted.map((con) => (
      <UserList conversations={con} userId={userState._id} />
    ));
  };

  return (
    <HomeContainer>
      <Search />
      <AddUser conversation={conversation} userState={userState} />

      {conversation.length !== 0 ? (
        conversationSort()
      ) : (
        <NoMessage>메시지가 없습니다.</NoMessage>
      )}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div``;

const NoMessage = styled.div`
  margin-top: 40px;
  text-align: center;
  color: white;
`;
