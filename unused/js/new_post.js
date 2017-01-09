$(document).ready(function() {
  console.log('ready!');

  $('#post-submit-btn').on('click', function(event) {
    event.preventDefault();
    console.log('submit post button clicked');
    let text = $('#post-text').val();
    let topic = $('input[name=topics]:checked').val();
    console.log(text, topic);
    submit_new_post(text, topic);
    console.log('after submit_new_post()');
  }); //end click handler

}); //end document.ready()

function submit_new_post(req_text, req_topic) {
  console.log('inside submit_new_post()', req_text, req_topic);
  //ajax POST call
  $.ajax({
    url: '/posts',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify( { "user_id": 1, "idea_text":req_text, "topic":req_topic, "new_user_id":1, "claimed":0 } ),
    processData: false,
    success: function( data, textStatus, jQxhr ) {
      console.log('success!', JSON.stringify(data));
    },
    error: function( jqXhr, textStatus, errorThrown ) {
      console.log('error', errorThrown);
    }
  });
};
