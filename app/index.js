var express = require('express')
var bodyParser = require('body-parser')
var _ = require('lodash');
var Joi = require('joi');


const RESPONSE = require('./RESPONSE.js')

var app = express();

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded({ extended: false }) )

// parse application/json
app.use( bodyParser.json() )

app.get('/subscribers', function(req,res){
  req.webtaskContext.storage.get(function(err, data){
      if(!err){
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify(RESPONSE.ERROR))
      }
  });
});

app.post('/subscribe', function(req, res){

  var email = req.body.email;

  if( email ){

    req.webtaskContext.storage.get(function(err, data){

      if(err){
        res.writeHead(400, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(RESPONSE.ERROR));
      }

      data = data || [];

      if(_.indexOf(data, email) == -1){
        data.push(email);
        req.webtaskContext.storage.set(data, function(err){
          if(err){
            res.writeHead(400, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(RESPONSE.ERROR));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(RESPONSE.OK));
          }
        })
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(RESPONSE.DUPLICATE));
      }
    })
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify(RESPONSE.ERROR));
  }
})

app.post('/', function (req, res) {
    var body = req.webtaskContext.body;
    if(body.message){
        client.sendMessage({
          to:'+17027854119',
          from: '+17026609897',
          body: body.message
        }, function(err, responseData) {
          if(!err){
            res.end(JSON.stringify(RESPONSE.OK));
          } else {
            res.end(JSON.stringify(RESPONSE.ERROR));
          }
        });
    } else {
      res.end(JSON.stringify(RESPONSE.ERROR));
    }
});

module.exports = app