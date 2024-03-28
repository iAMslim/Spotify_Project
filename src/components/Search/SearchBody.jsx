import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/Constant";
export default function SearchBody() {
  const [{ token, searchArtists }, dispatch] = useStateProvider();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
  }, [token, searchInput, searchArtists]);
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
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
        <ul>
          {searchResults.map((artist) => (
            <li key={artist.id}>
              {artist.images.length > 0 && (
                <img src={artist.images[0].url} alt={artist.name} />
              )}
              {artist.name}
            </li>
          ))}
        </ul>
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
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin-bottom: 10px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
`;
