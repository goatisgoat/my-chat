import { ThemeProvider } from "styled-components";
import "./App.css";
import GlobalStyles from "./style/GlobalStyle";
import { theme } from "./style/theme/index";
import Router from "./shared/Router";
import { useDispatch } from "react-redux";
import api from "./utils/api";
import { useEffect } from "react";
import { userInfo } from "./redux/modules/userSlice";

function App() {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        const response = await api.get(`/user/auth/me`);

        if (response.status === 200) {
          return dispatch(userInfo(response.data.user));
        }
      }

      throw new Error();
    } catch (error) {
      console.log(error);
      dispatch(
        userInfo({ name: null, email: null, _id: null, userImgUrl: null })
      );
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
        <GlobalStyles />
      </ThemeProvider>
    </>
  );
}

export default App;
