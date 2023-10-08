import styled from "styled-components";
import { colors } from "../../../style/theme/colors";

export const ListContainer = styled.div`
  width: 90%;
  height: 80px;
  padding: 5px;
  margin: 0 auto;
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.gray_100};
`;
export const ImgWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const UserImg = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
  background-color: ${colors.white};
`;

export const UserMame = styled.div`
  font-size: 18px;
  font-weight: 800;
`;

export const LastMessage = styled.div`
  font-size: 13px;
  color: ${colors.gray_200};
`;

export const Time = styled.div`
  font-size: 15px;
`;
