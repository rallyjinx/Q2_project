$(document).ready(function() {
  console.log('ready!');

  $('#login-btn').on('click', function(event) {
    event.preventDefault();
    console.log('submit button clicked');
    //check login info against database
    //validations??? 

    //if login incorrect, return errors

    //if login correct, take user to dashboard
    //save session cookie things

  }) //end login submit button click handler

}); //end document.ready
