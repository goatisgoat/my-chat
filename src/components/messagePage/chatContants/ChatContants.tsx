import { ReactNode, useEffect, useRef } from "react";
import { MessageType } from "../../../model/messageType";
import { FriendInfo, Userstate } from "../../../model/user";
import { getChatDate, getTotalDate } from "../../../utility/dateUtility";
import * as S from "./ChatContants.styled";

type Props = {
  message: MessageType[];
  userState: Userstate;
  friendInfo: FriendInfo | null;
};

const ChatContants = ({ message, userState, friendInfo }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  //스크롤
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const messageDate = (
    currentUser: string,
    currentCreatedAt: Date,
    nextUser: string,
    nextCreatedAt: Date
  ) => {
    const { currentHours, currentMinutes, nextHours, nextMinutes } =
      getChatDate(currentCreatedAt, nextCreatedAt);

    if (
      currentHours === nextHours &&
      currentMinutes === nextMinutes &&
      currentUser === nextUser
    ) {
      return "";
    }

    return `${currentHours}:${currentMinutes}`;
  };

  const bottomLineDate = (prevDate: Date, currentDate: Date) => {
    const { prevTotal, CurrentTotal, currentYear, currentMonth, currentDay } =
      getTotalDate(prevDate, currentDate);

    if (prevTotal !== CurrentTotal) {
      return (
        <S.SpaceDiv>
          <S.SpaceSpan>{`${currentYear}-${currentMonth}-${currentDay}`}</S.SpaceSpan>
        </S.SpaceDiv>
      );
    } else return null;
  };

  const messageImg = (
    currentUser: string,
    currentCreatedAt: Date,
    nextUser: string,
    nextCreatedAt: Date
  ) => {
    const { currentHours, currentMinutes, nextHours, nextMinutes } =
      getChatDate(currentCreatedAt, nextCreatedAt);

    if (currentUser !== nextUser) {
      return <S.ChatImg src={friendInfo?.userImgUrl} />;
    }

    if (
      currentHours === nextHours &&
      currentMinutes === nextMinutes &&
      currentUser === nextUser
    ) {
      return <S.ChatDisabledImg></S.ChatDisabledImg>;
    }

    return <S.ChatImg src={friendInfo?.userImgUrl} />;
  };

  return (
    <S.Chats>
      {message.map((msg, index) =>
        msg.senderId === userState._id ? (
          <>
            {bottomLineDate(message[index - 1]?.createdAt, msg?.createdAt)}

            <S.MyChatsWrap ref={scrollRef} key={index}>
              <S.ContentMessageWrap>
                <S.MyTime>
                  {
                    messageDate(
                      msg?.senderId,
                      msg.createdAt,
                      message[index + 1]?.senderId,
                      message[index + 1]?.createdAt
                    ) as ReactNode
                  }
                </S.MyTime>

                <S.Message>
                  <span>{msg.text}</span>
                </S.Message>
              </S.ContentMessageWrap>
            </S.MyChatsWrap>
          </>
        ) : (
          <>
            {bottomLineDate(message[index - 1]?.createdAt, msg?.createdAt)}
            <S.ChatsWrap ref={scrollRef} key={index}>
              {messageImg(
                msg?.senderId,
                msg.createdAt,
                message[index + 1]?.senderId,
                message[index + 1]?.createdAt
              )}
              <S.ContentMessageWrap>
                <S.Message>
                  {" "}
                  <span>{msg.text}</span>
                </S.Message>
                <S.Time>
                  <div>
                    {
                      messageDate(
                        msg?.senderId,
                        msg.createdAt,
                        message[index + 1]?.senderId,
                        message[index + 1]?.createdAt
                      ) as ReactNode
                    }
                  </div>
                </S.Time>
              </S.ContentMessageWrap>
            </S.ChatsWrap>
          </>
        )
      )}
    </S.Chats>
  );
};

export default ChatContants;
