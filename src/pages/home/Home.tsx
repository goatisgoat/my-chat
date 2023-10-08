import styled from "styled-components";
import Search from "../../components/homePage/search/Search";
import UserList from "../../components/homePage/userlist/UserList";
import AddUser from "../../components/homePage/adduser/AddUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/config/ConfigStore";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { io, Socket } from "socket.io-client";
import {
  socketInfo,
  isSocketFc,
  realTimeMsgFc,
  realTimeUserFc,
  newConversationFc,
} from "../../redux/modules/socketSlice";
import { Conversation } from "../../model/conversation";
import { conversationSortFc } from "../../utility/dateUtility";
import * as S from "./Home.styled";

const Home = () => {
  const { userState } = useSelector((state: RootState) => state.user);

  const realTimeMsg = useSelector(
    (state: RootState) => state.socket.realTimeMsg
  );
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const newConversationFriend = useSelector(
    (state: RootState) => state.socket.newConversationFriend
  );

  const socket = useSelector((state: RootState) => state.socket.socketState);
  const isSocket = useSelector((state: RootState) => state.socket.isSocket);

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
      socketAsSocket.on("newChatFriendInfo", (sender) => {
        dispatch(newConversationFc(sender.userId));
      });

      dispatch(isSocketFc(true));
    }
  }, [userState._id]);

  useEffect(() => {
    //채팅방
    const getConversation = async () => {
      if (userState?._id) {
        const response = await api.get(`/conversation/${userState?._id}`);
        setConversation(response.data.conversation);
      }
    };

    getConversation();
  }, [userState._id, newConversationFriend]);

  useEffect(() => {
    //실시간 업데이트 -> 채팅방 업데이트
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
    const sorted = conversationSortFc(conversation);

    return sorted.map((con) => {
      const conDate = new Date(con.updatedAt);
      return (
        <UserList
          key={conDate.getTime()}
          conversations={con}
          signedUserId={userState._id}
        />
      );
    });
  };

  return (
    <main>
      <Search />
      <AddUser conversation={conversation} userState={userState} />

      {conversation.length !== 0 ? (
        conversationSort()
      ) : (
        <S.NoMessage>메시지가 없습니다.</S.NoMessage>
      )}
    </main>
  );
};

export default Home;
