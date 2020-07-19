function printError(id, msg) {
  if ($('#'+id).length) {
    $('#'+id).after('<label class="error">'+msg+'</label>');
  }
  return;
}

function checkPayloadOK(payload) {
  var isOk = true;
  if (payload.names) {
    var names = payload.names;
    for (var i=0; i<names.length; i++) {
      // will be an array of strings
      var n = names[i];
      if (!n) {
        isOk = false;
        printError('act_hobby__'+(i+1), 'Activity/Hobby cannot be empty')
      }
    }
  } else {
    var hobbies_activities = payload.hobbies_activities;
    for (var i=0; i<hobbies_activities.length; i++) {
      // will be an array of objects
      var n = hobbies_activities[i];
      // console.log(n)
      if (!n.name) {
        isOk = false;
        printError('act_hobby__'+(i+1), 'Activity/Hobby cannot be empty')
      }
    }
  }

  return isOk;
}

function cleanErrorAfterChange() {
  $('input').unbind().on('keyup', function() {
    $('.error').remove()
  })
}