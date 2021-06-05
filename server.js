var express = require('express');
var app = express();
var mysql = require('mysql')
var bodyParser = require('body-parser');
const {json,urlencoded} = require('body-parser');



app.use(json({type: 'application/json'}));

var router = express.Router();

app.use(urlencoded({extended: true}));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'users_db'
});

var server = app.listen(9090,function(){
    var host = server.address().address
    var port = server.address().port

    console.log("Server start")
})

connection.connect(function(error){
    if(!!error) console.log('error')
    else console.log('connected')
})

//User Signup
app.post('/register-user', function(req,res){
    connection.query('INSERT INTO users SET ?', req.body, function(error, rows, fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        } 
    });
})

//User Login
app.post('/users',function(req,res,next){
    var email = req.body.email;
    var password = req.body.password;
    connection.query("SELECT * FROM users WHERE email = ? AND password = ?",[email,password], function(err,row,fields){
        if(err) console.log(err);
        if(row.length > 0){
            res.send({'success' : true, 'id' : row[0].id ,  'message':'Data Coming!'});
        }
        else{
            res.send({'success' : false, 'message': 'User not found! please try again!'});
        }
    }); 
});



