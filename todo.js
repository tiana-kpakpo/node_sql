//app requirements and dependencies

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const routes = require('./route')
    

const PORT = 4000;  //server port

//middleware
//To parse json data
app.use(bodyParser.json())
//allow origin access
app.use(cors({
    origin : '*'
}))
//add public folder to the client 
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile('todo.html', err => {
        if (err) {
          res.status(403).send('error todo.html not found');
        }
      });
})

//api
app.use('/api', routes)

  //start app on this port
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
