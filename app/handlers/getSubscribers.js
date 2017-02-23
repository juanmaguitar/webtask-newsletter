const RESPONSE = require('../RESPONSE')

function getSubscribers(req,res){
  req.webtaskContext.storage.get(function(err, data){
      if(!err){
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
      } else {
        console.log(err)
        res.writeHead(400, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify(RESPONSE.ERROR))
      }
  });
}

module.exports = getSubscribers