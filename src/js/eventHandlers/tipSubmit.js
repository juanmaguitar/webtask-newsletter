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