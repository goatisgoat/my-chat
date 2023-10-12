import { Conversation } from "../model/conversation";
import { MessageType } from "../model/messageType";

export const conversationSortFc = (conversation: Conversation[]) => {
  const sorted = conversation.sort((a, b) => {
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

    const totalA = yearA + monthA + dayA + hoursA + minutesA + TimeA;
    const totalB = yearB + monthB + dayB + hoursB + minutesB + TimeB;

    return totalB - totalA;
  });

  return sorted;
};

export const getTotalDate = (prevDate: Date, currentDate: Date) => {
  const prev = new Date(prevDate);
  const current = new Date(currentDate);

  const prevYear = prev.getFullYear();
  const prevMonth = prev.getMonth() + 1;
  const prevDay = prev.getDate();

  const currentYear = current.getFullYear();
  const currentMonth = current.getMonth() + 1;
  const currentDay = current.getDate();

  const prevTotal = prevYear + prevMonth + prevDay;
  const CurrentTotal = currentYear + currentMonth + currentDay;

  return { prevTotal, CurrentTotal, currentYear, currentMonth, currentDay };
};

export const getChatDate = (prev: Date, current: Date, next: Date) => {
  const prevDate = new Date(prev);
  const currentDate = new Date(current);
  const nextDate = new Date(next);

  //이전 메시지 시간
  const prevHours = prevDate.getHours();
  const prevMinutes = prevDate.getMinutes();

  //지금 메시지 시간
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  //다음 메시지 시간
  const nextHours = nextDate.getHours();
  const nextMinutes = nextDate.getMinutes();

  return {
    prevHours,
    prevMinutes,
    currentHours,
    currentMinutes,
    nextHours,
    nextMinutes,
  };
};

export const messageSortFc = (message: MessageType[]) => {
  const sorted = message.sort((a, b) => {
    const newA = new Date(a.createdAt);
    const newB = new Date(b.createdAt);

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

    const totalA = yearA + monthA + dayA + hoursA + minutesA + TimeA;
    const totalB = yearB + monthB + dayB + hoursB + minutesB + TimeB;

    return totalA - totalB;
  });

  return sorted;
};
