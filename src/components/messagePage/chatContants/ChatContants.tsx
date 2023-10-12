import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { MessageType } from "../../../model/messageType";
import { FriendInfo, Userstate } from "../../../model/user";
import { getChatDate, getTotalDate } from "../../../utility/dateUtility";
import * as S from "./ChatContants.styled";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/config/ConfigStore";

type Props = {
  message: MessageType[];
  userState: Userstate;
  friendInfo: FriendInfo | null;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  isFetching: React.MutableRefObject<boolean>;
  toBottemRef: React.MutableRefObject<boolean>;
  fixedScrollRef: React.MutableRefObject<boolean>;
};

const ChatContants = ({
  message,
  userState,
  friendInfo,
  setPageNum,
  isFetching,
  toBottemRef,
  fixedScrollRef,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const [scrollHeight, setScrollHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const realTimeMsg = useSelector(
    (state: RootState) => state.socket.realTimeMsg
  );

  // 스크롤
  const LastelementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching.current === true) return null;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries, _) => {
        if (entries[0].isIntersecting) {
          if (isFetching.current === true) return null;

          isFetching.current = true;
          setPageNum((pre) => pre + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [message.length]
  );

  // 스크롤
  useEffect(() => {
    if (containerRef.current && fixedScrollRef.current === true) {
      const scrollTop = containerRef.current.scrollHeight - scrollHeight;

      containerRef.current.scrollTop = scrollTop;
      setScrollHeight(containerRef.current.scrollHeight);
    }
  }, [message.length]);

  //스크롤
  useEffect(() => {
    if (toBottemRef.current === true) {
      scrollRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [message.length, realTimeMsg]);

  const messageDate = (
    prevUser: string,
    prevCreatedAt: Date,
    currentUser: string,
    currentCreatedAt: Date,
    nextUser: string,
    nextCreatedAt: Date
  ) => {
    const { currentHours, currentMinutes, nextHours, nextMinutes } =
      getChatDate(prevCreatedAt, currentCreatedAt, nextCreatedAt);

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
    prevUser: string,
    prevCreatedAt: Date,
    currentUser: string,
    currentCreatedAt: Date,
    nextUser: string,
    nextCreatedAt: Date
  ) => {
    const { prevHours, prevMinutes, currentHours, currentMinutes } =
      getChatDate(prevCreatedAt, currentCreatedAt, nextCreatedAt);

    if (currentUser !== prevUser) {
      return <S.ChatImg src={friendInfo?.userImgUrl} />;
    }

    if (
      currentHours === prevHours &&
      currentMinutes === prevMinutes &&
      currentUser === prevUser
    ) {
      return <S.ChatDisabledImg></S.ChatDisabledImg>;
    }

    return <S.ChatImg src={friendInfo?.userImgUrl} />;
  };

  return (
    <S.Chats ref={containerRef}>
      {message.map((msg, index) =>
        msg.senderId === userState._id ? (
          <div ref={index === 0 ? LastelementRef : null} key={index}>
            {bottomLineDate(message[index - 1]?.createdAt, msg?.createdAt)}

            <S.MyChatsWrap ref={scrollRef} key={index}>
              <S.ContentMessageWrap>
                <S.MyTime>
                  {
                    messageDate(
                      message[index - 1]?.senderId,
                      message[index - 1]?.createdAt,
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
          </div>
        ) : (
          <div ref={index === 0 ? LastelementRef : null} key={index}>
            {bottomLineDate(message[index - 1]?.createdAt, msg?.createdAt)}
            <S.ChatsWrap ref={scrollRef} key={index}>
              {messageImg(
                message[index - 1]?.senderId,
                message[index - 1]?.createdAt,
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
                        message[index - 1]?.senderId,
                        message[index - 1]?.createdAt,
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
          </div>
        )
      )}
    </S.Chats>
  );
};

export default ChatContants;
