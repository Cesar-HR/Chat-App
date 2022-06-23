import styled from "styled-components";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img
        src={process.env.PUBLIC_URL + `/img/logo.webp`}
        alt="chat application logo"
      />
      <div className="title">
        <h1>
          Welcome, <span>{currentUser ? currentUser.username : "user"}</span>!
        </h1>
      </div>
      <h3>Now send and receive messages in Chat App. Start Messaging.</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 7px;
  background-color: ${(props) => props.color.white};
  color: ${(props) => props.color.night};

  img {
    height: 10rem;
  }

  .title {
    margin: 1rem 0;
  }

  span {
    color: ${(props) => props.color.green};
  }
`;

Container.defaultProps = {
  color: {
    green: "#00b384",
    night: "#0a192f",
    white: "#ffffff",
  },
};

export default Welcome;
