import React from "react";
import { useLocation } from "react-router-dom";
import './App.css';
import { useState } from "react";

const Submit = () => {

   const location = useLocation();
   console.log(location);
   const {Type} = location.state;
   // const Id=199;
   const Likes=0;
   
   var count=0;
   const getCount = async () => {
      console.log("in getCount");
      let res = await fetch("/getData");
      res = await res.json();
      console.log(res);
      count=res.length+1;
      
      
  };

  console.log("count: "+count);

   
   const [data, setData] = useState({
      // id: count,
      username: localStorage.getItem('username'),
      type: Type,
      genre: "",
      description: "",
      //link: "",
      artMedia: "",
      camera: "",
      likes: Likes
     
      
   });
   console.log("likes: "+data.likes);
   
   let name, value;
   function handleInputs(e) {
      //console.log(e);
      name = e.target.name;
      value = e.target.value;
      console.log(name + " " + value);
      setData({ ...data, [name]: value });
   }

   const [image,setImage] = useState("");
   
   const convertToBase64 = (e) =>{
            console.log(e);
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () =>{
               console.log(reader.result);
               setImage(reader.result);
               console.log("img: "+image);
            }
            reader.onerror = error =>{
               console.log("Error: "+error);
            }
   }

   const SubmitButton = () => {
      document.getElementById('submitbtn').innerHTML = 'Submitted!';
      getCount();
      Send();
   }
   
   const Send = async () => {

      let res1 = await fetch("/getData");
      res1 = await res1.json();
      console.log(res1);
      count=res1.length+1;
      const id = count;
      console.log(id);

      const { username, type, genre, description, artMedia, camera, likes } = data;

      const res = await fetch('/send', {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            id, username, type, genre, description, image, artMedia, camera, likes
         })
      })
   }

   return (
      <>
      {localStorage.getItem('auth') == 1 ? 
      <div>
         <div class="container my-4">
            <form>
               <div class="form-group">
                  <label>Type</label>
                  <input type="text" class="form-control" name="type" value={Type} placeholder="Type"></input>
               </div><br></br>
               <div class="form-group">
                  <label>Genre</label>
                  <input type="text" class="form-control" name="genre" value={data.genre} placeholder="Genre" onChange={handleInputs}></input>
               </div><br></br>
               
               <div class="form-group">
                  {Type==='Art' ? 
                  <><label>Art Media</label>
                  <input type="text" class="form-control" name="artMedia" value={data.artMedia} placeholder="Acrylic paints, Oil pastels etc." onChange={handleInputs}></input></> :
                  <><label>Camera</label>
                  <input type="text" class="form-control" name="camera" value={data.camera} placeholder="Canon EOS R7, Sony a6400 etc." onChange={handleInputs}></input></>}
               </div><br></br>

               <div class="form-group">
                  <label>Description</label>
                  <input type="text" class="form-control" placeholder="Description" value={data.description} name="description" onChange={handleInputs}></input>
               </div><br></br>
               <div class="form-group">
                  <label>Upload image</label><br></br>
                  <input type="file" class="form-control" placeholder="Image" value={data.link} name="image" id='image' onChange={convertToBase64}></input>
               </div><br></br>

               {/* {image=="" || image==null ? <p>img is ""</p>: <div className="container">image: <img src={image} width={100} height={100}></img></div>} */}
               <button type="button" class="btn btn-outline-secondary" id='submitbtn' onClick={SubmitButton}>Submit</button>
            </form>

         </div>
      </div> : <p>You're not logged in!</p> }
      </>
   )
}

export default Submit;

