import styled from "styled-components";
import { colors } from "../../../style/theme/colors";

export const SearchContainer = styled.div`
  width: 80%;
  height: 40px;
  margin: 30px auto;
  border: 1px solid ${colors.white};
  border-radius: 20px;

  & > input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 15px;
    outline: none;
    border: none;
    border-radius: 19px;
  }
`;
