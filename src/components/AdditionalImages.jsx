export default function ExtraImages(props){
    // En este caso la API solo nos devuelve URLs
    // de imagenes

    return props.images && (
        <div className="extra-imgs">
            {props.images.map(image => {
                return <img className="extra-img" src={image} key={image}/>
            })}
        </div>
    )
}