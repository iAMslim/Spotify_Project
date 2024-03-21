import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileBody() {
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
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.message);
        });
    }
  }, [token]);

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
      <div>
        {userData && (
          <div className="profile-main">
            <h1>Profile</h1>
            <div className="profile-wrapper">
              {userData.images && userData.images.length > 1 && (
                <img src={userData.images[1].url} alt="Profile" />
              )}
              <p>Type: {userData.type}</p>
              <p>Display Name: {userData.display_name}</p>
              <p>Followers: {userData.followers.total}</p>
            </div>
          </div>
        )}
        <br />
        <br />
        <div className="profile-info-wrap">
          <button onClick={() => fetchTopData("tracks")}>
            Fetch Top Tracks
          </button>
          <br />
          <button onClick={() => fetchTopData("artists")}>
            Fetch Top Artists
          </button>
          <br />
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
        </div>
      </div>
    </>
  );
}
