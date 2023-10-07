import styled from "styled-components";
import ChatContants from "../components/chats/ChatContants";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/ConfigStore";
import { Socket } from "socket.io-client";
import { MessageType } from "../model/messageType";
import { FriendInfo } from "../model/user";

const Message = () => {
  //useSelector
  const { userState } = useSelector((state: RootState) => state.user);
  const socket = useSelector((state: RootState) => state.socket.socketState);
  const realTimeMsg = useSelector(
    (state: RootState) => state.socket.realTimeMsg
  );

  const [friendInfo, setFriendInfo] = useState<FriendInfo | null>(null);
  const [message, setMessage] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const conversationId = location.pathname.split("/")[2];

  useEffect(() => {
    const getApi = async () => {
      const messagerResponse = await api.get(`/message/${conversationId}`);

      const friendResponse = await api.post(`/user/find-friend`, {
        conversationId,
        userId: userState._id,
      });

      if (!messagerResponse || !friendResponse) {
        return;
      }
      setMessage(messagerResponse.data.messages);
      setFriendInfo(friendResponse.data.friendInfo);
    };

    getApi();
  }, []);

  const handleNewMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = {
      conversationId: conversationId,
      senderId: userState._id,
      text: newMessage,
    };

    //socket;
    if (Object.keys(socket).length !== 0) {
      const socketAsSocket = socket as Socket;
      socketAsSocket.emit("sendMessage", {
        senderId: userState._id,
        lastSenderName: userState.name,
        receiverId: friendInfo?._id,
        text: newMessage,
        conversationId: conversationId,
      });
    }

    const response = await api.post(`/message`, message);
    setMessage((pre) => [...pre, response.data.savedMessage]);
    setNewMessage("");
  };

  useEffect(() => {
    if (realTimeMsg && realTimeMsg.conversationId === conversationId) {
      const realTimeObj = {
        conversationId: realTimeMsg.conversationId,
        createdAt: realTimeMsg.createdAt,
        senderId: realTimeMsg.senderId,
        text: realTimeMsg.text,
      };

      setMessage((pre) => [...pre, realTimeObj]);
    }
  }, [realTimeMsg]);

  return (
    <MsgContainer>
      <TopBarName>
        <ReturnBtn onClick={() => navigate(-1)}>{"<"}</ReturnBtn>
        {friendInfo?.name}
      </TopBarName>
      <ChatContants message={message} userState={userState} />
      <ChatInput>
        <Form onSubmit={handleNewMessage}>
          <ChatInputWrap>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </ChatInputWrap>
          <ChatInputBtn type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.2em"
              fill="white"
              viewBox="0 0 640 512"
            >
              <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" />
            </svg>
          </ChatInputBtn>
        </Form>
      </ChatInput>
    </MsgContainer>
  );
};

export default Message;

const MsgContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const TopBarName = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ReturnBtn = styled.div`
  position: absolute;
  left: 10px;
`;

const ChatInput = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 10px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ChatInputWrap = styled.div`
  width: 85%;
  height: 45px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: #545454;

  & > input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 15px;
    color: white;
    font-weight: 600;
    outline: none;
    border: none;
    background-color: inherit;
    border-radius: 20px;
  }
`;

const ChatInputBtn = styled.button`
  width: 40px;
  height: 40px;
  margin-top: 2px;
  margin-left: 10px;
  border-radius: 50%;
  background-image: linear-gradient(90deg, #8049ff 20%, #e641ff 80%);
`;
