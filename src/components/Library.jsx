import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constant";
import { useStateProvider } from "../utils/StateProvider";

function Tracks() {
  const [{ token, tracks }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    let newToken = null;
    
    if (hash) {
      newToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      window.location.hash = "";
    }
    
    if (newToken) {
      axios
        .get("https://api.spotify.com/v1/me/tracks", {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        })
        .then((response) => {
          const { items } = response.data;
          const parsedTracks = items.map(({ track }) => ({
            name: track.name,
            id: track.id,
          }));
          dispatch({ type: reducerCases.SET_TRACKS, tracks: parsedTracks });
        })
        .catch((error) => {
          console.error("Error fetching tracks:", error);
        });
    }
  }, [dispatch]);

  const changeCurrentTrack = (selectedTrackId) => {
    dispatch({ type: reducerCases.SET_TRACK_ID, selectedTrackId });
  };

  return (
    <Container>
      <ul>
        {tracks.map(({ name, id }) => (
          <li key={id} onClick={() => changeCurrentTrack(id)}>
            {name}
          </li>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.7rem;

      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }

    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        color: white;
      }
    }
  }
`;

export default Tracks;
