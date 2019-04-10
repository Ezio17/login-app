const express = require('express');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.text())

let users = []

app.use(express.static('build'));

app.get('/users', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.json(users)
});

app.post("/users", function (request, response) {
  if (!request.body) return response.sendStatus(400);
  users.push(JSON.parse(request.body))

  response.set('Access-Control-Allow-Origin', '*');
  response.json(users);
  console.log(users)
});

app.listen(port, () => {
  console.log(`Open http://127.0.0.1:${port}`)
})