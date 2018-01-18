'use strict';

const express = require('express');
const session = require('express-session');
const ExpressOIDC = require('@okta/oidc-middleware');

const app = express();

// session support is required to use ExpressOIDC
app.use(session({
  secret: 'this should be secure',
  resave: true,
  saveUninitialized: false
}));

const CLIENTID = process.env.CLIENTID;
const CLIENTSECRET = process.env.CLIENTSECRET;
const CALLBACK = process.env.CALLBACK;

console.log("client id is ${CLIENTID}");
console.log("callback is ${CALLBACK}");

const oidc = new ExpressOIDC({
  issuer: 'https://dev-502397.oktapreview.com/oauth2/default',
  client_id: CLIENTID,
  client_secret: process.env.CLIENTSECRET,
  redirect_uri: CALLBACK,
  scope: 'openid profile'
});

// ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.get('/protected', oidc.ensureAuthenticated(), function(req, res) {
  res.send(JSON.stringify(req.userinfo));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
