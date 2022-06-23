import { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";

import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "./../../utils/toastConfig";

const InputChat = ({ handleSendMessage }) => {
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPanel = () => {
    setShowEmojiPanel(!showEmojiPanel);
  };

  const handleEmojiSelection = (event, emoji) => {
    let msg = message;
    msg += emoji.emoji;
    setMessage(msg);
  };

  const sendMessage = (evt) => {
    evt.preventDefault();
    if (message.length > 0) {
      handleSendMessage(message);
      setMessage("");
    } else {
      toast.warn("You must to complete empty field.", toastConfig);
    }
  };

  return (
    <>
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPanel} />
            {showEmojiPanel && <Picker onEmojiClick={handleEmojiSelection} />}
          </div>
        </div>
        <form className="input-container">
          <input
            type="text"
            placeholder="Type your message here"
            value={message}
            onChange={(evt) => setMessage(evt.target.value)}
          />
          <button onClick={sendMessage}>
            <IoMdSend />
          </button>
        </form>
      </Container>
      <ToastContainer limit={1} />
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  justify-items: center;
  align-items: center;
  padding: 0.7rem 3rem;
  background-color: ${(props) => props.color.gray_light};

  .button-container {
    display: flex;
    align-items: center;

    .emoji {
      position: relative;

      svg {
        font-size: 1.8rem;
        color: ${(props) => props.color.night};
        cursor: pointer;
      }

      .emoji-picker-react {
        position: absolute;
        top: -355px;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          width: 5px;

          &-thumb {
            background-color: #a8a8a8;
          }
        }
      }
    }
  }

  .input-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    input {
      width: 90%;
      height: 60%;
      background-color: ${(props) => props.color.white};
      color: ${(props) => props.color.night};
      border: none;
      padding: 1rem;
      font-size: 1.2rem;
      font-family: "Josefin Sans", sans-serif;
      border-radius: 1rem;

      &::selection {
        background-color: #c8c8c8;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.3rem 1.5rem;
      border-radius: 0.7rem;
      background-color: ${(props) => props.color.night};
      cursor: pointer;
      border: none;

      svg {
        font-size: 1.8rem;
        color: white;
      }

      &:focus {
        outline: none;
      }
    }
  }
`;

Container.defaultProps = {
  color: {
    light: "#ccd6f6",
    green: "#64ffda",
    night: "#0a192f",
    white: "#ffffff",
    gray_light: "#f5f5f5",
  },
};

export default InputChat;
