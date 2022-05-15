import {useContext, useEffect, useState} from "react";
import favoritesCtx from "../favoritesCtx";
import Result from "./Result";

export default function Favorites(){
    const {favorites, setFavorites} = useContext(favoritesCtx);
    const [artwork, setArtwork] = useState([])

    const getArtWork = (id) => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
        .then(res => res.json())
        .then(data => {
            setArtwork(artwork => [...artwork, data]);  
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        favorites.forEach(id => {
            getArtWork(id);
        });
    }, [favorites]);

    if (favorites.length > 0){
        return (
            <>
                <div id="results">
                    {artwork.map( a => {
                        return (
                            <Result
                                key={a.objectID}
                                id={a.objectID}
                                img={a.primaryImageSmall} 
                                title={a.title}
                                artist={a.artistDisplayName}
                                date={a.objectDate}
                                country={a.country}
                            />
                        )
                    })}
                </div>
            </>
        );
    }else{
        return(
            <p>No tiene favoritos</p>
        )
    }
}