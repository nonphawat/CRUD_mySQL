const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db =mysql.createConnection({
    user:"root",
    host:'localhost',
    password:"tan111tan",
    database:'todo1'
})

app.get('/student',(req,res)=>{ 
    db.query("SELECT * FROM student",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
        
    })
})

app.post('/create', (req,res)=>{
    const name = req.body.name;
    const id = req.body.id;
    const hobby = req.body.hobby;
    const status = req.body.status;

    db.query("INSERT INTO student (id,name,hobby,status) VALUES(?,?,?,?)",
    [id,name,hobby,status],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Values inserted")
        }
    })
})

app.put('/update',(req,res)=>{
    const id =req.body.id;
    const hobby= req.body.hobby;
    db.query("UPDATE student SET hobby =? WHERE id=?",[hobby,id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete('/delete/:id', (req,res)=>{
    const id =req.params.id;
    db.query("DELETE FROM student WHERE id =?", id, (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.listen('3002',()=>{
    console.log("Server is running on port 3002");
})