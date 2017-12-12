var express = require('express')
var mysql = require('mysql')
var http = require('http')
var path = require('path')
var app = express()

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "2511",
    database : "my-app"
})


app.use(express.json())
app.use(express.urlencoded())
app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.header('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
    
        // Pass to next layer of middleware
        next();
    });
app.set('view engine', 'pug')

app.get('/Delete/:id',(req,res)=>{
    var sql = "DELETE FROM user Where id='"+req.params.id+"'"
    con.query(sql,(err,result)=>{
        res.redirect('/')
    })
})

app.post('/Update/:id',(req,res)=>{
    var input = (req.body)
    var data= {
        name:input.name,
        country:input.country,
        detail:input.detail
    }
    var sql = "UPDATE user SET name='"+data.name+"',country='"+data.country+"',detail='"+data.detail+"' WHERE id='"+req.params.id+"'"
    con.query(sql,(err,result)=>{
        if(err){
            console.log('error',err)
        }
        res.redirect('/')
    })
})


app.post('/Create',(req,res)=>{
    
    var data= {
        name:req.body.name,
        country:req.body.country,
        detail:req.body.detail
    }
    console.log(req.body)
    var sql = "INSERT INTO user (name,country) value('"+data.name+"','"+data.country+"','"+data.detail+"')"
    con.query(sql,(err,result)=>{
        if(err){
            console.log('error',err)
        }
        res.redirect('/')
    })
})


app.get('/',(req,res)=>{
    var sql = "SELECT * FROM user"
    con.query(sql,(err,result)=>{
        
        res.send(JSON.stringify(result))
    })
})

app.listen(3000,()=>{
    console.log('port',3000)
})

