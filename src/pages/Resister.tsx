import { useState } from "react";
import styled from "styled-components";
import api from "../utils/api";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/ConfigStore";

const Resister = () => {
  const { userState } = useSelector((state: RootState) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null | unknown>(null);

  const navigate = useNavigate();

  const handleResister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/user", { name, email, password });

      if (response.status === 200) {
        return navigate("/login");
      } else throw new Error(response.data.error);
    } catch (error: unknown) {
      // setError(error.message);
    }
  };

  if (userState._id) {
    return <Navigate to={"/"} />;
  }

  return (
    <SignContainer>
      <H1>Sign up</H1>

      <Form onSubmit={handleResister}>
        <InputWrap $isFirst={true}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </InputWrap>
        <InputWrap $isFirst={false}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputWrap>
        <InputWrap $isFirst={false}>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputWrap>

        <SignBtn type="submit">Sign up</SignBtn>
      </Form>
    </SignContainer>
  );
};

export default Resister;

const SignContainer = styled.div`
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

const SignBtn = styled.button`
  width: 80%;
  height: 60px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  border-radius: 5px;
  color: white;
  background-image: linear-gradient(90deg, #8049ff 20%, #e641ff 80%);
`;
