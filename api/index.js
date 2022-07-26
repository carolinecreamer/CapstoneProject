const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const authRoute = require('./authentication/authentication')
const citiesRoute = require('./citiesRoutes/cities')
const usersRoute = require('./userRoutes/users')
//import Parse from 'parse/dist/parse.min.js';
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY} = require('./config')
//const { default: App } = require('../ui/src/components/App/App')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())
app.use('/auth', authRoute)
app.use('/cities', citiesRoute)
app.use('/users', usersRoute)

// initalize Parse
Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = "https://parseapi.back4app.com"

// Gets the landing page for the website
app.get('/', (req, res) => {
  res.send('Hello World!')
})

/*app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});*/



/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
// Shows which port the webpage is connected to
app.listen(port, () => {
  console.log(`Capstone project listening on port ${port}`)
})

// Sets the current user
app.use(function(req, res, next){
  res.locals.user = req.user;
})

/*app.use((error, req, res, next) => {
  const { status, message } = error;

  const errorObject = {
      status: status || 500,
      message: message || "Something went wrong with the application.",
  };

  res.status(status).send({ error: errorObject });
})*/
module.exports = app;
