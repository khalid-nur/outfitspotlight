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
import ProductLayout from "./Layouts/ProductLayout";
import NotificationLayout from "./Layouts/NotificationLayout";
import NoPageFound from "./pages/404";
import Home from "./pages/Home";

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

            <Route
              path="/product/:id"
              element={user ? <ProductLayout /> : <Navigate to="/" />}
              // If a user is logged in, direct them to the user's product page.
              // Otherwise, redirect to the Login page.
            />

            <Route
              path="/notification"
              element={user ? <NotificationLayout /> : <Navigate to="/" />}
              // If a user is logged in, direct them to the user's notification page.
              // Otherwise, redirect to the Login page.
            />

            <Route
              path="*"
              element={user ? <NoPageFound /> : <Navigate to="/" />}
              // If any unmatched URL path and a user is logged in, display a 404 page otherwise, navigate to the login page.
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
