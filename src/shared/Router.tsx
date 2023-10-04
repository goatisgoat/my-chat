import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Resister from "../pages/Resister";
import GlobalLayout from "../components/GlobalLayout";
import Message from "../pages/Message";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/resister" element={<Resister />} />
        <Route path="/message/:id" element={<Message />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;