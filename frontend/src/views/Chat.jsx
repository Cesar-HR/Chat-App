import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../config/routes/publicRoutes";
import { getStorageItem } from "../utils/localStorage";

import { BiLoader } from "react-icons/bi";
import Welcome from "./../components/app/Welcome";
import ListContact from "../components/app/chat/ListContact";
import BoxChat from "../components/app/chat/BoxChat";

import { io } from "socket.io-client";
import { host } from "../config/routes/endpoints";

import { useDispatch, useSelector } from "react-redux";
import { getAllContacts } from "./../app/user/userAction";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const success = useSelector((state) => state.user.success.status);
  const error = useSelector((state) => state.user.error);
  const loader = useSelector((state) => state.user.loading);
  const users = useSelector((state) => state.user.contacts);
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const activeUser = getStorageItem(process.env.REACT_APP_LOCALSTORAGE_KEY);

  useEffect(() => {
    async function isUserLogin() {
      if (!activeUser) {
        navigate(LOGIN);
      } else {
        setCurrentUser(await JSON.parse(activeUser));
      }
    }

    isUserLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user-online", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function getListOfContacts() {
      if (currentUser) {
        dispatch(getAllContacts(currentUser._id));
      }
    }

    getListOfContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (success) {
      setContacts(users);
    } else {
      if (error.status) {
        console.log(error.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error.status, success]);

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      {loader ? (
        <Container>
          <BiLoader className="loader" />
          <p className="subtitle">Loading ...</p>
        </Container>
      ) : success ? (
        <div className="box-chat">
          <ListContact
            contacts={contacts}
            currentUser={currentUser}
            currentChat={handleChangeChat}
          />

          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <BoxChat
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      ) : (
        <div className="error-container">{error.message}</div>
      )}
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

  .loader {
    max-inline-size: 100%;
    width: 50px;
    height: 50px;
    animation: spinner 3s linear infinite;
    color: ${(props) => props.color.green};
  }

  .subtitle {
    font-size: 20px;
    color: ${(props) => props.color.light};
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .box-chat {
    height: 85vh;
    width: 85vw;
    display: grid;
    grid-template-columns: 25% 75%;
    gap: 0.5rem;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }

  .error-container {
    color: ${(props) => props.color.light};
    font-size: 2rem;
  }
`;

Container.defaultProps = {
  color: {
    green: "#64ffda",
    light: "#ccd6f6",
    night: "#0a192f",
  },
};

export default Chat;
