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
      const itms = response.data.albums.items;
      const newReleases = itms.map(({ id, name, images, artists }) => {
        return { id, name, images, artists };
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
      const itms = response.data.playlists.items;
      const featuredPlaylists = itms.map(({ id, name, images }) => {
        return { id, name, images };
      });
      dispatch({
        type: reducerCases.SET_FEATURED_PLAYLISTS,
        featuredPlaylists,
      });
    };
    fetchFeaturedPlaylists();
  }, [token, dispatch]);
  
  return (
    <Container>
      <div className="album-container">
        <h1>New Releases</h1>
        <div className="scrollable-row">
          <div className="album-list">
            {newReleases.map(({ id, name, images, artists }) => {
              return (
                <div className="album-card" key={id}>
                  <img src={images[0].url} alt="New Releases" />
                  <p>{name}</p>
                  <p>By: {artists.map((artist) => artist.name).join(", ")}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="playlist-container">
        <h1>Spotify Playlists</h1>
        <div className="scrollable-row">
          <div className="playlist-list">
            {featuredPlaylists.map(({ id, name, images }) => {
              return (
                <div className="playlist-card" key={id}>
                  <img src={images[0].url} alt="Featured Playlists" />
                  <p>{name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 1000px;
  .album-container {
    max-height: 450px;
    margin: 2rem;
    h1 {
      color: white;
    }
    .scrollable-row {
      max-height: 500px;
      overflow-y: auto;
      &::-webkit {
        &-scrollbar {
          width: 0.75rem;
          &-track {
            background-color: #b3b3b3;
            border-radius: 0.75rem;
          }
          &-thumb {
            background-color: #181818;
            border-radius: 0.75rem;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .album-list {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .album-card {
      border: 1px solid transparent;
      border-radius: 1rem;
      padding: 0.5rem;
      margin: 0.5rem;
      min-width: 350px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      background-color: #181818;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #b3b3b3;
      img {
        width: 100%;
        height: auto;
        border-radius: 1rem;
      }
      &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        background-color: #202020;
      }
    }
  }
  .playlist-container {
    max-height: 450px;
    margin: 2rem;
    h1 {
      color: white;
    }
    .scrollable-row {
      max-height: 500px;
      overflow-y: auto;
      &::-webkit {
        &-scrollbar {
          width: 0.75rem;
          &-track {
            background-color: #b3b3b3;
            border-radius: 0.75rem;
          }
          &-thumb {
            background-color: #181818;
            border-radius: 0.75rem;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .playlist-list {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .playlist-card {
      border: 1px solid transparent;
      border-radius: 1rem;
      padding: 0.5rem;
      margin: 0.5rem;
      min-width: 350px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      background-color: #181818;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #b3b3b3;
      img {
        width: 100%;
        height: auto;
        border-radius: 1rem;
      }
      &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        background-color: #202020;
      }
    }
  }
`;

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
