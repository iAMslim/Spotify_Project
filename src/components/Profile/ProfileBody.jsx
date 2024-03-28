import { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/Constant";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
export default function ProfileBody() {
  const [{ token, userInfo }, dispatch] = useStateProvider();
  const navigate = useNavigate();
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        id: data.id,
        image: data.images,
        externalUrl: data.external_urls.spotify,
        displayName: data.display_name,
        followers: data.followers.total,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);

  const goLogin = () => {
    navigate("/login");
  };
  if (!token) goLogin();

  return (
    <Container>
      {token && userInfo && (
        <>
          <div className="profile-main">
            <div className="profile-wrapper">
              <h1>Profile</h1>
              <br />
              <div className="profile-image-container">
                {userInfo.image && userInfo.image.length >= 1 && (
                  <img src={userInfo.image[1].url} alt="Profile" />
                )}
              </div>
              <br />
              <h2>{userInfo.displayName}</h2>
              <h4>{userInfo.followers} Followers</h4>
              <a href={userInfo.externalUrl}>{userInfo.externalUrl}</a>
            </div>
          </div>
        </>
      )}
      {token && (
        <div className="profile-logout">
          <button
            className="logoutButton"
            onClick={() => {
              dispatch({ type: reducerCases.SET_TOKEN, null: null });
            }}
          >
            Logout
          </button>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  .profile-main {
    color: #dddcdc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .profile-wrapper {
      background-color: #181818;
      border-radius: 2rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 1rem 0;
      a {
        color: #dddcdc;
        text-decoration: none;
        &:hover {
          color: blue;
          text-decoration: underline;
        }
      }
      .profile-image-container {
        height: 300px;
        width: 300px;
        img {
          height: 300px;
          width: 300px;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }
  }
  .profile-logout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logoutButton {
      padding: 1rem 5rem;
      border-radius: 5rem;
      background-color: black;
      border: none;
      font-size: 1.4rem;
      cursor: pointer;
      color: #dddcdc;
      text-decoration: none;
      &:hover {
        color: red;
      }
    }
  }
`;
