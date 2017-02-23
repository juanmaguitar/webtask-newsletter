window.logout = require('./auth/logout')
window.login = require('./auth/login')

window.lock = new Auth0Lock('6gthvmcI4Ke8uYUmpsfIpZTEzJbGsKRC', 'juanmaguitar.eu.auth0.com')

$(document).ready(function () {
  require('./auth/updateAuthenticationStatus')()
  require('./admin/loadAdmin')()
})

$('#newsletter').submit(require('./eventHandlers/newsletterSubmit.js'))
$('#tip').submit(require('./eventHandlers/tipSubmit.js'))
