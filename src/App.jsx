import { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { reducerCases } from "./utils/Constant";
import { useStateProvider } from "./utils/StateProvider";

function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    document.title = "Beatbox";
  }, [dispatch, token]);

  return <>{token ? <Spotify /> : <Login />}</>;
}

export default App;
