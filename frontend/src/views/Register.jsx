import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FrmRegister from "./../components/forms/FrmRegister";

const Register = () => {
  return (
    <>
      <FrmRegister />
      <ToastContainer limit={1} />
    </>
  );
};

export default Register;
