import styled from "styled-components";
import { colors } from "../../style/theme/colors";

export const MsgContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${colors.white};
`;

export const TopBarName = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const ReturnBtn = styled.div`
  position: absolute;
  left: 10px;
`;

export const ChatInput = styled.div`
  width: 100%;
  height: 75px;
  padding: 0 10px;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatInputWrap = styled.div`
  width: 85%;
  height: 45px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: ${colors.message_input};

  & > input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 15px;
    color: ${colors.white};
    font-weight: 600;
    outline: none;
    border: none;
    background-color: inherit;
    border-radius: 20px;
  }
`;

export const ChatInputBtn = styled.button`
  width: 40px;
  height: 40px;
  margin-top: 2px;
  margin-left: 10px;
  border-radius: 50%;
  background-image: linear-gradient(
    90deg,
    ${colors.gradation_purple} 20%,
    ${colors.gradation_pink} 80%
  );
`;
