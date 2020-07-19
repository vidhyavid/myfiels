var BASE_API_URL = "/modules/aboutme-module";

function makeYYMMDD(d) {
  if (!d) {
    return '';
  }

  // 23/09/2020
  var splits = d.split('/');
  if (!splits) {
    return ''
  }

  // 2020-09-23
  return splits[2] + '-' + splits[1] + '-' + splits[0];
}

function checkProfileImgPresent() {
  $('#profile-upload-button').prop('disabled', true);
  var pic = $('#profile-picture');
  if(pic.attr('src')) {
    pic.css('display', 'block');
  }
}

function removeStrength(id) {
  $('#pf_strength__'+id).remove()
}

function removeWeakness(id) {
  $('#pf_weakness__'+id).remove()
}

function removeHealthGoal(id) {
  $('#pf_healthgoal__'+id).remove()
}

function addAnotherStrength() {
  var current_strength = $('#pf_strength_val').val();
  if (!current_strength) {
    console.log('Strength is empty')
    return;
  }
  var existing_count = $('#pf_strength_count').val();
  var id = parseInt(existing_count) + 1;

  var html = '<div id="pf_strength__'+id+'">'+
            '  <div class="flex-sb">'+
            '      <label class="label-head"></label>'+
            '      <a class="delete-link"'+
            '          onclick="removeStrength('+id+')"'+
            '          href="javascript:void(0);">Delete</a>'+
            '  </div>'+
            '  <div class="flex-sb-c">'+
            '      <input type="text" class="sm-font-14" placeholder="Add some strengths" value="'+current_strength+'">'+
            '  </div>'+
            '</div>';
  $('#pf_strength_container').append(html);
  $('#pf_strength_val').val('');
  $('#pf_strength_count').val(id);
  return;
}

function addAnotherWeakness() {
  var current_weakness = $('#pf_weakness_val').val();
  if (!current_weakness) {
    console.log('Weakness is empty')
    return;
  }
  var existing_count = $('#pf_weakness_count').val();
  var id = parseInt(existing_count) + 1;

  var html = '<div id="pf_weakness__'+id+'">'+
            '  <div class="flex-sb">'+
            '      <label class="label-head"></label>'+
            '      <a class="delete-link"'+
            '          onclick="removeWeakness('+id+')"'+
            '          href="javascript:void(0);">Delete</a>'+
            '  </div>'+
            '  <div class="flex-sb-c">'+
            '      <input type="text" class="sm-font-14" placeholder="Add some weaknesses" value="'+current_weakness+'">'+
            '  </div>'+
            '</div>';
  $('#pf_weakness_container').append(html);
  $('#pf_weakness_val').val('');
  $('#pf_weakness_count').val(id);
  return;
}

function addAnotherHealthGoal() {
  var current_health_goal = $('#pf_health_goal_val').val();
  if (!current_health_goal) {
    console.log('Health goal is empty')
    return;
  }
  var existing_count = $('#pf_health_goals_count').val();
  var id = parseInt(existing_count) + 1;

  var html = '<div id="pf_healthgoal__'+id+'">'+
            '  <div class="flex-sb">'+
            '      <label class="label-head"></label>'+
            '      <a class="delete-link"'+
            '          onclick="removeHealthGoal('+id+')"'+
            '          href="javascript:void(0);">Delete</a>'+
            '  </div>'+
            '  <div class="flex-sb-c">'+
            '      <input type="text" class="sm-font-14" placeholder="Add some health goals" value="'+current_health_goal+'">'+
            '  </div>'+
            '</div>';
  $('#pf_healthgoals_container').append(html);
  $('#pf_health_goal_val').val('');
  $('#pf_health_goals_count').val(id);
  return;
}

function getStrengths() {
  var count = $('#pf_strength_count').val();
  var items = [];
  if(count > 0){
    for (var i=1; i<=count; i++) {
      if($("#pf_strength_val").val() != ""){
        items.push($("#pf_strength_val").val());
      }
      // an input tag within a div - returns array
      var item_jq = $('#pf_strength__'+i).find('input');
      if (item_jq) {
        var item = item_jq[0];
        if (item) {
          items.push($(item).val())
        }
      }
    }
  }else{
    items.push($("#pf_strength_val").val());
  }
  return items;
}

function getWeaknesses() {
  var count = $('#pf_weakness_count').val();
  var items = [];
  if(count > 0){
    for (var i=1; i<=count; i++) {
      if($("#pf_weakness_val").val() != ""){
        items.push($("#pf_weakness_val").val());
      }
      // an input tag within a div - returns array
      var item_jq = $('#pf_weakness__'+i).find('input');
      if (item_jq) {
        var item = item_jq[0];
        if (item) {
          items.push($(item).val())
        }
      }
    }
  }else{
    items.push($("#pf_weakness_val").val());
  }
  return items;
}

function getHealthGoals() {
  var count = $('#pf_health_goals_count').val();
  var items = [];
  if(count > 0){
    for (var i=1; i<=count; i++) {
      if($("#pf_health_goal_val").val() != ""){
        items.push($("#pf_health_goal_val").val());
      }
      // an input tag within a div - returns array
      var item_jq = $('#pf_healthgoal__'+i).find('input');
      if (item_jq) {
        var item = item_jq[0];
        if (item) {
          items.push($(item).val())
        }
      }
    }
  }else{
    items.push($("#pf_health_goal_val").val());
  }
  return items;
}

function setUpSaveBtn() {
  $('#profile-save-btn').click(function() {
    var payload = {
      "photo_url": $('#profile-picture').attr('src'),
      "nick_name": $('#pf_nick_name').val(),
      "strengths": getStrengths(),
      "weaknesses": getWeaknesses(),
      "ethnicity": $('#pf_ethnicity').val(),
      "marital_status": $('#pf_marital_status').val(),
      "gender": $('#pf_gender').val(),
      //"dob": makeYYMMDD($('#pf_dob').val()),
      "health_goals": getHealthGoals(),
      "address": $('#pf_address').val(),
      "full_name": $('#pf_fullname').val(),
      "email": $('#pf_email').val(),
      "phone": $('#pf_phone').val(),
    };

    if($('#pf_dob').val() != ""){
      payload.dob = makeYYMMDD($('#pf_dob').val());
    }

    console.log(payload);

    addLoadingToPage()
    $.ajax({
      url: BASE_API_URL + "/about-me-update-profile",
      type: "PUT",
      dataType: "json",
      data: payload,
      success: function (response) {
        $('#maia-body-inner').hide()
        $('#pop-up-hd-sub-ft').show()
      },
      error: function (error) {
        console.log("error ", error);
        if (error.responseJSON) {
          showErrorBox(error.responseJSON.message)
        }
      },
      complete: function (data) {
        console.log('response data -> ', data);
        removeLoadingFromPage();
      }
    });
  })
}


$(document).ready(function() {
  console.log('edit loaded!')
  checkProfileImgPresent()
  setUpSaveBtn();
})