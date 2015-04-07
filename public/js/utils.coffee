$(document).ready ->
  # Activate toggles
  toggles = $('a[data-toggle]')
  toggles.on 'click', ->
    el = $(this).attr 'data-toggle'
    $(el).slideToggle()
