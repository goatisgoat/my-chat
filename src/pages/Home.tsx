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
  newConversationFc,
} from "../redux/modules/socketSlice";
import { Socket } from "socket.io-client";

type Conversation = {
  createdAt: Date;
  members: string[];
  lastSenderName: string;
  lastMessage: string;
  updatedAt: Date;
  __v: number;
  _id: string;
};

const Home = () => {
  const { userState } = useSelector((state: RootState) => state.user);
  const realTimeMsg = useSelector(
    (state: RootState) => state.socket.realTimeMsg
  );
  const [conversation, setConversation] = useState<Conversation[]>([]);

  const socket = useSelector((state: RootState) => state.socket.socketState);
  const isSocket = useSelector((state: RootState) => state.socket.isSocket);
  const newConversationFriend = useSelector(
    (state: RootState) => state.socket.newConversationFriend
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(socket).length === 0) {
      const socket = io("http://localhost:3001");

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
        dispatch(
          realTimeMsgFc({
            ...message,
            createdAt: new Date(),
          })
        );
      });
      socketAsSocket.on("receivedChatInfo", (sender) => {
        dispatch(newConversationFc(sender[0].userId));
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
  }, [userState._id, newConversationFriend]);

  useEffect(() => {
    if (realTimeMsg && Object.keys(realTimeMsg).length) {
      setConversation((pre) => {
        return pre.map((p) =>
          p._id === realTimeMsg.conversationId
            ? {
                ...p,
                updatedAt: realTimeMsg.createdAt,
                lastSenderName: realTimeMsg.lastSenderName,
                lastMessage: realTimeMsg.text,
              }
            : p
        );
      });
    }
  }, [realTimeMsg]);

  const conversationSort = () => {
    conversation.sort((a, b) => {
      const newA = new Date(a.updatedAt);
      const newB = new Date(b.updatedAt);

      const yearA = newA.getFullYear();
      const monthA = newA.getMonth() + 1;
      const dayA = newA.getDate();
      const hoursA = newA.getHours();
      const minutesA = newA.getMinutes();
      const TimeA = newA.getTime();

      const yearB = newB.getFullYear();
      const monthB = newB.getMonth() + 1;
      const dayB = newB.getDate();
      const hoursB = newB.getHours();
      const minutesB = newB.getMinutes();
      const TimeB = newB.getTime();

      const aaa = yearA + monthA + dayA + hoursA + minutesA + TimeA;
      const bbb = yearB + monthB + dayB + hoursB + minutesB + TimeB;

      return bbb - aaa;
    });

    return conversation.map((con) => {
      const conDate = new Date(con.updatedAt);

      const year = conDate.getFullYear();
      const month = conDate.getMonth() + 1;
      const day = conDate.getDate();
      const hours = conDate.getHours();
      const minutes = conDate.getMinutes();
      const Time = conDate.getTime();

      const totalDate = year + month + day + hours + minutes + Time;
      console.log("conversation.map");
      return (
        <UserList key={totalDate} conversations={con} userId={userState._id} />
      );
    });
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
