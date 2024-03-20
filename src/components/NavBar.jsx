import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
// import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useEffect, useState } from "react";
import { reducerCases } from "../utils/Constant";

export default function Navbar({ navBackground }) {
  const [{ userInfo }, { token }, dispatch] = useStateProvider();
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  // useEffect(() => {
  //   const hash = window.location.hash;
  //   if (hash) {
  //     const token = hash.substring(1).split("&")[0].split("=")[1];
  //     if (token) {
  //       dispatch({ type: reducerCases.SET_TOKEN, token });
  //     }
  //   }
  // }, [dispatch, token]);

  // useEffect(() => {
  //   const search = async (album) => {
  //     const response = await axios.get("https://api.spotify.com/v1/search", {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "application/json",
  //       },
  //       params: {
  //         q: album,
  //         type: "artist",
  //       },
  //     });
  //     const { artists } = response.data;
  //     console.log(response.data);
  //   };
  // });

  return (
    <Container navBackground={navBackground}>
      {/* <div className="search__bar">
        <FaSearch />
        <input
          type="text"
          value={searchKey}
          onChange={handleInputChange}
          placeholder="Artists, songs, or podcasts"
        />
        <input type="text" placeholder="Artists, songs, or podcasts" />
      </div> */}
      <div className="avatar">
        <a href={userInfo?.userUrl}>
          <CgProfile />
          <span>{userInfo?.name}</span>
        </a>
      </div>
      <div>
        <ArtistContainer>
          {artists.map((artist) => (
            <ArtistCard key={artist.id}>
              {artist.images.length > 0 && (
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  style={{ width: "auto", height: "250px" }}
                />
              )}
              <p>{artist.name}</p>
            </ArtistCard>
          ))}
        </ArtistContainer>
      </div>
    </Container>
  );
}
const ArtistCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArtistContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
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
  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: #181818;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: ;
    align-items: center;
    a {
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
