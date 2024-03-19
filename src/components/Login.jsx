// import { useEffect, useState } from "react";
// import axios from "axios";
// import '../index.css'

// function Login() {
//   const CLIENT_ID = "3419d36f85604b6fb16bc730622cd529";
//   const REDIRECT_URI = "http://localhost:5173/users";
//   const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
//   const RESPONSE_TYPE = "token";
//   const BACKEND_LOGIN_ENDPOINT = "http://localhost:5000/auth/login";
//   const [userData, setUserData] = useState(null);
//   const [topData, setTopData] = useState(null);
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     const hash = window.location.hash;
//     let token = window.localStorage.getItem("token");
//     if (!token && hash) {
//       token = hash
//         .substring(1)
//         .split("&")
//         .find((elem) => elem.startsWith("access_token"))
//         .split("=")[1];
//       window.location.hash = "";
//       window.localStorage.setItem("token", token);
//     }
//     setToken(token);
//     if (token) {
//       axios
//         .get("https://api.spotify.com/v1/me", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => {
//           setUserData(response.data);
//           console.log(response.data)
//         })
//         .catch((error) => {
//           console.error("Error fetching user data:", error.message);
//         });
//     }
//   }, [token]);

//   const authenticateWithBackend = () => {
//     window.location.href = BACKEND_LOGIN_ENDPOINT;
//   };

//   const authenticateWithSpotify = () => {
//     window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
//   };

//   const handleLogout = () => {
//     window.localStorage.removeItem("token");
//     setToken("");
//   };

//   const fetchTopData = (type) => {
//     axios
//       .get(`https://api.spotify.com/v1/me/top/${type}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setTopData(response.data);
//       })
//       .catch((error) => {
//         console.error(`Error fetching top ${type}:`, error.message);
//       });
//   };

//   return (
//     <>
//       <div className="App">
//         <header className="App-header"></header>
//         {!token ? (
//         <button onClick={authenticateWithBackend}>Login to Spotify</button>
//         ) : (
//           <>
//             {userData && (
//               <div>
//                 <h2>Profile</h2>
//                 <div>
//                   {userData.images && userData.images.length > 1 && (
//                     <img src={userData.images[1].url} alt="Profile" />
//                   )}
//                   <p>Type: {userData.type}</p>
//                   <p>Display Name: {userData.display_name}</p>
//                   <p>Followers: {userData.followers.total}</p>
//                 </div>
//               </div>
//             )}
//             <button onClick={() => fetchTopData("tracks")}>Fetch Top Tracks</button>
//             <button onClick={() => fetchTopData("artists")}>Fetch Top Artists</button>
//             <button onClick={handleLogout}>Logout</button>
//             {topData && (
//               <div>
//                 <h2>Top {topData.type === "tracks" ? "Tracks" : "Artists"}</h2>
//                 <ul>
//                   {topData.items.map((item) => (
//                     <li key={item.id}>{item.name}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default Login;
import React from "react";
import styled from "styled-components";

export default function Login() {
  const handleClick = async () => {
    const client_id = "3419d36f85604b6fb16bc730622cd529";
    const redirect_uri = "http://localhost:5173/home";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify"
      />
      <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
