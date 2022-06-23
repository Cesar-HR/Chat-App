import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../config/routes/publicRoutes";
import { BiPowerOff } from "react-icons/bi";
import { cleanStorage } from "../../utils/localStorage";

const Logout = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    cleanStorage();
    navigate(LOGIN);
  };

  return (
    <Container onClick={logoutUser}>
      <BiPowerOff />
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #000000;
  border: none;
  cursor: pointer;

  svg {
    font-size: 1.3rem;
    color: #ffffff;
  }
`;

export default Logout;
