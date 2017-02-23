const RESPONSE = require('../RESPONSE')

function rootHandler(req, res) {
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
}

module.exports = rootHandler