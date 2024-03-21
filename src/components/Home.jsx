import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import "../styles.scss";

const AlbumCard = styled.div`
  border: 1px solid transparent; /* Initial transparent border */
  border-radius: 15px;
  padding: 5px;
  margin: 10px;
  max-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow for floating effect */
  transition: all 0.3s ease; /* Transition effect for smooth animation */
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f8f47e;

  &:hover {
    border-color: #fb0101; /* Border color on hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Box shadow on hover */
    background-color: #202020; /* Background color on hover */
  }
`;

const AlbumImage = styled.img`
  width: 100%; /* Set image width to cover the entire card */
  height: auto; /* Set image height to auto to maintain aspect ratio */
  border-radius: 10px; /* Ensure border radius is applied to the image */
`;

const PlaylistCard = styled.div`
  border: 1px solid transparent; /* Initial transparent border */
  border-radius: 15px;
  padding: 5px;
  margin: 10px;
  max-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow for floating effect */
  transition: all 0.3s ease; /* Transition effect for smooth animation */
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f8f47e;

  &:hover {
    border-color: #fcf8f8; /* Border color on hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Box shadow on hover */
    background-color: #202020; /* Background color on hover */
  }
`;

const PlaylistImage = styled.img`
  width: 100%; /* Set image width to cover the entire card */
  height: auto; /* Set image height to auto to maintain aspect ratio */
  border-radius: 15px; /* Ensure border radius is applied to the image */
`;

function Home() {
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);

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

  useEffect(() => {
    if (token) {
      fetchTopAlbums();
      fetchFeaturedPlaylists();
    }
  }, [token]);

  const fetchTopAlbums = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/new-releases",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 30, // Adjust as needed
          },
        }
      );
      setAlbums(response.data.albums.items);
    } catch (error) {
      console.error("Error fetching top albums:", error.message);
    }
  };

  const fetchFeaturedPlaylists = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/featured-playlists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 30, // Adjust as needed
          },
        }
      );
      setPlaylists(response.data.playlists.items);
    } catch (error) {
      console.error("Error fetching featured playlists:", error.message);
    }
  };

  const handleAlbumClick = (albumId) => {
    window.location.href = `/music/albums/${albumId}`;
  };

  const handlePlaylistClick = (playlistId) => {
    window.location.href = `/playlist/playlists/${playlistId}`;
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="Home">
      {!token ? (
        <Link to="/login">Login to Spotify</Link>
      ) : (
        <>
          <button onClick={logout}>Logout</button>
          <div className="scrollable-row">
            <h2>Top Albums</h2>
            <div className="album-container">
              <div className="album-list">
                {albums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    onClick={() => handleAlbumClick(album.id)}
                  >
                    {album.images.length > 0 && (
                      <AlbumImage src={album.images[0].url} alt={album.name} />
                    )}
                    <p>{album.name}</p>
                    <p>
                      By:{" "}
                      {album.artists.map((artist) => artist.name).join(", ")}
                    </p>
                  </AlbumCard>
                ))}
              </div>
            </div>
          </div>
          <div className="scrollable-row">
            <h2>Featured Playlists</h2>
            <div className="playlist-container">
              <div className="playlist-list">
                {playlists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    onClick={() => handlePlaylistClick(playlist.id)}
                  >
                    {playlist.images.length > 0 && (
                      <PlaylistImage
                        src={playlist.images[0].url}
                        alt={playlist.name}
                      />
                    )}
                    <p>{playlist.name}</p>
                    <p>By: {playlist.owner.display_name}</p>
                  </PlaylistCard>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
