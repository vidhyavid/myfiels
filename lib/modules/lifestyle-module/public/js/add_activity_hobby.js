var BASE_API_URL = "/modules/lifestyle-module";
var act_count = 1

function getAddFormHTML(id) {
  var html = '<div class="space-input" id="act_container__'+id+'">'+
                '<div class="flex-sb">'+
                    '<label class="label-head"><strong>Add a hobby or activity</strong><br>'+
                    '</label><a class="delete-link delete-act" onclick="deleteAct('+id+')" href="javascript:void(0);">Delete</a>'+
                '</div>'+
                '<input type="text" class="sm-font-14" placeholder="Add a hobby or activity" id="act_hobby__'+id+'">'+
              '</div>';
  return html;
}

function deleteAct(id) {
  $('#act_container__'+id).remove();
}

function setUpAddAnotherActBtn() {
  $('#add-another-btn').click(function() {
    var new_count = act_count + 1;
    var html = getAddFormHTML(new_count);
    $('#act_list_container').append(html);
    act_count = new_count;
  })
}

function setupSaveBtn() {
  $('#act-save-btn').click(function() {
    var payload = {
      names: [],
    };

    for (var i=0; i<act_count; i++) {
      var id = i+1;
      if ($('#act_container__'+id).length) {
        payload.names.push(
          $('#act_hobby__'+id).val()
        );
      }
    }

    // returns true if payload validation passes
    // definition in add_edit_activity_hobby_common.js
    if (!checkPayloadOK(payload)) {
      cleanErrorAfterChange();
      return;
    }

    console.log('Sending --> ', payload);
    addLoadingToPage();
    $.ajax({
      url: BASE_API_URL + '/add-hobbies-activities',
      type: 'POST',
      dataType: 'json',
      data: payload,
      success: function (response) {
        console.log('success ', response);
        $("#maia-body-inner").addClass("d-none")
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $('#act-add-success-pop').removeClass('d-none');
      },
      error: function (error) {
        console.log('error ', error)
        $('#act-error-message').text(error.responseJSON.message)
        $("#maia-body-inner").addClass("d-none")
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $('#act-add-error-pop').removeClass('d-none')
      },
      complete: function (data) {
        console.log('response data -> ', data);
        removeLoadingFromPage();
      }
    });
  })
}

$(document).ready(function() {
  console.log('add act loaded')
  setUpAddAnotherActBtn()
  setupSaveBtn()
})
