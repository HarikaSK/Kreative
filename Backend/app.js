const express=require('express'); //import express module
const mongoose=require('mongoose'); //import mongoose module

const app=express(); // create express instance

app.use(express.json()); 

async function connect(){ //connecting to mongodb
    await mongoose.connect('mongodb+srv://Harika:kreative_db@cluster0.vtwu77o.mongodb.net/kreative?retryWrites=true&w=majority',(err)=>{
        if(err){
            console.log("Cant connect to mongoDB");
        }
        else{
            console.log("Successfully connected to MongoDB");
        }
    })
}// async, cos after this every other func should execute

connect(); //calling connect(to mongodb) function

let sc = new mongoose.Schema({
    id:{type: Number, default:101},
    username:{type:String,required:true}, //creating schema for each post
    type:{type:String,required:true},
    genre:{type:String,required:true},
    description:{type:String},
    image: {type: String,required:true},
    artMedia: {type: String},
    camera: {type: String},
    likes: {type: Number, default:0}
    
  })// my doc, shd have the above 8 fields

let mod=new mongoose.model('col1',sc); //new model, of the type sc-schema in collection 'col1'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//POST CARDS

app.post('/send',(req,res)=>{ //POST method, handles post requests
    //this method gets the data from ur form input in Submit.jsx
   console.log(req.body.id+" "+req.body.username+" "+req.body.type+" "+req.body.genre+" "+req.body.description+" "+req.body.image+" "+req.body.artMedia+" "+req.body.camera+" "+req.body.likes);
   console.log("in send route");
   var input = new mod({// input is basically the doc to be inserted in my 'col1'
    id:req.body.id,
    username: req.body.username,
    type: req.body.type,
    genre: req.body.genre,
    description: req.body.description,
    image: req.body.image,
    artMedia: req.body.artMedia,
    camera: req.body.camera,
    likes: req.body.likes
   })
   input.save((err,data)=>{// .save() or .insert() inserts data into mongodb
       if(err){
        console.log("could not add data");
       }
       else{
        console.log("info added successfully");
       }
   })
})

//UPDATE LIKES
app.post('/updatelikes', async (req,res)=>{
    console.log("in update likes");
    console.log("likes: "+req.body.Likes);

    //let data= mongoose.model('col1', sc);

    mod.updateOne({link: req.body.image}, {$set: {likes: req.body.Likes}},(err,data)=>{
         if(data){
             console.log("likes updated!");
         }
         else{
            console.log("error");
         }
    });
})

// GET METHOD, to get data from mongodb - DISPLAY ALL CARDS
app.get('/getData',(req,res)=>{
    console.log("getData called");
    let data = mongoose.model('col1',sc);
    
    // mod.count({}, function( err, count){
    //     console.log( "Number of users:", count );
    // })
   
    data.find((err,Data)=>{
        if(err){
            console.log("couldn't fetch data from mongodb");
        }
        else{
            
            console.log("data fetched from mongodb");
            res.send(JSON.stringify(Data));
        }
    })
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//POST METHOD, FOR SEARCH
let searchval="";

app.post('/search',(req,res)=>{
    console.log("post for search called");
    console.log(req.body.search);
    searchval=req.body.search;
    console.log("searchval "+searchval);
    
})

//GET METHOD TO DISPLAY FILTERED CARDS
app.get('/filterData',(req,res)=>{
     console.log("get filter called");
     let searchData=mongoose.model('col1',sc);
     //{$or:[{type:searchval},{genre:searchval}]}
    searchData.find({$or:[{type:searchval},{genre:searchval}]},(err,Data)=>{
        if(err){
            console.log("couldn't fetch searched documents");
        }
        else{
            console.log("searched docs fetched from mongodb");
            res.send(JSON.stringify(Data));
        }
    });
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REGISTER / LOGIN

let usersc = new mongoose.Schema({
    username:{type:String,required:true,unique:true}, //creating schema
    password:{type:String,required:true}
  })// schema for user details

let usermod=new mongoose.model('Auth',usersc);

//db.Auth.createIndex({username:1},{unique:true});

//ADD USER
app.post('/adduser',async (req,res)=>{
    console.log(req.body.username+" : "+req.body.password);
    var input = new usermod({// input is basically the doc to be inserted in my 'col1'
        username:req.body.username,
        password:req.body.password
        })
        
        input.save((err,data1)=>{
            if(err){
                res.status(201);
              res.send("couldn't add user")
              console.log("couldn't add user");
            }
            else{
              res.send("user added successfully!")
              console.log("user added successfully!");
            }
        })
})


// VALIDATE USER
let uname="";
let pwd="";

app.post('/validateuser',async (req,res)=>{
    uname=req.body.username;
    pwd=req.body.password;
    console.log("entered username to login: "+uname);
    console.log("entered password to login: "+pwd);

    let searchData=mongoose.model('Auth',usersc);
     searchData.findOne({username:uname})
    .then(data=>{
        console.log(data);
        if(data!=null){
            if(data.password === pwd){
                console.log("logged in!");
                res.status(200);
                res.send("success");
            }
            else{
                console.log("wrong pwd!");
                res.status(201);
                res.send("fail");
            }
        }
        else{
            res.status(202);
            res.send("user not found");
        }
    })

    


})



app.listen(3002,()=>{
    console.log("server running");
})

