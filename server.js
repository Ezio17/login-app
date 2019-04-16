const express = require('express');
const fs = require('fs')
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const app = express();
const path = require('path');

app.use(bodyParser.text())

let users = []
readUsers()

app.use(express.static('build'));

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  next();
});

function readUsers() {
  fs.readFile('./server/users.json', 'utf8', function (err, data) {
    if (err) {
      return;
    }

    users = JSON.parse(data);
  });
}

function writeUsers() {
  fs.writeFile('./server/users.json', JSON.stringify(users), function (err) {
    if (err) {
      return;
    }

    console.log('Saved!');
  });
}

app.get('/api/users', (request, response) => {
  response.json(users)
});

app.post("/api/users", function (request, response) {
  if (!request.body) return response.sendStatus(400);
  users.push(JSON.parse(request.body))
  writeUsers()
  response.json(users);
});

app.listen(port, () => {
  console.log(`Open http://127.0.0.1:${port}`)
})