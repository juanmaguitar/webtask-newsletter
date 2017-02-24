var wt = require('webtask-tools');
const app = require('./app');
const RESPONSE = require('./app/RESPONSE');

module.exports = wt.fromExpress(app).auth0({
  exclude : [
    '/subscribe'
  ],
  loginError: function (error, ctx, req, res, baseUrl) {
      res.writeHead(401, { 'Content-Type': 'application/json'})
      res.end(JSON.stringify(RESPONSE.UNAUTHORIZED))
    }
});