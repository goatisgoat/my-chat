import styled from "styled-components";
import { colors } from "../../../style/theme/colors";

export const Chats = styled.div`
  width: 100%;
  height: calc(100vh - 125px);
  padding: 10px;
  overflow-y: scroll;
  /* transform: scaleY(-1); */
  &::-webkit-scrollbar {
    /* display: none;  */
  }
`;

export const ChatsWrap = styled.div`
  display: flex;
  margin-bottom: 20px;
  /* transform: scaleY(-1); */
`;

export const ChatImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 50%;
  background-color: ${colors.white};
`;

export const ChatDisabledImg = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: ${colors.back_ground};
`;

export const ContentMessageWrap = styled.div`
  display: flex;
`;

export const Message = styled.div`
  max-width: 200px;
  padding: 10px 13px;
  margin-right: 5px;
  border-radius: 10px;
  font-weight: 600;
  word-wrap: break-word;
  background-image: linear-gradient(
    90deg,
    ${colors.gradation_purple} 20%,
    ${colors.gradation_pink} 80%
  );
`;

export const Time = styled.div`
  display: flex;
  align-items: end;
  margin-top: 5px;
  font-size: 13px;
  color: ${colors.gray};
`;

//my message
export const MyChatsWrap = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`;

export const MyTime = styled.div`
  display: flex;
  align-items: end;
  margin-top: 5px;
  margin-right: 5px;
  font-size: 13px;
  color: ${colors.gray};
`;

export const SpaceDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const SpaceSpan = styled.span`
  border: 1px solid ${colors.white};
  border-radius: 20px;
  padding: 3px 20px;
`;
