const mysql =require('mysql2');
const express = require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"swathi"
})

db.connect((error)=>{
    if(error){
        console.log("There is an error "+error);
    }
    else{
        console.log("Db is connected");
    }
});

app.post('/create',(req,res)=>{
    const {name, password}=req.body;
    if(!name || !password){
        return res.status(400).json({error:'The Input is Empty'});
    }
    const sql='insert into user (userName,password) values (?,?)';
    db.query(sql,[name,password],(err,result)=>{
        if(err){
            console.error("Error while inserting data : "+err);
            return res.status(500).json({error:'Error'});
        }
        return res.status(200).json({message:"User Created Sucessfuly"});

    });
});

app.get('/getPassword',(req,res)=>{
    const {user,pass}=req.body;
    const sql ='select * from user where userName=?';
    db.query(sql,[user],(err,result)=>{
        if(err){
            console.log("Error in fetching data");
            res.status(400).json({error:"Error :"+err});
        }
        else{
            if(pass===result[0].password){
                console.log("Login Sucessful");
                res.status(200).json({message:"Login Sucessful"});
            }
            else{
                res.status(404).json({message:"Wrong user name or Password"});
            }
           
        }
    })
})

app.listen(3000,(err)=>{
if(err){
    console.log("Error in listening port");
}
else{
    console.log("Server is running in the port 3000");
}
})