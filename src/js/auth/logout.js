const updateAuthenticationStatus = require('./updateAuthenticationStatus')

function logout() {
  localStorage.removeItem('profile');
  localStorage.removeItem('token');
  updateAuthenticationStatus();
};

module.exports = logout