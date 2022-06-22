import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FrmLogin from "./../components/forms/FrmLogin";

const Login = () => {
  return (
    <>
      <FrmLogin />
      <ToastContainer limit={1} />
    </>
  );
};

export default Login;
