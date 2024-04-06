import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/Constant";
import { AiFillClockCircle } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa";

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  padding: 10px;
  color: white;
`;

const PlaylistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const Track = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
`;

const TrackImage = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const TrackInfo = styled.div`
  margin-top: 10px;
`;

const PlayButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const NoTracksMessage = styled.p`
  color: #888;
`;

export default function LibraryBody({ headerBackground }) {
  const [{ token, savedPlaylist }, dispatch] = useStateProvider();

  const [playlistInitialized, setPlaylistInitialized] = useState(false);

  useEffect(() => {
    const getSavedPlaylist = async () => {
      try {
      const response = await axios.get(`https://api.spotify.com/v1/me/tracks`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        params: {
          limit: 50,
        },
      });
      console.log("Response from Spotify API:", response.data);

      const savedPlaylist = {
        total: response.data.total,
        tracks: response.data.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      console.log("Saved Playlist:", savedPlaylist);

    if (savedPlaylist) {
          dispatch({ type: reducerCases.SET_SAVED_PLAYLIST, savedPlaylist });
          setPlaylistInitialized(true);
        }
      } catch (error) {
        console.error("Error fetching saved playlist:", error);
        // Handle error, maybe display a message to the user
      }
    };

    // Fetch saved playlist only if it hasn't been initialized yet
    if (!playlistInitialized) {
      getSavedPlaylist();
    }
  }, [token, dispatch, playlistInitialized]);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };

  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <Container>
      <Header style={{ backgroundColor: headerBackground }}>
        <h2>Your Saved Tracks</h2>
      </Header>
      <PlaylistContainer>
      {playlistInitialized && savedPlaylist && savedPlaylist.tracks && savedPlaylist.tracks.length > 0 ? (
          savedPlaylist.tracks.map((track) => (
            <Track key={track.id}>
              <TrackImage src={track.image} alt={track.name} />
              <TrackInfo>
                <h3>{track.name}</h3>
                <p>
                  {track.artists.join(", ")} - {track.album}
                </p>
                <p>
                  <AiFillClockCircle /> {msToMinutesAndSeconds(track.duration)}
                </p>
              </TrackInfo>
              <PlayButton onClick={() => playTrack(track.id, track.name, track.artists, track.image, track.context_uri, track.track_number)}>
                <FaRegStar /> Play
              </PlayButton>
            </Track>
          ))
        ) : (
          <NoTracksMessage>No tracks found.</NoTracksMessage>
        )}
      </PlaylistContainer>
    </Container>
  );
}
