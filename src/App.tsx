import { ThemeProvider } from "styled-components";
import "./App.css";
import GlobalStyles from "./style/GlobalStyle";
import { theme } from "./style/theme/index";
import Router from "./shared/Router";
import { Provider } from "react-redux";
import store from "./redux/config/ConfigStore";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router />
          <GlobalStyles />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
