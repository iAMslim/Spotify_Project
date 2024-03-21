import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constant";

function Tracks() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let accessToken = window.localStorage.getItem("token");
    if (!accessToken && hash) {
      accessToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", accessToken);
    }
    setToken(accessToken);
  }, []);

  useEffect(() => {
    if (token) {
      console.log("Fetching user's saved tracks...");
      axios
        .get("https://api.spotify.com/v1/me/tracks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Tracks fetched:", response.data);
          const { items } = response.data;
          const parsedTracks = items.map(({ track }) => ({
            name: track.name,
            id: track.id,
          }));
          console.log("Parsed tracks:", parsedTracks);
          setTracks(parsedTracks);
        })
        .catch((error) => {
          console.error("Error fetching tracks:", error);
        });
    }
  }, [token]);

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
