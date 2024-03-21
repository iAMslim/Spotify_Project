import styled from "styled-components";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import Playlists from "./Playlist";
import { useNavigate } from "react-router-dom";
import { RiVipCrownFill } from "react-icons/ri";
export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://scontent.fsac1-2.fna.fbcdn.net/v/t1.15752-9/430423565_429507032784266_7625177144558019082_n.png?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=WGG6ryWaRwMAX-EYfqN&_nc_ht=scontent.fsac1-2.fna&oh=03_AdTrnIfKpKpF_DpMAQn1MS5jxFqPEQfoO2uiUTiVKVssaw&oe=6621D16D"
            alt="spotify"
            onClick={() => navigate("/")}
          />
        </div>
        <ul>
          <li onClick={() => navigate("/")}>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li onClick={() => navigate("/search")}>
            <MdSearch />
            <span>Search</span>
          </li>
          <li onClick={() => navigate("/featured")}>
            <RiVipCrownFill />
            <span>Featured</span>
          </li>
          <li onClick={() => navigate("/library")}>
            <IoLibrary />
            <span>Your Library</span>
          </li>
        </ul>
        <Playlists />
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
      cursor: pointer;
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
