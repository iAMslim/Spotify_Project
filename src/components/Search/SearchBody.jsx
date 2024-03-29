import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { useStateProvider } from "../../utils/StateProvider";

export default function SearchBody() {
  const [{ token }] = useStateProvider();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedArtistAlbums, setSelectedArtistAlbums] = useState([]);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  useEffect(() => {
    const searchArtists = async (searchValue) => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          params: {
            q: searchValue,
            type: "artist",
          },
        });
        console.log("Search result:", response.data);
        setSearchResults(response.data.artists.items);
      } catch (error) {
        console.error("Error searching artist:", error.message);
      }
    };

    if (searchInput && token) {
      searchArtists(searchInput);
    }
  }, [token, searchInput]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleMoreInfo = async (artistId) => {
    try {
      if (selectedArtist && selectedArtist.id === artistId) {
        setIsInfoVisible(!isInfoVisible);
        return;
      }

      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Albums for artist:", response.data.items);
      setSelectedArtistAlbums(response.data.items);
      setSelectedArtist(searchResults.find((artist) => artist.id === artistId));
      setIsInfoVisible(true);
    } catch (error) {
      console.error("Error fetching albums:", error.message);
    }
  };

  return (
    <Container>
      <SearchBar>
        <FaSearch />
        <input
          type="text"
          placeholder="Search for an Artist"
          value={searchInput}
          onChange={handleInputChange}
        />
      </SearchBar>
      <SearchResults>
        <h2>Artists</h2>
        <ScrollableRow>
          <ul>
            {searchResults.map((artist) => (
              <li key={artist.id}>
                <ArtistCard>
                  {artist.images.length > 0 && (
                    <ArtistImage src={artist.images[0].url} alt={artist.name} />
                  )}
                  <ArtistNameLink href={`/tracks/${artist.id}`}>
                    {artist.name}
                  </ArtistNameLink>
                  <MoreInfoButton onClick={() => handleMoreInfo(artist.id)}>
                    More Info
                  </MoreInfoButton>
                  {selectedArtist && selectedArtist.id === artist.id && isInfoVisible && (
                    <AlbumContainer>
                      {selectedArtistAlbums.map((album) => (
                        <AlbumInfo key={album.id}>
                          <AlbumTitle>{album.name}</AlbumTitle>
                          {album.images.length > 0 && (
                            <AlbumImage src={album.images[0].url} alt={album.name} />
                          )}
                        </AlbumInfo>
                      ))}
                    </AlbumContainer>
                  )}
                </ArtistCard>
              </li>
            ))}
          </ul>
        </ScrollableRow>
      </SearchResults>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  margin-bottom: 20px;
  svg {
    margin-right: 10px;
  }
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
  }
`;

const SearchResults = styled.div`
  h2 {
    color: white;
  }
`;

const ScrollableRow = styled.div`
  max-height: 300px;
  // overflow-y: auto;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const ArtistCard = styled.div`
  border: 1px solid transparent;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: #181818;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #b3b3b3;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: #202020;
  }
`;

const ArtistImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
`;

const ArtistNameLink = styled.a`
  margin-top: 10px;
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

const MoreInfoButton = styled.button`
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const AlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AlbumInfo = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const AlbumTitle = styled.div`
  margin-right: 10px;
  color: #b3b3b3;
`;

const AlbumImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;
