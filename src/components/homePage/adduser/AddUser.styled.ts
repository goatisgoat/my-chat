import styled from "styled-components";
import { colors } from "../../../style/theme/colors";

export const Container = styled.div`
  width: 90%;
  padding: 5px;
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

export const AddBtn = styled.div`
  width: 45px;
  height: 45px;
  margin-right: 25px;
  border-radius: 50%;
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    90deg,
    ${colors.add_purple} 20%,
    ${colors.add_Pink} 80%
  );
  cursor: pointer;
`;

export const OnLineUser = styled.div`
  width: 55px;
  height: 55px;
  margin-right: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    90deg,
    ${colors.add_purple} 20%,
    ${colors.add_Pink} 80%
  );
  position: relative;
  cursor: pointer;
`;

export const OnLineUserImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  background-color: ${colors.white};
`;

export const OnLineCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${colors.online_green};
  bottom: 5px;
  right: 5px;
  position: absolute;
`;

///modal
export const ModalOuter = styled.div`
  background-color: rgba(2, 1, 1, 0.493);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const ModalInner = styled.div`
  width: 100%;
  height: 90%;
  padding: 20px;
  background-color: ${colors.modal_inner};
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

export const ListTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
`;

export const UserList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.gray_100};
  padding: 10px 0;
`;

export const UserListImg = styled.div`
  display: flex;
  align-items: center;
`;

export const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

export const MakeMsgBtn = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid ${colors.make_chat_pink_btn};
  cursor: pointer;
`;
