import React, { useState } from "react";
import './App.css';
import { useEffect } from "react";
import Card from "./Card";



const Home = () => {

    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    //DISPLAY ALL CARDS
    const getMyData = async () => {
        let res = await fetch("/getData");
        res = await res.json();
        await setData(res); //data = all cards
        //data = res;
        console.log(res);
        console.log("data: "+data);
        console.log("data0: "+data[0]);

    };

    useEffect(() => { //when page renders for the first time, all cards are displayed
        getMyData();
    }, [])


    //GET FILTERED DATA FROM MONGODB
    const getFilterData = async () => {
        let res = await fetch("/filterData", (err) => {
            if (err) {
                console.log("couldnt call fetch filtered data");
            }
            else {
                console.log("get req sent to filterdata");
            }
        });
        res = await res.json();
        await setData(res);// data = filtered data
        //data = res;
        console.log(res);
        console.log("data: "+data);

    };

    //SEARCH - MONGODB
    const handleSearch = async () => { //on clicking search, searched word is sent to backend to /search route
        console.log("handle search called");
        const res = await fetch('/search', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ search })
        })

    }


    //SEARCH MOVIES 
    const searchCards = async (searchData) => {
        handleSearch();
        if (search.length == 0) {
            getMyData();
        }
        else {
            getFilterData(); //fetch filtered data from /filterData route
            //now data=filtered data
        }

    }

    return (
        <>
        {localStorage.getItem('auth')==1 ? 
          <div>
          <br></br><br></br><br></br>
          <div class='container text-center'>
              <div class="input-group">
                  <input type="text" class="form-control rounded" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                  <div class='input-group-append mx-1'>
                      <span class='btn btn-md btn-outline-secondary' onClick={searchCards} >Search</span>
                  </div>
              </div>
          </div>
          
          
          <div class="container-fluid text-center Homecards">
              <br></br><br></br><br></br>

              {data.length > 0 ? (data.map((x) => <Card props={x} />))
                  : (<p>No data available</p>)}

          </div>

          
      </div> : <><p class="text-center">You are not logged in!</p></>
        }
        </>
        

    )
}

export default Home;