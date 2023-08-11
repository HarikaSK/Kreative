import React from "react";
import { useState } from "react";
import './App.css'
import { useNavigate } from "react-router-dom";
import cover from './images/cover.jpg';
import login from './images/login6.png';
import contact from './images/contact.png';
import logo from './images/logo.png';

const LoginPage = () => {
   const [register,setRegister]= useState(1);
   //register ==1 - registered!

   const [info,setInfo] = useState({
    username:"",
    password:""
   })

   // localStorage.setItem('username','');
   // localStorage.setItem('flag',0);

   const navigate = useNavigate();
   //HANDLE INPUTS FROM LOGIN FORM
   let name,value;
   const handleInput = (e) =>{
    name = e.target.name;
    value = e.target.value;
    console.log("name: "+name+" ,value: "+value);
    setInfo({...info,[name]:value});
   }

   //SEND LOGIN FORM DATA TO BACKEND
   

 const RegisterButton = (e) => {
    e.preventDefault();
    SendRegisteredInfo();
 }

 const SendRegisteredInfo = async () => {
    const { username, password } = info;

    const res = await fetch('/adduser', {
       method: "POST",
       headers: {
          "Content-Type": "application/json",
       },
       body: JSON.stringify({
          username, password
       })
    })

    console.log(res);
    if(res.status==201){
      console.log(res.status);
      alert("Username taken!");
      //localStorage.setItem('flag',0);
    }
    else{
      document.getElementById('registerbtn').innerHTML = 'Registered!';
    }
 }

 const LoginButton = (e) => {
   e.preventDefault();
    SendLoginInfo();
 }

 const SendLoginInfo = async () => {
    const { username, password } = info;

    const res = await fetch('/validateuser', {
       method: "POST",
       headers: {
          "Content-Type": "application/json",
       },
       body: JSON.stringify({
          username, password
       })
    })
    
    console.log(res);
    if(res.status === 200){
         console.log(res.status);
         
         if(localStorage.getItem('auth')!=1){
            localStorage.setItem('auth',1);
         }
         if(localStorage.getItem('username')!=username){
            localStorage.setItem('username',username);
         }
         
    }

    else if(res.status === 201){
        console.log(res.status);
        alert('Incorrect password!');
        //localStorage.setItem('flag',0);
    }

    else if(res.status === 202){
        console.log(res.status);
        alert('Not a registered user!');
        //localStorage.setItem('flag',0);
    }

    if(localStorage.getItem('auth')==1){
      navigate('/home');
    }
 }
 





    return (
        <>
            
            <img src={cover} class='bgImg'></img>

            <div class='title'>
               <p style={{ color: 'white' }}>K R E A T I V E</p>
               <a href='#loginform' class='login' style={{ color: 'white', opacity:'70%' }}><p>LOG IN</p></a>
               {/* <img src={login} class='login'></img> */}
               
            </div>
            
            
            <br></br><br></br><br></br>
            
            <div id="loginform" style={{display:'flex', justifyContent:'center'}}>
            <div class='card' style={{width:'30%', justifyContent:'center'}}>
                <img class='card-img-top' src={logo} id='loginimg'></img>
                <div class='card-body'>
                <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="text" class="form-control" name="username" value={info.username} onChange={handleInput} placeholder="Enter username"></input>    
                </div><br></br>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" name="password" value={info.password} onChange={handleInput} placeholder="Password"></input>
                </div>
                <br></br>
                {register == 1 ? <button type="submit" id='loginbtn' class="btn btn-outline-primary" onClick={LoginButton}>Log in</button> : <button type="submit" id='registerbtn' class="btn btn-outline-primary" onClick={RegisterButton}>Register</button> }
                
                <p class='my-2'>{register == 1 ? "Don't have an account? " : "Registered already? "}<a href="#loginform" onClick={()=>{setRegister(!register)}}>{register == 1 ? "Register" : "Log in"}</a></p>
                {/* {console.log(register)} */}
            </form>

                </div>
            </div>
            
          </div>
          <br></br><br></br><br></br>
          
            
            
        </>
    )
}

export default LoginPage;