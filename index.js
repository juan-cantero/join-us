const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.set( "view engine", 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
    host : 'localhost',
    user: 'juan',
    password: 'hungryheart',
    database:'join_us'
});


app.get("/",(req,res) => {
    const query = 'select count(*) as totalUsers from users';
    connection.query(query,function(err, results) {
        if(err) throw err;
        let totalUsers = results[0].totalUsers;
        res.render('home', {count:totalUsers});
    })
})

app.post('/register', (req, res) => {
    
    const person = {
        email: req.body.email
    };

    connection.query('insert into users set ?',person,function(err,result){
        if(err) throw err;
        res.redirect('/');
    })
})
















app.listen(8080,() => "everything is going well");