const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();

const path = require("path");
const methodOverride = require("method-override");


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: '',
  password: '',
});
//placeholder;
// let q = "INSERT INTO user(id, username, email, password) VALUES ? ";


let  getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(), 
    faker.internet.password(),
 
  ];
}

// let data = [];
// for(let i=1 ; i<=100; i++){
//   data.push(getRandomUser());
// }

//To show the number of users
app.get('/', (req, res)=>{
  let q = "SELECT count(*) FROM user";
  try{
    connection.query(q, (err, results) =>{
      if(err) throw err;
      console.log(results);
      let count = results[0]["count(*)"];
      res.render("home.ejs", {count});
    });
  }
  catch(err){
    console.log(err);
    res.send("error");
  }
})

//to display all the user's details
app.get('/users', (req, res)=>{
  let q = "SELECT * FROM user ORDER BY created_at DESC";
  try{
    connection.query(q, (err, results) =>{
      if(err) throw err;
       
      let data = results;
       
      res.render("users.ejs", {data});
    });
  }
  catch(err){
    console.log(err);
    res.send("error");
  }
})

//edit
app.get("/users/:id/edit", (req, res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM user where id='${id}'`;
  try{
    connection.query(q, (err, results)=>{
      if(err) throw err;
      let user = results[0];
      console.log(user);
      res.render("edit.ejs", {user} );

    })
  }
  catch(err){
    res.send("error");
  }
 
})

//UPDATE DB ROUTE

app.patch("/users/:id", (req, res)=>{
  let {id} = req.params;
  let{username : newUsername,password : formPass } = req.body;
  let q = `SELECT * FROM user where id='${id}'`;
  try{
    connection.query(q, (err, results)=>{
      if(err) throw err;
      let user = results[0];
      if(formPass !== user.password){
        return res.send("wrong password");
      }else{
        let q2 = `UPDATE user SET username='${newUsername}' where id='${id}'`;
        connection.query(q2, (err, result)=>{
          if(err) throw err;
          console.log(formPass,user.password,newUsername);
          res.redirect("/users");
        })
      }
    })
  }
  catch(err){
    res.send("error");
  }
})

//add list
app.get("/users/add", (req, res) => {
  res.render("add.ejs");  // this will show your add.ejs form
});
app.post("/users/add", (req, res)=>{
  let{username, email, password} = req.body;
  let id = faker.string.uuid();
  let q = "INSERT INTO user(id, username, email, password) VALUES (?, ?, ?, ?)";
  try{
    connection.query(q, [id, username, email, password], (err, result)=>{
      if(err) throw err;
      console.log("New user added", result);
      res.redirect("/users");
    });
  }
  catch(err){
    console.log(err);
    res.send("error");
  }
});


// delete confirmation page
app.get("/users/:id/delete", (req, res) => {
  let { id } = req.params;
  res.render("delete.ejs", { id });   // pass id to template
});

// delete user
app.delete("/users/:id", (req, res) => {
  let { id } = req.params;
  let { email: formemail, password: formpass } = req.body;

  let q2 = `SELECT * FROM user WHERE id = ?`;
  connection.query(q2, [id], (err, result) => {
    if (err) throw err;

    let user = result[0];
    if (!user) return res.send("User not found");

    // verify credentials
    if (formemail === user.email && formpass === user.password) {
      let q = `DELETE FROM user WHERE id = ?`;
      connection.query(q, [id], (err2, result2) => {
        if (err2) throw err2;
        console.log("Deleted user:", id);
        res.redirect("/users");
      });
    } else {
      res.send("Invalid email or password");
    }
  });
});

  

 
app.listen("8080", ()=>{
  console.log("listening");
});

// try{
//   connection.query(q, [data] , (err, results)=>{
//     if(err) throw err;
//     console.log(results);
//   });
// }
// catch(err){
//   console.log(err);
// }
// connection.end();



