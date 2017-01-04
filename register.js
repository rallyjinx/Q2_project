$(document).ready(function() {
  console.log('ready!');

  $('#register-btn').on('click', function(event) {
    event.preventDefault();
    console.log('register submit button clicked', '?');
    //validate things
    console.log('B.S.');
    squirrelz();
    console.log('A.S.');
    //call http POST route
    //if bad, tell the bad people they are bad

    //if good, go to login page
  })
}); // end document.ready

function squirrelz() {
  console.log('i r squirrel');
  var $xhr = $.getJSON('localhost:8000/users');
  $xhr.done((data) => {
    console.log(JSON.stringify(data));
  })
};
