import { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Props = {
  message: {
    conversationId: string;
    createdAt: Date;
    sender: string;
    text: string;
    updatedAt?: Date | null;
    __v?: number | null;
    _id?: string | null;
  }[];
  userState: {
    name: string | null;
    email: string | null;
    _id: string | null;
  };
};

const ChatContants = ({ message, userState }: Props) => {
  const hour = useRef<number>(0);
  const time = useRef<number>(0);
  const isNextUserSame = useRef<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const date = (
    d: Date,
    currentUser: string,
    nextUser: string,
    nextCreatedAt: Date
  ) => {
    const date = new Date(d);
    const nextDate = new Date(nextCreatedAt);

    // (시, 분, 초)
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // (시, 분, 초)
    const nextHours = nextDate.getHours();
    const nextMinutes = nextDate.getMinutes();

    // 유저 일치
    if (currentUser === nextUser) {
      isNextUserSame.current = false;
    } else {
      isNextUserSame.current = true;
    }

    if (
      time.current !== 0 &&
      hour.current === hours &&
      isNextUserSame.current === false &&
      minutes - time.current <= 1 &&
      0 <= minutes - time.current
    ) {
      time.current = minutes;
      hour.current = hours;
      return "";
    }

    if (
      hours === nextHours &&
      minutes === nextMinutes &&
      isNextUserSame.current === false
    ) {
      return "";
    }

    time.current = minutes;
    hour.current = hours;

    return `${hours}:${minutes}`;
  };

  const bottomLineDate = (currentDate: Date, prevDate: Date) => {
    const current = new Date(currentDate);
    const prev = new Date(prevDate);

    const currentYear = current.getFullYear();
    const currentMonth = current.getMonth() + 1;
    const currentDay = current.getDate();

    const prevYear = prev.getFullYear();
    const prevMonth = prev.getMonth() + 1;
    const prevDay = prev.getDate();

    if (
      currentYear + currentMonth + currentDay !==
      prevYear + prevMonth + prevDay
    ) {
      return (
        <SpaceDiv>
          <SpaceSpan>{`${currentYear}-${currentMonth}-${currentDay}`}</SpaceSpan>
        </SpaceDiv>
      );
    } else return null;
  };
  return (
    <Chats>
      {message.map((msg, index) =>
        msg.sender === userState._id ? (
          <>
            {bottomLineDate(msg?.createdAt, message[index - 1]?.createdAt)}

            <MyChatsWrap ref={scrollRef}>
              <ContentWrap>
                <MyTime>
                  {
                    date(
                      msg.createdAt,
                      msg?.sender,
                      message[index + 1]?.sender,
                      message[index + 1]?.createdAt
                    ) as ReactNode
                  }
                </MyTime>

                <Contant>
                  <span>{msg.text}</span>
                </Contant>
              </ContentWrap>
            </MyChatsWrap>
          </>
        ) : (
          <>
            {bottomLineDate(msg?.createdAt, message[index - 1]?.createdAt)}
            <ChatsWrap ref={scrollRef}>
              <ChatImg></ChatImg>
              <ContentWrap>
                <Contant>
                  {" "}
                  <span>{msg.text}</span>
                </Contant>
                <Time>
                  <div>
                    {
                      date(
                        msg.createdAt,
                        msg?.sender,
                        message[index + 1]?.sender,
                        message[index + 1]?.createdAt
                      ) as ReactNode
                    }
                  </div>
                </Time>
              </ContentWrap>
            </ChatsWrap>
          </>
        )
      )}
    </Chats>
  );
};

export default ChatContants;

const Chats = styled.div`
  width: 100%;
  height: calc(100vh - 110px);
  padding: 10px;
  overflow-y: scroll;
`;

const ChatsWrap = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ChatImg = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: white;
`;

const ContentWrap = styled.div`
  display: flex;
`;

const Contant = styled.div`
  max-width: 200px;
  padding: 10px 13px;
  margin-right: 5px;
  border-radius: 10px;
  font-weight: 600;
  word-wrap: break-word;
  background-image: linear-gradient(90deg, #8049ff 20%, #e641ff 80%);
`;

const Time = styled.div`
  display: flex;
  align-items: end;
  margin-top: 5px;
  font-size: 13px;
  color: #c6c6c6;
`;

//////////
const MyChatsWrap = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`;

const MyTime = styled.div`
  display: flex;
  align-items: end;
  margin-top: 5px;
  margin-right: 5px;
  font-size: 13px;
  color: #c6c6c6;
`;

const SpaceDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SpaceSpan = styled.span`
  border: 1px solid white;
  border-radius: 20px;
  padding: 3px 20px;
`;
