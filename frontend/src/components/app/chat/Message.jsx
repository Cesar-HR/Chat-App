import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Message = ({ messages, scrollRef }) => {
  return (
    <Container>
      {messages.map((msg) => (
        <div key={uuidv4()} ref={scrollRef}>
          <div className={`message ${msg.fromSelf ? "sended" : "recieved"}`}>
            <div className="content">
              <p>{msg.message}</p>
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.4rem;

    &-thumb {
      background-color: #c3c1bc;
      width: 0.4rem;
      border-radius: 1rem;
    }
  }

  .message {
    display: flex;
    align-items: center;

    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #0a192f;
      font-family: "Josefin Sans", sans-serif;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }
  }

  .sended {
    justify-content: flex-end;

    .content {
      background-color: #d9fdd3;
    }
  }

  .recieved {
    justify-content: flex-start;

    .content {
      background-color: #d1d3d4;
    }
  }
`;

export default Message;
