import './App.css';
import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Routes} from 'react-router-dom';
import Home from './Home';
import Post from './Post';
import Navbar from './Navbar';
import Submit from './Submit';
import LoginPage from './LoginPage';
import Display from './Display';




const App = () =>{
  
  localStorage.setItem('flag',0);
  const [auth,setAuth] = useState(0);

  const loginHandler = () =>{
      setAuth(!auth);
  }

   return(
    <>
    <Navbar login={loginHandler} status={auth} />
    <Routes>
    <Route path='/' element={<LoginPage />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/post' element={<Post />}/>
      <Route path='/submit' element={<Submit />}/>
      <Route path='/display' element={<Display />}/>

    </Routes>
    
    
    </>
   )
}
export default App;