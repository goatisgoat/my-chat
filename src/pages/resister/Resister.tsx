import { useState } from "react";
import api from "../../utils/api";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/ConfigStore";
import * as S from "./Resister.styled";

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
      const userImgUrl =
        "https://static.thenounproject.com/png/1743561-200.png";
      const response = await api.post("/user", {
        name,
        email,
        password,
        userImgUrl,
      });

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
    <S.SignContainer>
      <S.H1>Sign up</S.H1>

      <S.Form onSubmit={handleResister}>
        <S.InputWrap $isFirst={true}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </S.InputWrap>
        <S.InputWrap $isFirst={false}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </S.InputWrap>
        <S.InputWrap $isFirst={false}>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </S.InputWrap>

        <S.SignBtn type="submit">Sign up</S.SignBtn>
      </S.Form>
    </S.SignContainer>
  );
};

export default Resister;
