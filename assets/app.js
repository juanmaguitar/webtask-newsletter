(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function loadAdmin () {
  if ( window.location.pathname.includes('/admin/') ) {
    if (localStorage.getItem('token')) {
      const type = 'GET'
      const url = `https://webtask.it.auth0.com/api/run/wt-76fcf2ae5936171bf52221b4075c11a7-0/newsletter/subscribers?webtask_no_cache=1`
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
      $.ajax({ url })
        .done(data => {
          const html = data.map(mail => `<h4>${mail}</h4>`).join('')
          $('#subscribers').html(html)
        })
    } else {
      window.location = '/'
    }
  }
}

module.exports = loadAdmin

},{}],2:[function(require,module,exports){
const updateAuthenticationStatus = require('./updateAuthenticationStatus')

function login () {
  lock.show(function(err, profile, id_token) {
    if (err) {
      return alert(err.message);
    }
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('token', id_token);
    updateAuthenticationStatus();
  });
};

module.exports = login
},{"./updateAuthenticationStatus":4}],3:[function(require,module,exports){
const updateAuthenticationStatus = require('./updateAuthenticationStatus')

function logout() {
  localStorage.removeItem('profile');
  localStorage.removeItem('token');
  updateAuthenticationStatus();
};

module.exports = logout
},{"./updateAuthenticationStatus":4}],4:[function(require,module,exports){
function updateAuthenticationStatus () {
  $('#user').empty()
  $('#login').empty()

  var user = window.localStorage.getItem('profile')

  if (user) {
    user = JSON.parse(user)
    $('#user').show().append(`<a onclick="logout()">${user.email} (Log out)</a>`)
    $('#login').hide()
  } else {
    $('#login').show().append('<a onclick="login()">Log in</a>')
    $('#user').hide()
  }
}

module.exports = updateAuthenticationStatus

},{}],5:[function(require,module,exports){
module.exports = {
  AUTH0_CLIENT_ID: '6gthvmcI4Ke8uYUmpsfIpZTEzJbGsKRC',
  AUTH0_DOMAIN: 'juanmaguitar.eu.auth0.com',
  AUTH0_CALLBACK_URL: location.href
}

},{}],6:[function(require,module,exports){
function newsletterSubmit(e){
  $.ajax({
    type : 'POST',
    url : 'https://wt-76fcf2ae5936171bf52221b4075c11a7-0.run.webtask.io/newsletter/subscribe?webtask_no_cache=1',
    data : { email : $('#email').val() },
    dataType: 'json'
    // headers : {
    //   Authorization : 'Bearer ' + localStorage.getItem('token')
    // }
  }).done(function(data) {
    if(data.statusCode == 200){
      $('#newsletter').hide();
      $('#response').append('<div class="alert alert-success">'+ data.message +'</div>')
    } else {
      $('#newsletter').hide();
      $('#response').append('<div class="alert alert-danger">'+ data.message +'</div>')
    }
  });
  e.preventDefault();
}

module.exports = newsletterSubmit
},{}],7:[function(require,module,exports){
const getHtmlMsgOk = ({ message }) => `<div class="alert alert-success">${message}</div>`
const getHtmlMsgKo = ({ message }) => `<div class="alert alert-danger">${message}</div>`
const getHtmlMsgNotLogged = () => '<div class="alert alert-danger">You must be logged in to submit tips. :(</div>'

function tipSubmit (e) {
  e.preventDefault()

  const token = localStorage.getItem('token')
  const type = 'POST'
  const url = `https://webtask.it.auth0.com/api/run/wt-kukicadnan-gmail_com-0/tips?access_token=${token}`
  const data = { message : $('#message').val() }
  const dataType = 'json'

  $.ajax( { type, url, data, dataType })
    .done( data => {
      $('#response').empty();
      if(data.statusCode == 200){
        $('#tip').hide();
        $('#response').append( getHtmlMsgOk(data) )
      } else {
        $('#tip').hide();
        $('#response').append( getHtmlMsgKo(data) )
      }
    })
    .error( data => {
      $('#response').empty();
      if(data.status == 401){
        $('#response').append( getHtmlMsgNotLogged() )
      }
    });

}

module.exports = tipSubmit
},{}],8:[function(require,module,exports){
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

},{"./admin/loadAdmin":1,"./auth/login":2,"./auth/logout":3,"./auth/updateAuthenticationStatus":4,"./auth0-variables":5,"./eventHandlers/newsletterSubmit.js":6,"./eventHandlers/tipSubmit.js":7}]},{},[8]);
