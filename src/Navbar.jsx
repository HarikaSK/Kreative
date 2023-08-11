import React from "react";
import { Link, useLocation } from 'react-router-dom';
import './App.css';
import logo from './images/logo.png';


const Navbar = (props) => {
     const location = useLocation();
     const route=location.pathname;
     console.log(route);
     const uname=localStorage.getItem('username');
      
    const setStorage = () =>{
        localStorage.setItem('auth',2);
        localStorage.clear();
        window.reload();
    }

    if(route!='/'){
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark">
                    <Link class="navbar-brand " to='/home'><img src={logo} id='logo'></img></Link>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <Link class="nav-item nav-link active" to='/home'>Home</Link>
                            <Link class="nav-item nav-link"  to='/post'>Post</Link>
                            <Link class="nav-item nav-link" to='/' onClick={setStorage}>{uname}(Log out)</Link>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
    
}

export default Navbar;