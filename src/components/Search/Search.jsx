import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../NavBar";
import Sidebar from "../Sidebar";
import Footer from "../MusicPlayer/Footer";
import axios from "axios";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/Constant";
import SearchBody from "./SearchBody";

export default function Search() {
  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
        image: data.images,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  useEffect(() => {
    const getPlaybackState = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: data.is_playing,
      });
    };
    getPlaybackState();
  }, [dispatch, token]);
  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground} />
          <div className="body__contents">
            <SearchBody headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 90vh 10vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background-color: black;
    .body {
      background: linear-gradient(transparent, rgba(0, 0, 0, 1));
      background-color: rgb(192, 31, 31);
      border-radius: 0.75rem;
      margin-top: 1rem;
      height: 100%;
      width: 99%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 1rem;
        max-height: 1rem;
        background-color: #181818;
        border-radius: 0 0.75rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 0.75rem;
        }
      }
    }
  }
`;
