import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Loader from "./components/Loader/Loader";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeLayout from "./Layouts/HomeLayout";
import ExploreLayout from "./Layouts/ExploreLayout";
import ProfileLayout from "./Layouts/ProfileLayout";

const App = () => {
  const { authIsReady, user } = useAuthContext();
  return (
    <>
      {authIsReady ? (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={!user ? <Login /> : <Navigate to="/home" />}
              // If there is no user logged in, direct them to the Login page.
              // Otherwise, redirect to the Home page.
            />
            <Route
              path="/signup"
              element={!user ? <Register /> : <Navigate to="/home" />}
              // If there is no user register in, direct them to the Register page.
              // Otherwise, redirect to the Home page.
            />

            <Route
              path="/home"
              element={user ? <HomeLayout /> : <Navigate to="/" />}
              // If a user is logged in, direct them to the Home page.
              // Otherwise, redirect to the Login page.
            />

            <Route
              path="/explore"
              element={user ? <ExploreLayout /> : <Navigate to="/" />}
              // If a user is logged in, direct them to the Explore page.
              // Otherwise, redirect to the Login page.
            />

            <Route
              path="/profile/:id"
              element={user ? <ProfileLayout /> : <Navigate to="/" />}
              // If a user is logged in, direct them to the Profile page.
              // Otherwise, redirect to the Login page.
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default App;
