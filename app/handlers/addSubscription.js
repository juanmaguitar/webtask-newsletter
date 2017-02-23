const RESPONSE = require('../RESPONSE')
const _ = require('lodash');

function addSubscription (req, res){

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
}

module.exports = addSubscription