import ChatContants from "../../components/messagePage/chatContants/ChatContants";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/ConfigStore";
import { Socket } from "socket.io-client";
import { MessageType } from "../../model/messageType";
import { FriendInfo } from "../../model/user";
import * as S from "./Message.styled";

const Message = () => {
  const { userState } = useSelector((state: RootState) => state.user);
  const [friendInfo, setFriendInfo] = useState<FriendInfo | null>(null);

  const socket = useSelector((state: RootState) => state.socket.socketState);

  const realTimeMsg = useSelector(
    (state: RootState) => state.socket.realTimeMsg
  );

  const [message, setMessage] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const conversationId = location.pathname.split("/")[2];

  useEffect(() => {
    const getMessageFriendInfo = async () => {
      try {
        const messagerResponse = await api.get(`/message/${conversationId}`);
        if (!messagerResponse) throw new Error();

        const friendResponse = await api.post(`/user/find-friend`, {
          conversationId,
          userId: userState._id,
        });
        if (!friendResponse) throw new Error();

        setMessage(messagerResponse.data.messages);
        setFriendInfo(friendResponse.data.friendInfo);
      } catch (error) {
        console.log(error);
      }
    };

    getMessageFriendInfo();
  }, []);

  const handleNewMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = {
      conversationId: conversationId,
      senderId: userState._id,
      text: newMessage,
      senderImgUrl: userState.userImgUrl,
    };

    //socket
    if (Object.keys(socket).length !== 0) {
      const socketAsSocket = socket as Socket;
      socketAsSocket.emit("sendMessage", {
        senderId: userState._id,
        receiverId: friendInfo?._id,
        text: newMessage,
        senderImgUrl: userState.userImgUrl,
        conversationId: conversationId,
      });
    }
    try {
      const response = await api.post(`/message`, message);
      if (!response) {
        throw new Error();
      }
      setMessage((pre) => [...pre, response.data.savedMessage]);
      setNewMessage("");
    } catch (error) {}
  };

  useEffect(() => {
    //실시간 문자 -> 메시지 리스트 업데이트
    const updateMessagge = () => {
      if (realTimeMsg && realTimeMsg.conversationId === conversationId) {
        const realTimeObj = {
          conversationId: realTimeMsg.conversationId,
          createdAt: realTimeMsg.createdAt,
          senderId: realTimeMsg.senderId,
          text: realTimeMsg.text,
          senderImgUrl: realTimeMsg.senderImgUrl,
        };

        setMessage((pre) => [...pre, realTimeObj]);
      }
    };

    updateMessagge();
  }, [realTimeMsg]);

  return (
    <S.MsgContainer>
      <S.TopBarName>
        <S.ReturnBtn onClick={() => navigate(-1)}>
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            {" "}
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </S.ReturnBtn>
        {friendInfo?.name}
      </S.TopBarName>
      <ChatContants
        message={message}
        userState={userState}
        friendInfo={friendInfo}
      />
      <S.ChatInput>
        <S.Form onSubmit={handleNewMessage}>
          <S.ChatInputWrap>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </S.ChatInputWrap>
          <S.ChatInputBtn type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.2em"
              fill="white"
              viewBox="0 0 640 512"
            >
              <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" />
            </svg>
          </S.ChatInputBtn>
        </S.Form>
      </S.ChatInput>
    </S.MsgContainer>
  );
};

export default Message;
