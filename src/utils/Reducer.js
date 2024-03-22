import { reducerCases } from "./Constant";

export const initialState = {
  token: null,
  userInfo: null,
  playlists: [],
  currentPlaying: null,
  playerState: false,
  selectedPlaylist: null,
  selectedPlaylistId: "37i9dQZF1E37jO8SiMT0yN",
  newReleases: [],
  featuredPlaylists: [],
  searchArtists: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case reducerCases.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState,
      };
    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case reducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    case reducerCases.SET_NEW_RELEASES:
      return {
        ...state,
        newReleases: action.newReleases,
      };
    case reducerCases.SET_FEATURED_PLAYLISTS:
      return {
        ...state,
        featuredPlaylists: action.featuredPlaylists,
      };
    case reducerCases.SET_SEARCH_ARTISTS:
      return {
        ...state,
        searchArtists: action.searchArtists,
      };
    default:
      return state;
  }
};

export default reducer;
