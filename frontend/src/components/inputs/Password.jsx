import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const Password = ({ placeholder, name, onChange, maxlength }) => {
  const [isPasswordHide, setIsPasswordHide] = useState(false);
  const [isPasswordType, setIsPasswordType] = useState("password");

  const handleShowPassword = () => {
    if (isPasswordType === "password") {
      setIsPasswordType("text");
      setIsPasswordHide(false);
    } else {
      setIsPasswordType("password");
      setIsPasswordHide(true);
    }
  };

  return (
    <div className="icon-container">
      <input
        type={isPasswordType}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        maxLength={maxlength}
      />
      <button className="icon-button" onClick={handleShowPassword}>
        {isPasswordHide ? (
          <AiFillEyeInvisible className="icon" />
        ) : (
          <AiFillEye className="icon" />
        )}
      </button>
    </div>
  );
};

export default Password;
