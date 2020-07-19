function showErrorBox(msg) {
  var html = '<div id="profile-edit-error-pop" class="popup">'+
              '<div class="popup-body">'+
              '    <div class="goal-pop-up-card">'+
              '        <div class="popup-msg">'+
              '            <h1 class="pop-heading">ERROR</h1>'+
              '            <h2 class="pop-heading">Could not update your profile</h2>'+
              '            <p id="profile-error-message" style="color:#fff">'+msg+'</p>'+
              '            <button class="btn btn-primary save-btn" onclick="removeErrorBox()">Close</button>'+
              '        </div>'+
              '    </div>'+
              '</div>'+
            '</div>';
  $('body').append(html);
  return;
}

function removeErrorBox() {
  $('#profile-edit-error-pop').remove();
  return;
}

$(document).ready(function(){
  if($(".info").length > 0)
  {
    $("textarea").bind("change keyup input",function() { 
      $(this).next(".info").show();
      $(this).next(".info").html("Characters left: <span style='color: #61bca4;'>" + (250 - $(this).val().length)+ "<span>");
      if($(this).val().length < 1){
        $(this).next(".info").hide();
      }
    });
  }
});