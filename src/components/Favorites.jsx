import {useEffect, useState} from "react";

export default function Favorites(){
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("favorites")) localStorage.setItem("favorites", JSON.stringify([]));
        setFavorites(JSON.parse(localStorage.getItem("favorites")));
    }, [favorites]);

    return(
        <>
            fvorites here
        </>
    );
}