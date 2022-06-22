import styled from "styled-components";
import { RiLoader3Fill } from "react-icons/ri";

const Loader = () => {
  return (
    <Container>
      <div className="spinner">
        <RiLoader3Fill className="spinning" size={30} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  .spinner {
    display: grid;
    align-content: center;
    justify-content: center;
  }

  .spinning {
    animation: spinner 1s linear infinite;
    color: #64ffda;
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
