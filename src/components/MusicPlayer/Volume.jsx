import axios from "axios";
import { FaVolumeUp } from "react-icons/fa";
import styled from "styled-components";
import { useStateProvider } from "../../utils/StateProvider";

export default function Volume() {
  const [{ token }] = useStateProvider();
  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <Container>
      <FaVolumeUp />
      <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  svg {
    font-size: 1rem;
    color: #b3b3b3;
  }
  input {
    width: 10rem;
    cursor: pointer;
  }
`;
