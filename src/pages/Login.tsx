import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userInfo } from "../redux/modules/userSlice";
import api from "../utils/api";
import { RootState } from "../redux/config/ConfigStore";

const Login = () => {
  const { userState } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/login", { email, password });
      if (response.status === 200) {
        dispatch(userInfo(response.data.user));
        sessionStorage.setItem("token", response.data.token);
        navigate("/");
      }

      throw new Error();
    } catch (error) {
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  if (userState._id) {
    return <Navigate to={"/"} />;
  }

  return (
    <LoginContainer>
      <H1>Log in</H1>
      <Form onSubmit={handleLogin}>
        <InputWrap $isFirst={true}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </InputWrap>
        <InputWrap $isFirst={false}>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </InputWrap>
        <LoginBtn>Log in</LoginBtn>
      </Form>
      <HaveAccount>
        Don't you have an account? <SignColor to="/resister">Sign up</SignColor>
      </HaveAccount>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
`;

const H1 = styled.h1`
  font-weight: 900;
  font-size: 30px;
`;

const Form = styled.form`
  width: 100%;
`;

const InputWrap = styled.div<{ $isFirst: boolean }>`
  width: 80%;
  height: 60px;
  margin: 0 auto;
  margin-bottom: 30px;
  border-bottom: 1px solid white;
  margin-top: ${(props) => (props.$isFirst === true ? "60px" : 0)};

  & > input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 15px;
    color: white;
    font-weight: 600;
    outline: none;
    border: none;
    background-color: inherit;
  }
`;

const HaveAccount = styled.div`
  width: 80%;
  margin-top: 40px;
  font-size: 13px;
  color: #afafaf;
  display: flex;
  justify-content: center;
`;

const SignColor = styled(Link)`
  margin-left: 10px;
  cursor: pointer;

  &:link,
  &:focus,
  &:active,
  &:visited,
  &:hover {
    color: #b1b1eb;
  }
`;

const LoginBtn = styled.button`
  width: 80%;
  height: 60px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  color: white;
  border-radius: 5px;
  background-image: linear-gradient(90deg, #8049ff 20%, #e641ff 80%);
`;
