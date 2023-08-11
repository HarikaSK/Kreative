import React from "react";
import './App.css';
import { useNavigate } from "react-router-dom";

const Card = ({props}) => {

    let navigate = useNavigate();

    const sendToDisplay = () =>{
       
        navigate('/display', {state:{id:props.id, username:props.username, image:props.image, type: props.type, genre: props.genre, desc:props.description, artMedia:props.artMedia, camera:props.camera, likes:props.likes}});
    }
    return (
        <div class="homecard card d-inline-block mx-3 my-3" id="showcard" style={{width:"250px"}} onClick={sendToDisplay} >
            <img class="card-img-top" src={props.image} alt="Card image cap" width="280px" height="230px" style={{objectFit: 'cover'}}></img>
                <div class="card-body" style={{visibility:"visible"}} id="body">
                    <h5 class="card-title">{props.type}</h5>
                    <p class="card-text">{props.genre}</p>
                    {/* <p class="card-text">Likes: {props.likes}</p> */}
                </div>
        </div>
        
    )
}

export default Card;