import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./utils/StateProvider.jsx";
import { Routes, Route } from "react-router-dom";
import reducer, { initialState } from "./utils/Reducer";
import Login from "./components/Login.jsx";
import Featured from "./components/Featured/Featured.jsx";
import Search from "./components/Search/Search.jsx";
import Library from "./components/Library/Library.jsx";
import Profile from "./components/Profile/Profile.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
