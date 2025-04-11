import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import RoutesList from "./routes/RoutesList";
import JoblyApi from "./helpers/JoblyApi";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./context/UserContext";
// import jwt from "jsonwebtoken";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let username = await JoblyApi.getCurrentUsername();
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  const signup = async (signupData) => {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  };

  const login = async (loginData) => {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  };

  if (!infoLoaded) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar logout={logout} />
        <RoutesList login={login} signup={signup} />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
