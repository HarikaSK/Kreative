import React from "react";
import { Link } from 'react-router-dom';
import photography from './images/photography.jpg';
import art from './images/art.jpg';
import './App.css';
import Submit from "./Submit";
import { useNavigate } from "react-router-dom";



const Post = () => {

    let navigate=useNavigate();

    const SubmitPhoto = () =>{
        navigate("/submit",{state:{Type:"Photography"}});
    }

    const SubmitArt = () =>{
        navigate("/submit",{state:{Type:"Art"}});
    }

    return (
        <>
        {localStorage.getItem('auth')==1 ? 
          <div >
            <div class="container"  id="postcards">
            <div class="row">
                <div class="col-sm-6">
                    <div class="card" style={{ width: "300px" }}>
                        <img class="card-img-top" src={photography} alt="photography img"></img>
                        <div class="card-body">
                            <button class="btn btn-outline-secondary" onClick={SubmitPhoto} >Post your pictures!</button>
        
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card" style={{ width: "300px" }}>
                        <img class="card-img-top" src={art} alt="Card image cap"></img>
                            <div class="card-body">
                                <button class="btn btn-outline-secondary" onClick={SubmitArt}to='/submit'>Post your art!</button>
                                
                            </div>
                    </div>
                </div>
            </div>
            </div>
            <br></br>
        </div> : <p class="text-center">You are not logged in!</p>
    }
    </>
    )
}
export default Post;
