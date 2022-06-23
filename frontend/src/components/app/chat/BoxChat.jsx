import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

import InputChat from "./../../inputs/InputChat";
import Message from "./../chat/Message";

import { useDispatch, useSelector } from "react-redux";
import { sendMessage, receivedMessage } from "./../../../app/message/msgAction";

const BoxChat = ({ currentChat, currentUser, socket }) => {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const receivedMsg = useSelector((state) => state.message.message);
  const success = useSelector((state) => state.message.success.status);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    if (currentChat) {
      dispatch(receivedMessage(currentUser._id, currentChat._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  useEffect(() => {
    if (success) {
      setMessages(receivedMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const handleSendMessage = async (msg) => {
    socket.current.emit("send-message", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    dispatch(sendMessage(currentUser._id, currentChat._id, msg));

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message-received", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>

          <Message messages={messages} scrollRef={scrollRef} />
          <InputChat handleSendMessage={handleSendMessage} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  background-color: ${(props) => props.color.white};
  border-radius: 7px;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: ${(props) => props.color.gray_light};

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: ${(props) => props.color.night};
        }
      }
    }
  }
`;

Container.defaultProps = {
  color: {
    night: "#0a192f",
    white: "#ffffff",
    gray_light: "#f5f5f5",
  },
};

export default BoxChat;
