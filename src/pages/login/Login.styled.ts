import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../style/theme/colors";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.white};
`;

export const H1 = styled.h1`
  font-weight: 900;
  font-size: 30px;
`;

export const Form = styled.form`
  width: 100%;
`;

export const InputWrap = styled.div<{ $isFirst: boolean }>`
  width: 80%;
  height: 60px;
  margin: 0 auto;
  margin-bottom: 30px;
  border-bottom: 1px solid ${colors.white};
  margin-top: ${(props) => (props.$isFirst === true ? "60px" : 0)};

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
  }
`;

export const HaveAccount = styled.div`
  width: 80%;
  margin-top: 40px;
  font-size: 13px;
  color: ${colors.gray_900};
  display: flex;
  justify-content: center;
`;

export const SignColor = styled(Link)`
  margin-left: 10px;
  cursor: pointer;

  &:link,
  &:focus,
  &:active,
  &:visited,
  &:hover {
    color: ${colors.pastel_purple};
  }
`;

export const LoginBtn = styled.button`
  width: 80%;
  height: 60px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  color: ${colors.white};
  border-radius: 5px;
  background-image: linear-gradient(
    90deg,
    ${colors.gradation_purple} 20%,
    ${colors.gradation_pink} 80%
  );
`;
