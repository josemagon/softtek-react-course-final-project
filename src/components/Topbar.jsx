import React from 'react';
import {Link} from "react-router-dom";

export default function Topbar(props){
    return(
        <nav className='Topbar'>
            {props.favoritesQty > 0 ? <Link to={"/favorites"}>FAVORITES</Link> : null}
            <h1>BUSCARDOR DE ARTE</h1>
        </nav>
    );
}