import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Result from './Result';

export default function Results(props){
    const [artwork, setArtwork] = useState([]);

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
        setArtwork([]);
        props.artworkIDs.forEach(id => {
            getArtWork(id);
        });
    }, []);

    return(
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
}