import styled from "styled-components";
import SelectedPlaylist from "./SelectedPlaylist";
// import FeaturedBody from "./Featured/FeaturedBody";
// import SearchBody from "./Search/SearchBody";

export default function Body({ headerBackground }) {
  return (
    <Container headerBackground={headerBackground}>
      {/* <SearchBody />
      <FeaturedBody /> */}
      <SelectedPlaylist />
    </Container>
  );
}

const Container = styled.div`
  .list {
    .header-row {s
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 5vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#181818" : "none"};
    }
 
`;
