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