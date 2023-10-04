import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../redux/config/ConfigStore";

const Navbar = () => {
  const { userState } = useSelector((state: RootState) => state.user);
  return (
    <NavContainer>
      <h1>Chats</h1>
      {userState._id ? <UserImg></UserImg> : <Link to={"/login"}>log in</Link>}
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.div`
  width: 100%;
  height: 60px;
  padding: 10px;
  margin-top: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > h1 {
    font-weight: 800;
    font-size: 20px;
  }
`;

const UserImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: aliceblue;
`;
