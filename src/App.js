import React from "react";
import Navigation from "./components/navigation/navigation";
import MyIdeas from "./components/ideas/myIdeas";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Favorites from "./components/favorites/favorites";

import SignUp from "./components/users/signUp";
import LogIn from "./components/users/logIn";
import About from "./components/help/about";
import AddIdea from "./components/ideas/addIdea";
import Details from "./components/ideas/details";
import EditIdea from "./components/ideas/edit";
import PublicIdeas from "./components/publicIdeas/publicIdeas";

import { useState } from "react";

import AuthContext from "./components/context/auth-context";

const App = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(false);
  const [detailedIdea, setDetailedIdea] = useState(null);

  const cbIsLoggedIn = (token) => {
    setToken(token);
  };

  const getLogOut = () => {
    fetch("https://my-business-idea.onrender.com/rest/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        console.log(resp);
        //setIsLoggedIn(false)
        setToken(null);
        navigate("/about");
      });
  };

  const detailsOpenClickHandler = (idea) => {
    setDetailedIdea(idea);
    navigate("/details");
  };

  return (
    <AuthContext.Provider value={{ token }}>
      <Navigation getLogOut={getLogOut} />

      <Routes>
        <Route path="/" exact element={<Navigate replace to="/about" />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LogIn cbIsLoggedIn={cbIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/myideas"
          element={
            <MyIdeas detailsOpenClickHandler={detailsOpenClickHandler} />
          }
        />
        <Route path="/addidea" element={<AddIdea />} />
        <Route path="/details" element={<Details idea={detailedIdea} />} />
        <Route path="/editidea" element={<EditIdea idea={detailedIdea} />} />
        <Route
          path="/public"
          element={
            <PublicIdeas detailsOpenClickHandler={detailsOpenClickHandler} />
          }
        />
        <Route
          path="/myfav"
          element={
            <Favorites detailsOpenClickHandler={detailsOpenClickHandler} />
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
