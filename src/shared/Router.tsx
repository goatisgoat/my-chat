import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Resister from "../pages/resister/Resister";
import GlobalLayout from "../components/common/GlobalLayout";
import Message from "../pages/message/Message";
import PrivateRoute from "../privateRrote/PrivateRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/resister" element={<Resister />} />
        <Route
          path="/message/:id"
          element={
            <PrivateRoute>
              <Message />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
