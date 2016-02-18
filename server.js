var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var prompt = require('prompt');
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var PORT = 8080;

var sequelize = new Sequelize('user_pass', 'root');

var User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len:{
      args: [8,255],

      }
    }
  }
});

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main2'
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));


app.get('/', function(req, res){
  res.render('index');
})

app.post('/', function(req, res){
  var min = req.body.password;
    if (min.length > 7){
      bcrypt.hash
      res.redirect('/');
  }
});

// console.log("Enter R for a new account");
// console.log("Enter L to login");

// prompt.get(['input'], function(err, result) {
//   if(result.input === 'R') {
//     // Register
//     prompt.get(['Username', 'Password'], function(err, newUser) {
//       bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash(newUser.Password, salt, function(err, hashedPassword) {
//           User.create({
//             username: newUser.Username,
//             password: hashedPassword
//           }).then(function() {
//             console.log("SAVED!");
//           });
//         });
//       });
//     });
//   } else {

//   }
// });


sequelize.sync().then(function() {
  app.listen(PORT, function(){
    console.log('listening on port %s', PORT);
  });
});
