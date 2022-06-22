import styled from "styled-components";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useValidation } from "./../../hooks/useValidation";
import { LOGIN, APP, AVATAR } from "./../../config/routes/publicRoutes";
import { getStorageItem } from "../../utils/localStorage";

import Text from "./../inputs/Text";
import Password from "./../inputs/Password";
import Loader from "./../extras/Loader";

import { useDispatch, useSelector } from "react-redux";
import { createUser } from "./../../app/user/userAction";

const FrmRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((state) => state.user.success.status);
  const error = useSelector((state) => state.user.error);
  const loader = useSelector((state) => state.user.loading);
  const { values, handleChangeInput, isInputValidForRegister, handleError } =
    useValidation();

  useEffect(() => {
    getStorageItem(process.env.REACT_APP_LOCALSTORAGE_KEY) && navigate(APP);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerUser = (evt) => {
    evt.preventDefault();
    if (isInputValidForRegister()) {
      dispatch(createUser(values));
    }
  };

  useEffect(() => {
    if (success) {
      navigate(AVATAR);
    } else {
      if (error.status) {
        handleError(error.message);
      }
    }
  }, [error.message, error.status, handleError, navigate, success]);

  return (
    <Container>
      <div className="form">
        <div className="brand">
          <h1>Chat App</h1>
        </div>
        <Text
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChangeInput}
          maxlength="16"
        />
        <Text
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChangeInput}
          maxlength="50"
        />
        <Password
          placeholder="Password"
          name="password"
          onChange={handleChangeInput}
          maxlength="16"
        />
        <Text
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={handleChangeInput}
        />
        <button className="button" onClick={registerUser}>
          {loader ? <Loader /> : "Register"}
        </button>
        <span>
          Already have an account? <Link to={LOGIN}>Login</Link>
        </span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: ${(props) => props.color.night};

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    h1 {
      color: ${(props) => props.color.white};
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid ${(props) => props.color.light};
      border-radius: 0.4rem;
      color: ${(props) => props.color.light};
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid ${(props) => props.color.green};
        outline: none;
      }
    }

    .button {
      background-color: transparent;
      color: white;
      padding: 1rem 2rem;
      border: 0.1rem solid ${(props) => props.color.green};
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;

      &:hover {
        background-color: rgba(100, 255, 218, 0.1);
      }
    }

    span {
      color: ${(props) => props.color.white};
      text-transform: uppercase;

      a {
        color: ${(props) => props.color.green};
        text-decoration: none;
        font-weight: bold;
      }
    }

    .icon-container {
      position: relative;
    }

    .icon-button {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1.2rem;
      border: none;
      cursor: pointer;
      background-color: transparent;
      user-select: none;

      &:focus {
        outline: none;
      }
    }

    .icon {
      color: ${(props) => props.color.light};
      width: 1rem;
      height: 1rem;
    }
  }
`;

Container.defaultProps = {
  color: {
    light: "#ccd6f6",
    green: "#64ffda",
    night: "#0a192f",
    white: "#ffffff",
  },
};

export default FrmRegister;
