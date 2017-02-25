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
