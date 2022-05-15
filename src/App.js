import React, { useEffect, useState } from 'react';
import './App.css';
import Topbar from "./components/Topbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import Artwork from './components/Artwork';
import { useAuth0 } from "@auth0/auth0-react";
import Login from './components/Login';
import favoritesCtx from './favoritesCtx';


function App() {
  const { isAuthenticated } = useAuth0();
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // inicializar favorites, en caso de que no haya
    if (!window.localStorage.getItem("favorites"))
      window.localStorage.setItem("favorites", JSON.stringify([]));

    // guardarlos en el state
    setFavorites(JSON.parse(window.localStorage.getItem("favorites")))
  }, [])

  useEffect(() => {
    // Cuando cambian los favoritos,
    // también guardo o elimino del localstorage,
    // por eso un useEffect()
    window.localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  if (isAuthenticated){
    return (
        <favoritesCtx.Provider value={{favorites, setFavorites}}>
          <BrowserRouter>
            <Topbar />
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/search/:q" element={<Search />} />
                <Route path="/artwork/:artworkID" element={<Artwork />} />
                <Route path="*" element={<Search />} />
            </Routes>
          </BrowserRouter>
        </favoritesCtx.Provider>
    );
  }else{
    return <Login />
  }
}

export default App;
