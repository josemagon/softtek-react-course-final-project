import React, {useEffect, useState} from 'react';
import Results from "./Results";
import {useParams} from "react-router-dom";

export default function Search(props){
    const [query, setQuery] = useState('');
    const [working, setWorking] = useState(false);
    const [artwork, setArtwork] = useState([]);
    const {q} = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        setWorking(true);
        search(query);
        window.history.pushState(`/search/${query}`, "", `/search/${query}`);
    };

    const search = (aQuery) => {
        console.log("Buscando " + aQuery);
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${aQuery}`)
            .then(res => res.json())
            .then(data => {
                if (data.total > 30)
                    setArtwork(data.objectIDs.splice(0, 30))
                else
                    setArtwork(data);

                setWorking(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (q != null){
            setQuery(q);
            setWorking(true);
            search(q);
        }
    }, []);

    return (
        <>
            <div id='search-form'>
                <form onSubmit={handleSubmit} disabled={working}>
                    <input placeholder='Buscar artista, obra, colección' value={query} type="text" name="query" id="query" onChange={(e) => {setQuery(e.target.value)}} required autoFocus disabled={working}/>
                    <button disabled={working}><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>
            <Results artworkIDs={artwork} />
        </>

    );
}