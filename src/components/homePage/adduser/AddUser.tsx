import { useSelector } from "react-redux";
import { RootState } from "../../../redux/config/ConfigStore";
import { ReactNode, useEffect, useState } from "react";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { Userstate } from "../../../model/user";
import { Conversation } from "../../../model/conversation";
import * as S from "./AddUser.styled";

type Props = {
  conversation: Conversation[];
  userState: Userstate;
};

const AddUser = ({ conversation, userState }: Props) => {
  const { realTimeUser } = useSelector((state: RootState) => state.socket);
  const socket = useSelector((state: RootState) => state.socket.socketState);
  const [realTimeFriends, setRealTimeFriends] = useState<Conversation[]>([]);
  const [isOpenList, setIsOpenList] = useState(false);
  const [allUsers, setAllUsers] = useState<Userstate[] | null>(null);
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
    friendId: string | null,
    friendName: string | null,
    friendImg: string | null
  ) => {
    try {
      const response = await api.post(`/conversation`, {
        senderId: userState._id,
        senderName: userState.name,
        senderImg: userState.userImgUrl,
        receiverId: friendId,
        receiverName: friendName,
        receiverImg: friendImg,
      });

      if (!response) throw new Error();

      const socketAsSocket = socket as Socket;

      socketAsSocket.emit("createChat", {
        receiverId: friendId,
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
    return allUsers?.map((user, index) => {
      let conversationId = "";
      return conversation.find((con) => {
        conversationId = con._id;
        return (
          con.members[0].userId === user._id ||
          con.members[1].userId === user._id
        );
      }) ? (
        <S.UserList key={index}>
          <S.UserListImg>
            <S.UserImg src={user.userImgUrl as string} />
            <div>{user.name}</div>
          </S.UserListImg>
          <div>
            <S.MakeMsgBtn onClick={() => existedConversation(conversationId)}>
              진행중
            </S.MakeMsgBtn>
          </div>
        </S.UserList>
      ) : (
        <S.UserList key={index}>
          <S.UserListImg>
            <S.UserImg src={user.userImgUrl as string} />
            <div>{user.name}</div>
          </S.UserListImg>
          <div>
            <S.MakeMsgBtn
              onClick={() =>
                createConversation(user._id, user.name, user.userImgUrl)
              }
            >
              대화 시작
            </S.MakeMsgBtn>
          </div>
        </S.UserList>
      );
    });
  };

  return (
    <>
      <S.Container>
        <S.AddBtn onClick={() => setIsOpenList((pre) => !pre)}>
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </S.AddBtn>
        {userState && realTimeFriends.length > 0
          ? realTimeFriends.map((f, i) => {
              const onlineFriendInfo = f.members.find(
                (f) => f.userId !== userState._id
              );
              return (
                <S.OnLineUser
                  onClick={() => navigate(`/message/${f._id}`)}
                  key={i}
                >
                  <S.OnLineUserImg src={onlineFriendInfo?.userImgUrl} />
                  <S.OnLineCircle></S.OnLineCircle>
                </S.OnLineUser>
              );
            })
          : null}
      </S.Container>
      {isOpenList ? (
        <>
          {" "}
          <S.ModalOuter
            onClick={() => setIsOpenList((pre) => !pre)}
          ></S.ModalOuter>
          <S.ModalInner>
            <S.ListTitle>UserList - Total</S.ListTitle>
            {allUsersList() as ReactNode}
          </S.ModalInner>
        </>
      ) : null}
    </>
  );
};

export default AddUser;
