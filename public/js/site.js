function updateOutput(text, status, xhr, $form) {
  console.log('status: ' + status + '\n\nresponseText: \n' + text +
  '\n\nThe output div should have already been updated with the responseText.');
}

$(document).ready(function() {
  var textarea = document.getElementById('user_code');
  var editor = CodeMirror.fromTextArea( textarea, { lineNumbers: true } );

  var options = {
    target: '#code_output',
    success: updateOutput
  }
  $('#form_code').ajaxForm(options);

});