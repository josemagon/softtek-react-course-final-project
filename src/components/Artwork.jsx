import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import { useParams } from "react-router-dom";
import favoritesCtx from "../favoritesCtx";

export default function Artwork(props){
    const {artworkID} = useParams();
    const [artwork, setArtwork] = useState({});
    const [imgSize, setImgSize] = useState("100%");
    const [isFavorite, setIsFavorite] = useState(false);
    const {favorites, setFavorites} = useContext(favoritesCtx)

    useEffect(() => {
        if (artworkID != null){
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkID}`)
                .then(res => res.json())
                .then(data => {
                    setArtwork(data);

                    if (favorites.filter(a => a == data.objectID).length > 0) setIsFavorite(true);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, []);

    const getExtraImages = (additionalImages) =>{
        if (additionalImages.length > 0)
            return(
                <div className="extra-imgs">
                    {additionalImages.map(ai => {
                        return <img className="extra-img" src={ai} key={ai}/>
                    })}
                </div>
            ); 
    }

    const toggleFavorites = () => {
        if (!isFavorite){
            setFavorites([...favorites, artwork.objectID])
            setIsFavorite(true);
        }else{
            //remove de favoritos
            setFavorites(favorites.filter(f =>
                f != artwork.objectID
            ))

            setIsFavorite(false);
        }
    }

    if (!artwork) return <h2>Cargando datos...</h2>

    return(
        <main className="artwork-single">
            <div className="header-single">
                <h1>{artwork.title}</h1>
                <h3>
                    <a href={artwork.artistWikidata_URL || artwork.artistULAN_URL ? artwork.artistWikidata_URL : artwork.artistULAN_URL}>{artwork.artistDisplayName}
                    </a>
                </h3>
                <p>{artwork.accessionYear}</p>
            </div>
            {artwork.primaryImage ? "" : <div className="decepcion">No se puede mostrar la imagen :(</div>}
            <button onClick={toggleFavorites}>{isFavorite ? "Remover de" : "Agregar a"} favoritos</button>
            <button onClick={() => {
                if (imgSize == "100%"){
                    setImgSize("600px");
                }else{
                    setImgSize("100%");
                }}}>{imgSize == "100%" ? <i className="fa-solid fa-magnifying-glass-minus"></i> : <i className="fa-solid fa-magnifying-glass-plus"></i>}
            </button>
            <div className="content-single">
                <img src={artwork.primaryImage} alt={artwork.title} style={{maxHeight: imgSize}}/>
            </div>
            {artwork.additionalImages ? getExtraImages(artwork.additionalImages) : null}
        </main>
    )

}