import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constant";

function User() {
  const [{ token, userData,  }, dispatch] = useStateProvider();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get(`https://api.spotify.com/v1/users/{user_id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        console.log("User Information:", data);

        const userInfo = {
          userId: data.id,
          display_name: data.display_name,
          type: data.type,
          followers: data.followers.total,
          images: data.images,
        };
        dispatch({ type: reducerCases.SET_USER, userInfo });
      }
       catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getUserInfo();
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    removeToken();
    dispatch({ type: reducerCases.SET_USER, userInfo: null });
  };

  return (
    <Container>
      {token && (
        <ProfileContainer>
          {loading && <LoadingSpinner>Loading...</LoadingSpinner>}
          {error && <ErrorMessage>Error: {error}</ErrorMessage>}
          {userData && (
            <>
              {userData.images && userData.images.length > 0 && (
                <ProfileImage src={userData.images[0].url} alt="Profile" />
              )}
              <UserInfo>
                <p>Type: {userData.type}</p>
                <p>Display Name: {userData.display_name}</p>
                <p>Followers: {userData.followers}</p>
              </UserInfo>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </>
          )}
        </ProfileContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ProfileContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  margin-top: 20px;
  p {
    margin: 5px 0;
  }
`;

const LoadingSpinner = styled.div`
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const LogoutButton = styled.button`
  margin-top: 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export default User;
