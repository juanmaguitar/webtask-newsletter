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