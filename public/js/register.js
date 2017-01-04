$(document).ready(function() {
  console.log('ready!');

  $('#register-btn').on('click', function(event) {
    event.preventDefault();
    console.log('register submit button clicked', '?');
    let user = $('#username').val();
    let email = $('#email').val();
    let password = $('#password').val();
    console.log('click handler', user, email, password);
    //call http POST route
    http_req(user, email, password);
    console.log('back from the stupid not working http_req function');
    //validate things
    //if bad, tell the bad people they are bad

    //if good, go to login page
  })
}); // end document.ready

function http_req(req_username, req_email, req_password) {
  console.log('http_req data', req_username, req_email, req_password);
  $.ajax({
    url: '/routes/users.js',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify( { "username": req_username, "email": req_email, "digest": req_password } ),
    processData: false,
    success: function( data, textStatus, jQxhr ) {
      console.log("success!", JSON.stringify(data));
    },
    error: function( jqXhr, textStatus, errorThrown ){
      console.log("error", errorThrown);
    }

  });
  // $.post('/users',
  //   {username:req_username, email:req_email, digest:req_password}).done((data, textStatus, jqXHR) => {
  //   console.log(JSON.stringify(data));
  // })
};
// $.ajax({
//     url: 'users.php',
//     dataType: 'json',
//     type: 'post',
//     contentType: 'application/json',
//     data: JSON.stringify( { "first-name": $('#first-name').val(), "last-name": $('#last-name').val() } ),
//     processData: false,
//     success: function( data, textStatus, jQxhr ){
//         $('#response pre').html( JSON.stringify( data ) );
//     },
//     error: function( jqXhr, textStatus, errorThrown ){
//         console.log( errorThrown );
//     }
// });
