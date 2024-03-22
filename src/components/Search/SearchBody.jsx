import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../../utils/StateProvider";
import { FaSearch } from "react-icons/fa";

export default function SearchBody() {
  const [{ token, searchArtists }, dispatch] = useStateProvider();

  useEffect(() => {
    const searchArtist = async (searchValue) => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          params: {
            q: searchValue,
            type: "artists",
          },
        });
        console.log(response.artists);
        searchArtist();
      } catch (error) {
        console.error("Error searching artist:", error.message);
      }
    };
  }, [token, dispatch]);

  return (
    <Container>
      <div className="search-bar">
        <FaSearch />
        <input type="text" placeholder="Search for an Artist" />
      </div>
      <p>Hi Luke, I know you love Rebecca Purple!</p>
    </Container>
  );
}

const Container = styled.div`
  background-color: rebeccapurple;
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
  .search-bar {
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
