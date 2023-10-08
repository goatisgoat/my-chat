import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { userInfo } from "../../redux/modules/userSlice";
import api from "../../utils/api";
import { RootState } from "../../redux/config/ConfigStore";
import * as S from "./Login.styled";

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
    <S.LoginContainer>
      <S.H1>Log in</S.H1>
      <S.Form onSubmit={handleLogin}>
        <S.InputWrap $isFirst={true}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </S.InputWrap>
        <S.InputWrap $isFirst={false}>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </S.InputWrap>
        <S.LoginBtn>Log in</S.LoginBtn>
      </S.Form>
      <S.HaveAccount>
        Don't you have an account?{" "}
        <S.SignColor to="/resister">Sign up</S.SignColor>
      </S.HaveAccount>
    </S.LoginContainer>
  );
};

export default Login;
