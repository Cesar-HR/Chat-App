import styled from "styled-components";
import { useState, useEffect } from "react";
import Logout from "./../Logout";

const ListContact = ({ contacts, currentUser, currentChat }) => {
  const [username, setUsername] = useState(undefined);
  const [avatar, setAvatar] = useState(undefined);
  const [chatSelected, setChatSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setAvatar(currentUser.avatarImage);
    }
  }, [currentUser]);

  const handleCurrentChat = (index, contact) => {
    setChatSelected(index);
    currentChat(contact);
  };

  return (
    <Container>
      <div className="brand">
        <h3>Chat App</h3>
      </div>

      <div className="contacts">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className={`contact ${index === chatSelected ? "selected" : ""}`}
            onClick={() => {
              handleCurrentChat(index, contact);
            }}
          >
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h3>{contact.username}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="current-user">
        <div className="description">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
          </div>
          <div className="username">
            <h3>{username}</h3>
          </div>
        </div>

        <Logout />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  border-radius: 7px;
  background-color: ${(props) => props.color.white};

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
      color: ${(props) => props.color.night};
      font-size: 1.5rem;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.5rem;

      &-thumb {
        background-color: ${(props) => props.color.gray_light};
      }
    }
  }

  .contact {
    background-color: ${(props) => props.color.gray_light};
    min-height: 5rem;
    width: 90%;
    cursor: pointer;
    border-radius: 0.2rem;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    transition: 0.5s ease-in-out;
    gap: 1rem;
    margin-top: 0.2rem;

    .avatar {
      img {
        height: 3.5rem;
      }
    }

    .username {
      h3 {
        color: ${(props) => props.color.night};
        font-size: 1rem;
      }
    }
  }

  .selected {
    background-color: ${(props) => props.color.green};
  }

  .current-user {
    background-color: ${(props) => props.color.gray_light};
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 2rem;

    .description {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }

    .avatar {
      height: 3.5rem;
      width: 3.5rem;
      max-inline-size: 100%;
    }

    .username {
      h3 {
        color: ${(props) => props.color.night};
        font-size: 1rem;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;

      .username {
        h2 {
          font-size: 1rem;
        }
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

export default ListContact;
