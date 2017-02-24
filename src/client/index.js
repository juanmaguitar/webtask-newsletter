const config = require('./auth0-variables')

window.logout = require('./auth/logout')
window.login = require('./auth/login')

window.lock = new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN, {
    auth: {
      params: {
        scope: 'openid email'
      }
    }
  });

$(document).ready(function () {
  require('./auth/updateAuthenticationStatus')()
  require('./admin/loadAdmin')()
})

$('#newsletter').submit(require('./eventHandlers/newsletterSubmit.js'))
$('#tip').submit(require('./eventHandlers/tipSubmit.js'))
