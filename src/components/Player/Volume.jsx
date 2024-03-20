import axios from "axios";
<<<<<<<< HEAD:src/components/Player/Volume.jsx
========
import { FaVolumeUp } from "react-icons/fa";
>>>>>>>> main:src/components/musicPlayer/Volume.jsx
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
      <div>
        <FaVolumeUp style={{ fontSize: "1.5rem", color: "white" }} />
      </div>
      <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    padding: 2px;
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;
