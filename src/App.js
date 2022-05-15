import React, { useEffect } from 'react';
import './App.css';
import Topbar from "./components/Topbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import Artwork from './components/Artwork';
import { useAuth0 } from "@auth0/auth0-react";
import Login from './components/Login';


function App() {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!window.localStorage.getItem("favorites"))
      window.localStorage.setItem("favorites", JSON.stringify([]));
  }, [])

  if (isAuthenticated){
    return (
        <>
          <Topbar />
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/search/:q" element={<Search />} />
                <Route path="/artwork/:artworkID" element={<Artwork />} />
                <Route path="*" element={<Search />} />
            </Routes>
          </BrowserRouter>
        </>
    );
  }else{
    return <Login />
  }
}

export default App;
