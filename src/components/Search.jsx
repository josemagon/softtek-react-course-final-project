import React, {useEffect, useState} from 'react';
import Results from "./Results";
import {useParams} from "react-router-dom";

export default function Search(props){
    const [query, setQuery] = useState('');
    const [working, setWorking] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [artwork, setArtwork] = useState([]);
    const {q} = useParams();

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        setWorking(true);
        console.log("Buscando " + query);
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`)
            .then(res => res.json())
            .then(data => {
                if (data.total > 10)
                    setArtwork(data.objectIDs.splice(0, 10))
                else
                   setArtwork(data.objectIDs);
                setWorking(false);
                setShowResults(true);
                if (e) window.history.pushState(`/search/${query}`, "", `/search/${query}`);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (q != null){
            setQuery(q);
            setWorking(true);
            console.log("Buscando " + q);
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${q}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.total > 10)
                        setArtwork(data.objectIDs.splice(0, 10))
                    else
                        setArtwork(data.objectIDs);

                    setWorking(false);
                    setShowResults(true);
                })
                .catch(error => {
                    console.log(error);
                });
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
            {showResults ? <Results artworkIDs={artwork} /> : null}
        </>

    );
}