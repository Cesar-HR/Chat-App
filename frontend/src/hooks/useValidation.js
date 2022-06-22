import { useState } from "react";
import { toast } from "react-toastify";
import { toastConfig } from "./../utils/toastConfig";

export function useValidation() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeInput = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const isInputValidForRegister = () => {
    const { username, email, password, confirmPassword } = values;

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.warn("All fields are required.", toastConfig);
      return false;
    } else if (username.length < 5) {
      toast.warn("Username should be greater than 5 characters.", toastConfig);
      return false;
    } else if (password.length < 8) {
      toast.warn("Password should be greater than 8 characters.", toastConfig);
      return false;
    } else if (password !== confirmPassword) {
      toast.warn("Password and confirm password should be same.", toastConfig);
      return false;
    }

    return true;
  };

  const isInputValidForLogin = () => {
    const { username, password } = values;

    if (username === "") {
      toast.warn("Username is required", toastConfig);
      return false;
    } else if (password === "") {
      toast.warn("Password is required", toastConfig);
      return false;
    }

    return true;
  };

  const handleError = (error) => {
    toast.error(error, toastConfig);
  };

  return {
    values,
    setValues,
    handleChangeInput,
    isInputValidForRegister,
    isInputValidForLogin,
    handleError,
  };
}
