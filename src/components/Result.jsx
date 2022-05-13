import { Link } from "react-router-dom";



export default function Result(props){
    return(
        <div className="result">
            <div className="result-img" style={{backgroundImage : `url("${props.img}")`}}>
                
            </div>
            <p className="result-txt">
                {props.title}
            </p>
            <button className="result-btn">
                <Link to={`/artwork/${props.id}`}>Ver obra</Link>
            </button>
        </div>
    );
}