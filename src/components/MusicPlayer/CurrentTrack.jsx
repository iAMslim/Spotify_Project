import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/Constant";

export default function CurrentTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data !== "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);
  return (
    <Container>
      {currentPlaying && (
        <div className="track">
          <div className="track-image">
            <img src={currentPlaying.image} alt="currentPlaying" />
          </div>
          <div className="track-info">
            <h4 className="track-info-track-name">{currentPlaying.name}</h4>
            <h6 className="track-info-track-artists">
              {currentPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &-image {
    }
    &-info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &-track-name {
        color: white;
      }
      &-track-artists {
        color: #b3b3b3;
      }
    }
  }
`;
