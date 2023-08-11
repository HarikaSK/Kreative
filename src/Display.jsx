import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Display = () =>{

    const [fs,setFs] = useState(0);
    const location = useLocation();
    console.log(location);
    const {id, username, image, type, genre, desc, camera, artMedia, likes} = location.state;
    console.log(id+" "+username+" "+image+" "+type+" "+genre+" "+desc+" "+camera+" "+artMedia+", likes: "+likes);
    
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);

   function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        ///fire your event
        console.log("full screen exit");
        setFs(0);
    }
}  
    

    const fullScreen = () =>{
           const ig=document.getElementById('image');
           console.log('full screen clicked!');
           setFs(1);
           console.log("fs: "+fs);
           console.log(ig);
            if (ig.requestFullscreen) {
              ig.requestFullscreen();
              
            } else if (ig.webkitRequestFullscreen) { /* Safari */
              ig.webkitRequestFullscreen();
              
            } else if (ig.msRequestFullscreen) { /* IE11 */
              ig.msRequestFullscreen();
            }

    }

   
    const [likeCount, setLikeCount] = useState(0); 
    var Likes=0;
    const [like,setlike] = useState(false);
    const Like = (e) =>{
            e.preventDefault();
            if(!like){
              console.log("Liked!");
              setLikeCount(likeCount+1);
              Likes=likeCount+1;
              console.log("likes: "+Likes);
              setlike(true);
            }
            else{
              console.log("UnLiked!");
              setLikeCount(likeCount-1);
              Likes=likeCount-1;
              console.log("likes: "+Likes);
              setlike(false);
            }
            
            UpdateLikes();
           
    }

    const UpdateLikes = async () => {
      console.log("in updateLikes!");
      const res = await fetch('/updatelikes', {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            image, Likes
         })
      })
   }
    
   

    return(
      <>
      {localStorage.getItem('auth') == 1 ? 
      <>
      <div class=" display container-fluid">

      <div id="img" class="img" >
          <img src={image} class="displayimg" onClick={fullScreen}></img>
             <p><svg xmlns="http://www.w3.org/2000/svg"  onClick={Like} width="20" height="20" fill="red" class="bi bi-heart-fill mx-2" viewBox="0 0 16 16"> 
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                 </svg> {likeCount} Likes</p>
      </div>
     
      <div class="displaytext card">
           {type=='Art' ? <p id="type" style={{color:"#FFDD43"}}>{type}</p> : <p id="type" style={{color:"#38598b"}}>{type}</p>}
           <p style={{fontSize:"25px", color:"#022c43"}}>By: {username}</p>
           <p style={{fontSize:"25px", color:"#022c43"}}>Genre: {genre}</p>
           {desc.length!=0 ? <p style={{fontSize:"25px", color:"#022c43"}}>Description: {desc}</p> : <></>}
           {camera.length!=0 ? <p style={{fontSize:"25px", color:"#022c43"}}>Camera: {camera}</p> : <></>}
           {artMedia.length!=0 ? <p style={{fontSize:"25px", color:"#022c43"}}>Art Media: {artMedia}</p> : <></>}
           {/* <p style={{fontSize:"25px", color:"#022c43"}}>ID: {id}</p> */}

      </div>
      </div>
      
      <div id="image" class="image" style={fs==1 ? {visibility:"visible"} : {display:"none"}} >
        <img src={image} class="fullscreenimg"></img>
        </div></>: <p>You're not logged in!</p>}
        
        </>
        
        
        
    )
}

export default Display;