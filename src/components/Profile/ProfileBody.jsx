import { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/Constant";
import styled from "styled-components";

export default function ProfileBody() {
  const [{ token, userInfo }, dispatch] = useStateProvider();

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

  return (
    <Container>
      {userInfo && (
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
`;
