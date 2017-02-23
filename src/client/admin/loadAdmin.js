function loadAdmin(){
  if(window.location.pathname == '/admin/'){
    if(localStorage.getItem('token')){
      $.ajax({
        type : 'GET',
        url : 'https://webtask.it.auth0.com/api/run/wt-76fcf2ae5936171bf52221b4075c11a7-0/newsletter/subscribers?webtask_no_cache=1',
        headers : {
          Authorization : 'Bearer ' + localStorage.getItem('token')
        }
      }).done(function(data) {
        for(var i = 0; i < data.length; i++){
          $('#subscribers').append('<h4>' + data[i] + '</h4>');
        }
      });
    } else {
      window.location = '/';
    }
  }
}

module.exports = loadAdmin