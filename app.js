const express = require('express');
const app = express();

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.get('/authorization-code/callback', function (req, res) {
  res.send('Hello World!');
});


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
