const express = require('express');
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.text())

let users = []

app.use(express.static('build'));

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  next();
});

app.get('/api/users', (request, response) => {
  response.json(users)
});

app.post("/api/users", function (request, response) {
  if (!request.body) return response.sendStatus(400);
  users.push(JSON.parse(request.body))

  response.json(users);
  console.log(users)
});

app.listen(port, () => {
  console.log(`Open http://127.0.0.1:${port}`)
})