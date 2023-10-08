import { ReactNode, useEffect, useRef } from "react";
import { MessageType } from "../../../model/messageType";
import { Userstate } from "../../../model/user";
import { getTotalDate } from "../../../utility/dateUtility";
import * as S from "./ChatContants.styled";

type Props = {
  message: MessageType[];
  userState: Userstate;
};

const ChatContants = ({ message, userState }: Props) => {
  const isNextUserSame = useRef<boolean>(true);
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
    const currentDate = new Date(currentCreatedAt);
    const nextDate = new Date(nextCreatedAt);

    //지금 메시지 시간
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    //다음 메시지 시간
    const nextHours = nextDate.getHours();
    const nextMinutes = nextDate.getMinutes();

    //지금 + 다음 유저 일치
    if (currentUser === nextUser) {
      isNextUserSame.current = false;
    } else {
      isNextUserSame.current = true;
    }

    if (
      currentHours === nextHours &&
      currentMinutes === nextMinutes &&
      isNextUserSame.current === false
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
              <S.ChatImg></S.ChatImg>
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
