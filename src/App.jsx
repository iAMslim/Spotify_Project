import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import User from "./components/User";
import { reducerCases } from "./utils/Constant";
import { useStateProvider } from "./utils/StateProvider";
import Tracks from "./components/Tracks";

function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
        localStorage.setItem('spotifyToken', token);
      }
    }
    document.title = "Spotify";
  }, [dispatch, token]);

  return (
    <div className="app-container">
      <div className="content">
        {token ? <Spotify /> : <Login />}
        <div>
          <Routes>
          <Route path="/" element={<Tracks />} />
          <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/:userid" element={<User />} />
            <Route path="/tracks" element={<Tracks />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

