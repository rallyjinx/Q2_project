$(document).ready(function() {
  console.log('ready!');

  $('#login-btn').on('click', function(event) {
    event.preventDefault();
    console.log('submit button clicked');
    let user = $('#username').val();
    let pw = $('#password').val();
    console.log('click handler', user, pw);
    http_login(user, pw);
    console.log('succesfully escaped http_login()');
    //check login info against database
    //validations???

    //if login incorrect, return errors

    //if login correct, take user to dashboard
    //save session cookie things

  }) //end login submit button click handler

}); //end document.ready

function http_login(req_user, req_pw) {
  console.log('http_login()', req_user, req_pw);
  //do things here - POST ajax call - login validations
}

// function http_req(req_username, req_email, req_password) {
//   console.log('http_req data', req_username, req_email, req_password);
//   $.ajax({
//     url: '/users',
//     dataType: 'json',
//     type: 'post',
//     contentType: 'application/json',
//     data: JSON.stringify( { "username": req_username, "email": req_email, "digest": req_password } ),
//     processData: false,
//     success: function( data, textStatus, jQxhr ) {
//       console.log("success!", JSON.stringify(data));
//     },
//     error: function( jqXhr, textStatus, errorThrown ){
//       console.log("error", errorThrown);
//     }
//   });
// };
