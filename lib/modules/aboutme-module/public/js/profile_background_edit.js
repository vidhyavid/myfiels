var BASE_API_URL = "/modules/aboutme-module";

function removeValue(id) {
  $('#pf_value__'+id).remove()
}

function removeAch(id) {
  $('#pf_ach__'+id).remove()
}

function removePlace(id) {
  $('#pf_place__'+id).remove()
}

function removeBelief(id) {
  $('#pf_belief__'+id).remove()
}

function addAnotherValue() {
  var current_value = $('#pf_value').val();
  if (!current_value) {
    console.log('Current value is empty')
    return;
  }
  var existing_count = $('#pf_values_count').val();
  var id = parseInt(existing_count) + 1;
  var html = '<div id="pf_value__'+id+'">'+
            '  <div class="flex-sb">'+
            '      <label class="label-head"></label>'+
            '      <a class="delete-link"'+
            '          onclick="removeValue('+id+')"'+
            '          href="javascript:void(0);">Delete</a>'+
            '  </div>'+
            '  <div class="flex-sb-c">'+
            '      <input type="text" class="sm-font-14" placeholder="Add some values" value="'+current_value+'">'+
            '  </div>'+
            '</div>';
  $('#pf_values_container').append(html);
  $('#pf_value').val('');
  $('#pf_values_count').val(id);
  return;
}

function addAnotherBelief() {
  var current_value = $('#pf_belief').val();
  if (!current_value) {
    console.log('Current belief is empty')
    return;
  }
  var existing_count = $('#pf_beliefs_count').val();
  var id = parseInt(existing_count) + 1;

  var html = '<div id="pf_belief__'+id+'">'+
            '  <div class="flex-sb">'+
            '      <label class="label-head"></label>'+
            '      <a class="delete-link"'+
            '          onclick="removeBelief('+id+')"'+
            '          href="javascript:void(0);">Delete</a>'+
            '  </div>'+
            '  <div class="flex-sb-c">'+
            '      <input type="text" class="sm-font-14" placeholder="Add a belief" value="'+current_value+'">'+
            '  </div>'+
            '</div>';
  $('#pf_beliefs_container').append(html);
  $('#pf_belief').val('');
  $('#pf_beliefs_count').val(id);
  return;
}

function addAnotherAch() {
  var current_value = $('#pf_ach').val();
  if (!current_value) {
    console.log('Current achievement is empty')
    return;
  }
  var existing_count = $('#pf_achs_count').val();
  var id = parseInt(existing_count) + 1;

  var html = '<div id="pf_ach__'+id+'">'+
            '  <div class="flex-sb">'+
            '      <label class="label-head"></label>'+
            '      <a class="delete-link"'+
            '          onclick="removeAch('+id+')"'+
            '          href="javascript:void(0);">Delete</a>'+
            '  </div>'+
            '  <div class="flex-sb-c">'+
            '      <input type="text" class="sm-font-14" placeholder="Add an achievement or interest" value="'+current_value+'">'+
            '  </div>'+
            '</div>';
  $('#pf_achs_container').append(html);
  $('#pf_ach').val('');
  $('#pf_achs_count').val(id);
  return;
}

function addAnotherPlace() {
  var current_value = $('#pf_place').val();
  if (!current_value) {
    console.log('Current place is empty')
    return;
  }
  var existing_count = $('#pf_places_count').val();
  var id = parseInt(existing_count) + 1;

  var html = '<div id="pf_place__'+id+'">'+
            '  <div class="flex-sb">'+
            '      <label class="label-head"></label>'+
            '      <a class="delete-link"'+
            '          onclick="removePlace('+id+')"'+
            '          href="javascript:void(0);">Delete</a>'+
            '  </div>'+
            '  <div class="flex-sb-c">'+
            '      <input type="text" class="sm-font-14" placeholder="Add an place to live or visit" value="'+current_value+'">'+
            '  </div>'+
            '</div>';
  $('#pf_places_container').append(html);
  $('#pf_place').val('');
  $('#pf_places_count').val(id);
  return;
}

function getValues() {
  var count = $('#pf_values_count').val();
  var items = [];
  if(count > 0){
    for (var i=1; i<=count; i++) {

      if($("#pf_value").val() != ""){
        items.push($("#pf_value").val());
      }
      // an input tag within a div - returns array
      var item_jq = $('#pf_value__'+i).find('input');
      if (item_jq) {
        var item = item_jq[0];
        if (item) {
          items.push($(item).val())
        }
      }
    }
  }else{
    items.push($("#pf_value").val());
  }
  return items;
}

function getBeliefs() {
  var count = $('#pf_beliefs_count').val();
  var items = [];
  if(count > 0){
    for (var i=1; i<=count; i++) {
      if($("#pf_belief").val() != ""){
        items.push($("#pf_belief").val());
      }
      // an input tag within a div - returns array
      var item_jq = $('#pf_belief__'+i).find('input');
      if (item_jq) {
        var item = item_jq[0];
        if (item) {
          items.push($(item).val())
        }
      }
    }
  }else{
    items.push($("#pf_belief").val());

  }
  return items;
}

function getAchs() {
  var count = $('#pf_achs_count').val();
  var items = [];
  if(count > 0){
    for (var i=1; i<=count; i++) {
      if($("#pf_ach").val() != ""){
        items.push($("#pf_ach").val());
      }
      // an input tag within a div - returns array
      var item_jq = $('#pf_ach__'+i).find('input');
      if (item_jq) {
        var item = item_jq[0];
        if (item) {
          items.push($(item).val())
        }
      }
    }
  }else{
    items.push($("#pf_ach").val());
  }
  return items;
}

function getPlaces() {
  var count = $('#pf_places_count').val();
  var items = [];

  if(count > 0){
    for (var i=1; i<=count; i++) {
      if($("#pf_place").val() != ""){
        items.push($("#pf_place").val());
      }
      // an input tag within a div - returns array
      var item_jq = $('#pf_place__'+i).find('input');
      if (item_jq) {
        var item = item_jq[0];
        if (item) {
          items.push($(item).val())
        }
      }
    }
  }else{
    items.push($("#pf_place").val()); 
  }
  return items;
}

function setupSaveBtn() {
  $('#pf-bg-save-btn').click(function() {
    var payload = {
      "personal_history": $('#pf_personal_history').val(),
      "family_and_friends": $('#pf_family_and_friends').val(),
      "history_affects_lifestyle": $('#pf_history_affects_lifestyle').val(),
      "values": getValues(),
      "beliefs": getBeliefs(),
      "achievements_interests": getAchs(),
      "places_to_live_visit": getPlaces(),
    };

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

  });
}

$(document).ready(function() {
  setupSaveBtn();
})