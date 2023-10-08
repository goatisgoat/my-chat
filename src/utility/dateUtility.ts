import { Conversation } from "../model/conversation";

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
