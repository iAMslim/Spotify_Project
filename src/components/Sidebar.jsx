import styled from "styled-components";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import Playlists from "./Playlist";

export default function Sidebar() {
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          />
        </div>
        <ul>
          <div className="card">
            <li>
              <span>
                <MdHomeFilled />
              </span>
              <span>Home</span>
            </li>
            <br />
            <li>
              <span>
                <MdSearch />
              </span>
              <span>Search</span>
            </li>
          </div>
          <div className="card">
            <li>
              <span>
                <IoLibrary />
              </span>
              <span>Your Library</span>
            </li>
            <br />
            <Playlists />
          </div>
        </ul>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    .card {
      background-color: #181818;
      border-radius: 0.5rem;
      padding: 1rem 0.5rem;
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 0.5rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: gray;
        }
      }
    }
  }
`;
