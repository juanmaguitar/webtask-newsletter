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
