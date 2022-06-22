import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LOGIN, REGISTER, APP, AVATAR } from "./config/routes/publicRoutes";
import Login from "./views/Login";
import Register from "./views/Register";
import Avatar from "./views/Avatar";
import Chat from "./views/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={REGISTER} element={<Register />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={AVATAR} element={<Avatar />} />
        <Route path={APP} element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
