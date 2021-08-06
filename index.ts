import express from 'express'
//const stringify = require('json-stringify-safe');
const app=express()
const mysql = require('mysql');
import bodyParser from 'body-parser';
import fs from 'fs'
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aspdata"
});
con.connect(function(err:any) {
  if (err) throw err;
 // con.query("SELECT * FROM admin", function (err:any, result:any, fields:any) {
 //   if (err) throw err;
 //   console.log(result);
 // });
});
app.use(express.static('/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
       const a=fs.readFileSync('index.html')
       res.send(a.toString())
});
app.get('/home',(req,res)=>{
       const a=fs.readFileSync('from.html')
       res.send(a.toString());
});
app.get('/to',(req,res)=>{
  const a=fs.readFileSync('index2.html')
  res.send(a.toString());
});
app.post('/admin',async (req,res)=>{
    con.connect(()=>{
        con.query("SELECT * FROM admin", function (err:any, result:any) {
            if (err) throw err;
            const Username=req.body.Name;
            let pass=req.body.Password;
             console.log("req",Username)
            const obj = JSON.parse(JSON.stringify(result));
            console.log("resd",obj[0])
            console.log("resdff",obj[0].Password)
            let na=obj[0].Name;
            let passw=obj[0].Password;
            if (Username == na && pass ==passw){
            debugger;
              let d={
                valid:true,
                url:'http://localhost:9006/to'
              };
              res.send(d)
             //res.redirect(308,'/to')
              
            }
            else{
              let d={
                valid:false
              };
              res.send(d)
            }
          
          
          });
     
    });
    
});
app.listen(9006,()=>{
    console.log("connected")
});