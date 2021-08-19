const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Hitesh:hskT123%40k@cluster.fldzn.mongodb.net/Node-Auth-JWT?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoutes);

//cookies

app.get('/set-cookies', (req,res) => {
  res.setHeader('Set-Cookie', 'newUser=true');

  res.send('You got the cookie');
});

app.get('/read-cookies', (req,res) => {

});
