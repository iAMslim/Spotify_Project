import { useEffect, useState } from "react";
import axios from "axios";
import './index.css'

function Login() {
  const CLIENT_ID = "3419d36f85604b6fb16bc730622cd529";
  const REDIRECT_URI = "http://localhost:5173/users";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [userData, setUserData] = useState(null);
  const [topData, setTopData] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.message);
        });
    }
  }, [token]);

  const authenticateWithSpotify = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setToken("");
  };

  const fetchTopData = (type) => {
    axios
      .get(`https://api.spotify.com/v1/me/top/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTopData(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching top ${type}:`, error.message);
      });
  };

  return (
    <>
      <div className="App">
        <header className="App-header"></header>
        {!token ? (
          <button onClick={authenticateWithSpotify}>Login to Spotify</button>
        ) : (
          <>
            {userData && (
              <div>
                <h2>Profile</h2>
                <div>
                  {userData.images && userData.images.length > 1 && (
                    <img src={userData.images[1].url} alt="Profile" />
                  )}
                  <p>Type: {userData.type}</p>
                  <p>Display Name: {userData.display_name}</p>
                  <p>Followers: {userData.followers.total}</p>
                </div>
              </div>
            )}
            <button onClick={() => fetchTopData("tracks")}>Fetch Top Tracks</button>
            <button onClick={() => fetchTopData("artists")}>Fetch Top Artists</button>
            <button onClick={handleLogout}>Logout</button>
            {topData && (
              <div>
                <h2>Top {topData.type === "tracks" ? "Tracks" : "Artists"}</h2>
                <ul>
                  {topData.items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Login;