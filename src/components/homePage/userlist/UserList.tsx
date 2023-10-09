import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Conversation } from "../../../model/conversation";
import * as S from "./UserList.styled";

type Props = {
  conversations: Conversation;
  signedUserId: string | null;
};

const UserList = ({ conversations, signedUserId }: Props) => {
  const [friendId, setFriendId] = useState(
    conversations.members.find((f) => f.userId !== signedUserId)
  );

  const navigate = useNavigate();

  const lastTime = (d: Date) => {
    const date = new Date(d);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`;
  };

  return (
    <S.ListContainer onClick={() => navigate(`/message/${conversations._id}`)}>
      <S.ImgWrap>
        <S.UserImg src={friendId?.userImgUrl} />
        <div>
          <S.UserMame>{friendId?.userName}</S.UserMame>
          {conversations?.lastMessage ? (
            <S.LastMessage>{conversations?.lastMessage}</S.LastMessage>
          ) : (
            <S.LastMessage>메시지가 없습니다</S.LastMessage>
          )}
        </div>
      </S.ImgWrap>
      <S.Time>
        {conversations?.updatedAt ? lastTime(conversations?.updatedAt) : ""}
      </S.Time>
    </S.ListContainer>
  );
};

export default UserList;
