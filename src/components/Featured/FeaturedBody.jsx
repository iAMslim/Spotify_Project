import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/Constant";

export default function FeaturedBody() {
  const [{ token, newReleases, featuredPlaylists }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const fetchTopAlbums = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/new-releases",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          params: {
            limit: 30,
          },
        }
      );
      console.log(response);
      const itms = response.data.albums.items;
      const newReleases = itms.map(({ id, name }) => {
        return { id, name };
      });
      dispatch({ type: reducerCases.SET_NEW_RELEASES, newReleases });
    };
    fetchTopAlbums();
  }, [token, dispatch]);

  useEffect(() => {
    const fetchFeaturedPlaylists = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/featured-playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          params: {
            limit: 30,
          },
        }
      );
      console.log(response);
      const itms = response.data.playlists.items;
      const featuredPlaylists = itms.map(({ id, name }) => {
        return { id, name };
      });
      dispatch({
        type: reducerCases.SET_FEATURED_PLAYLISTS,
        featuredPlaylists,
      });
    };
    fetchFeaturedPlaylists();
  }, [token, dispatch]);

  // const handleAlbumClick = (albumId) => {
  //   window.location.href = `/music/albums/${albumId}`;
  // };

  // const handlePlaylistClick = (playlistId) => {
  //   window.location.href = `/playlist/playlists/${playlistId}`;
  // };

  return (
    <div className="container">
      <div>
        {newReleases.map(({ id, name }) => {
          return (
            <div key={id}>
              <p>{name}</p>
            </div>
          );
        })}
      </div>
      <div>
        {featuredPlaylists.map(({ id, name }) => {
          return (
            <div key={id}>
              <p>{name}</p>
            </div>
          );
        })}
      </div>
      {/* <div className="scrollable-row">
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
                  By: {album.artists.map((artist) => artist.name).join(", ")}
                </p>
              </AlbumCard>
            ))}
          </div>
        </div>
      </div>
      <br />
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
      </div> */}
    </div>
  );
}

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
