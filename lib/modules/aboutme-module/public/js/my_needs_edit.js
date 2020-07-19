var BASE_API_URL = "/modules/aboutme-module";

function removeItem(id, type) {
  console.log('removing ', id, type);
  $('#pf_'+type+'__'+id).remove()
}

function addAnotherItem(type) {
  console.log('adding a ', type)
  var current_value = $('#pf_'+type).val();
  if (!current_value) {
    console.log('Current '+type+' is empty')
    return;
  }
  var existing_count = $('#pf_'+type+'_count').val();
  var id = parseInt(existing_count) + 1;

  var html = '<div id="pf_'+type+'__'+id+'">'+
            '  <div class="flex-sb">'+
            '      <label class="label-head"></label>'+
            '      <a class="delete-link"'+
            '          onclick="removeItem('+id+', \''+type+'\')"'+
            '          href="javascript:void(0);">Delete</a>'+
            '  </div>'+
            '  <div class="flex-sb-c">'+
            '      <input type="text" class="sm-font-14" placeholder="Add some values" value="'+current_value+'">'+
            '  </div>'+
            '</div>';
  $('#pf_'+type+'_container').append(html);
  $('#pf_'+type).val('');
  $('#pf_'+type+'_count').val(id);
  return;
}

function getFieldValues(type) {
  var count = $('#pf_'+type+'_count').val();
  var items = [];

  if(count > 0){
    for (var i=1; i<=count; i++) {

      if(type == "routines" && $("#pf_routines").val() != ""){
        items.push($("#pf_routines").val());
      }

      if(type == "upset" && $("#pf_upset").val() != ""){
        items.push($("#pf_upset").val());
      }

      if(type == "calm" && $("#pf_calm").val() != ""){
        items.push($("#pf_calm").val());
      }

      if(type == "myself" && $("#pf_myself").val() != ""){
        items.push($("#pf_myself").val());
      }

      if(type == "help" && $("#pf_help").val() != ""){
        items.push($("#pf_help").val());
      }
      // an input tag within a div - returns array
      var item_jq = $('#pf_'+type+'__'+i).find('input');
      if (item_jq) {
        var item = item_jq[0];
        if (item) {
          items.push($(item).val())
        }
      }
      console.log("==== items ====", items);
    }
  }else{
    if(type == "routines"){
      items.push($("#pf_routines").val());
    }
    if(type == "upset"){
      items.push($("#pf_upset").val());
    }
    if(type == "calm"){
      items.push($("#pf_calm").val());
    }
    if(type == "myself"){
      items.push($("#pf_myself").val());
    }
    if(type == "help"){
      items.push($("#pf_help").val());
    }
  }
  return items;
}

function setUpSaveBtn() {
  $('#needs-save-btn').click(function() {
    var payload = {
      "routines": getFieldValues('routines'),
      "best_communication": $('#pf_comm').val(),
      "mobility_needs": $('#pf_mobility').val(),
      "upset_things": getFieldValues('upset'),
      "calm_things": getFieldValues('calm'),
      "things_for_myself": getFieldValues('myself'),
      "things_help_with": getFieldValues('help'),
      "personal_care": $('#pf_personal_care').val(),
      "eating_drinking": $('#pf_eating').val(),
      "how_medication": $('#pf_meds').val(),
      "things_know_about_me": $('#pf_about_me').val(),
    };

    // console.log(payload);
    // return;

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
  setUpSaveBtn()
});
