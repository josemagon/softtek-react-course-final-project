import React, { useContext } from 'react';
import {Link} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import favoritesCtx from '../favoritesCtx';

export default function Topbar(){
    const { user, logout } = useAuth0();
    const {favorites} = useContext(favoritesCtx)

    return(
        <nav className='Topbar'>
            <Link to={"/favorites"}>
                <p>FAVORITOS</p>
                <p className='cantidad-favoritos'>{favorites.length}</p>
            </Link>
            <h1>
                <Link to={"/"}>BUSCARDOR DE ARTE</Link>
            </h1>
            <div className='conectado-como'>
                <p>Conectado como {user.email}</p> 
                <button onClick={() => logout({ returnTo: window.location.origin })}>
                    salir
                </button>
            </div>
        </nav>
    );
}