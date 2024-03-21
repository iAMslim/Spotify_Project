import axios from "axios";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Search({ navBackground }) {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const searchArtist = async (searchValue) => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchValue,
          type: "artist",
        },
      });
      setArtists(data.artists.items);
    } catch (error) {
      console.error("Error searching artist:", error.message);
    }
  };

  const getTracks = (artistId) => {
    const accessToken = window.localStorage.getItem("token");
    if (!accessToken) {
      console.error("No access token available.");
      return;
    }
    axios
      .get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTracks(response.data.tracks);
        setSelectedArtist(artistId);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error.message);
      });
  };

  const toggleTracksVisibility = () => {
    setTracks([]);
    setSelectedArtist(null);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchKey(value);
    if (value.trim() !== "") {
      searchArtist(value);
    } else {
      setArtists([]);
    }
  };

  return (
    <Container navBackground={navBackground}>
      <div className="search__bar">
        <FaSearch />
        <input
          type="text"
          value={searchKey}
          onChange={handleInputChange}
          placeholder="Artists, songs, or podcasts"
        />
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
              {selectedArtist === artist.id ? (
                <>
                  <button onClick={toggleTracksVisibility}>Hide Tracks</button>
                  <ul>
                    {tracks.map((track) => (
                      <li key={track.id}>{track.name}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <button onClick={() => getTracks(artist.id)}>
                  Show Tracks
                </button>
              )}
            </ArtistCard>
          ))}
        </ArtistContainer>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
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
`;

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
