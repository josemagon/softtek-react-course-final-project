import React from 'react';
import {Link} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Topbar(props){
    const { user, logout } = useAuth0();

    return(
        <nav className='Topbar'>
            {window.history.length > 0 ? <button onClick={() => window.history.back()}>Volver</button> : null}
            {props.favoritesQty > 0 ? <Link to={"/favorites"}>FAVORITOS <span className='cantidad-favoritos'>{props.favoritesQty}</span> </Link> : null}
            <h1>BUSCARDOR DE ARTE</h1>
            <h3>
                Conectado como {user.email}
                <button onClick={() => logout({ returnTo: window.location.origin })}>
                    salir
                </button>
            </h3>
        </nav>
    );
}