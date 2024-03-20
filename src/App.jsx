import { useEffect } from "react";
import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { reducerCases } from "./utils/Constant";
import { useStateProvider } from "./utils/StateProvider";

function App() {
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   async function getToken() {
  //     try {
  //       const response = await fetch("/auth/token");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch token");
  //       }
  //       const json = await response.json();
  //       setToken(json.access_token);
  //     } catch (error) {
  //       console.error("Error fetching token:", error.message);
  //     }
  //   }

  //   getToken();
  // }, []);

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
