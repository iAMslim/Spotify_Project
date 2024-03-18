import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
import "./App.css";
import { Route, Routes } from "react-router-dom";



function App() {
  const [token, setToken] = useState('');


  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');
    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];
      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }
    setToken(token);
  }, []);


  return <>{token === "" ? <Login /> : <WebPlayback token={token} />}</>;
}

export default App;
