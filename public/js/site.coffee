updateOutput = (text, status, xhr, $form) ->
  alert 'status: ' + statusText + '\n\nresponseText: \n' + responseText +
  '\n\nThe output div should have already been updated with the responseText.'

$(document).ready ->
  textarea = document.getElementById 'user_code'
  editor = CodeMirror.fromTextArea textarea, { lineNumbers: true }

  options = {
    target: '#code_output',
    success: updateOutput
  }
  $('#form_code').ajaxForm options