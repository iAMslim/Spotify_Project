import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function Navbar({ navBackground }) {
  const [{ userInfo }, { token }, dispatch] = useStateProvider();
  const navigate = useNavigate();

  return (
    <Container navBackground={navBackground}>
      <div className="avatar">
        <div className="avatar-link" onClick={() => navigate("/profile")}>
          <CgProfile />
          <span>{userInfo?.name}</span>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 2rem 1rem 1rem;
  height: 5vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "#181818" : "none"};
  .avatar {
    background-color: #181818;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: ;
    align-items: center;
    .avatar-link {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
