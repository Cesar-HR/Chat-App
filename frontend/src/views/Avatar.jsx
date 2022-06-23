import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAvatar } from "./../hooks/useAvatar";
import { APP, LOGIN } from "./../config/routes/publicRoutes";
import { getStorageItem } from "../utils/localStorage";

import { BiLoader } from "react-icons/bi";
import { toastConfig } from "./../utils/toastConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { setAvatarPicture } from "./../app/user/userAction";

const Avatar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((state) => state.user.success.status);
  const error = useSelector((state) => state.user.error);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const { avatars, isLoading, fetchAvatar } = useAvatar();
  const activeUser = getStorageItem(process.env.REACT_APP_LOCALSTORAGE_KEY);
  const currentUser = JSON.parse(activeUser);

  useEffect(() => {
    !activeUser && navigate(LOGIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAvatar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar !== undefined) {
      const imageValue = avatars[selectedAvatar];
      dispatch(setAvatarPicture(imageValue));
    } else {
      toast.error("You have to choose an avatar picture", toastConfig);
    }
  };

  useEffect(() => {
    if (success && currentUser.isAvatarImageSet) {
      navigate(APP);
    } else {
      if (error.status) {
        toast.error(error.message, toastConfig);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.isAvatarImageSet, error.status, success]);

  return (
    <>
      {isLoading ? (
        <Container>
          <BiLoader className="loader" />
          <p className="subtitle">Loading ...</p>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Choose an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            save
          </button>
        </Container>
      )}
      <ToastContainer limit={1} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: ${(props) => props.color.night};
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
    width: 50px;
    height: 50px;
    animation: spinner 3s linear infinite;
    color: ${(props) => props.color.green};
  }

  .subtitle {
    font-size: 20px;
    margin-top: -25px;
    color: ${(props) => props.color.light};
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .title-container {
    h1 {
      color: ${(props) => props.color.light};
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }

    .selected {
      border: 0.4rem solid ${(props) => props.color.green};
    }
  }

  .submit-btn {
    background-color: transparent;
    color: ${(props) => props.color.light};
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
`;

Container.defaultProps = {
  color: {
    light: "#ccd6f6",
    green: "#64ffda",
    night: "#0a192f",
    white: "#ffffff",
  },
};

export default Avatar;
