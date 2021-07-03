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
        if(!!error){
            console.log('error');
            res.send({'error' : false, 'message': 'User Already exist with this email try another!'});
        } 
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

//User Complaints store
app.post('/complaint', function(req,res){
    connection.query('INSERT INTO complaints SET ?', req.body, function(error, rows, fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        } 
    });
})

//User Suggestion store
app.post('/suggestion', function(req,res){
    connection.query('INSERT INTO suggestions SET ?', req.body, function(error, rows, fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        } 
    });
})

// get complaints to show in admin
app.get('/GetComplaint', function(req,res){
    connection.query('SELECT * FROM complaints', function(error, rows, fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(rows);
        }
    });
})

// delete Complaints from admin

app.delete('/userComplaint/:id', function(req, res){
    console.log(req.params.id);
    connection.query('DELETE FROM complaints WHERE id=?', req.params.id, function(error, rows, fields){
        if(!!error)
        console.log('error');
        else{
            console.log(rows);
            res.end('success delete!');
        }
    })
})

//Admin get Suggestions
app.get('/UserSuggestion', function(req,res){
    connection.query('SELECT * FROM suggestions', function(error, rows, fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(rows);
        }
    });
})

//delete suggestions from admin

app.delete('/userSuggestionDel/:id', function(req, res){
    console.log(req.params.id);
    connection.query('DELETE FROM suggestions WHERE id=?', req.params.id, function(error, rows, fields){
        if(!!error)
        console.log('error');
        else{
            console.log(rows);
            res.end('success delete!');
        }
    })
})

//Records in Admin module

app.get('/getUserRecords', function(req,res){
    connection.query('SELECT * FROM users ', function(error, rows, fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(rows);
        }
    });
})

//Admin get Users
app.get('/usersInAdmin', function(req,res){
    connection.query('SELECT * FROM users ', function(error, rows, fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(rows);
        }
    });
})

//delete users from admin

app.delete('/UserDeleted/:phoneNumber', function(req, res){
    console.log(req.params.phoneNumber);
    connection.query('DELETE FROM users WHERE phoneNumber =?', req.params.phoneNumber, function(error, rows, fields){
        if(!!error)
        console.log('error');
        else{
            console.log(rows);
            res.end('success delete!');
        }
    })
})

//update Users

app.put('/usersUpdated', function(req, res){
    var phoneNumber = req.body.phoneNumber;
    var name = req.body.name;
    var email = req.body.email
    var password = req.body.password;
    // console.log(req.param.phone_number);
    connection.query('UPDATE users SET name=?, phoneNumber=?, password=? WHERE email=?', [name,phoneNumber,password,email], function(error, rows, fields){
        if(error) throw error;
            console.log(rows);
            res.end(JSON.stringify(rows));
    })
})

//post notification
app.post('/postNotification', function(req,res){
    connection.query('INSERT INTO notifications SET ?', req.body, function(error, rows, fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(JSON.stringify(rows));
        } 
    });
})

//get notification

app.get('/GetNotification', function(req,res){
    connection.query('SELECT * FROM notifications', function(error, rows, fields){
        if(!!error) console.log('error');
        else{
            console.log(rows);
            res.send(rows);
        }
    });
})


