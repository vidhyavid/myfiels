var BASE_API_URL = "/modules/lifestyle-module";

function doDeleteAct(id) {
  console.log('deleting ', id);
  closeDeletePop();

  addLoadingToPage();
  $.ajax({
    url: BASE_API_URL + '/delete-hobby-activity/' + id,
    type: 'DELETE',
    dataType: 'json',
    data: {},
    success: function (response) {
      console.log('success ', response);
      $('#act-del-success-pop').removeClass('d-none');
      $("#maia-body-inner").addClass("d-none")
      $("#pop-up-hd-sub-ft").removeClass("d-none");
    },
    error: function (error) {
      console.log('error ', error)
      $('#act-error-message').text(error.responseJSON.message)
      $('#act-del-error-pop').removeClass('d-none');
      $("#maia-body-inner").addClass("d-none")
      $("#pop-up-hd-sub-ft").removeClass("d-none");
    },
    complete: function (data) {
      console.log('response data -> ', data);
      removeLoadingFromPage();
    }
  });
}

function showDeleteActPop(id) {
  var html = '<div id="delete-act-pop" class="popup">'+
                  '<div class="popup-body">' +
                  '<div class="goal-pop-up-card">' +
                  '<div class="popup-msg">' +
                    '<h1 class="pop-heading">ARE YOU SURE?</h1>'+
                    '<p class="color-w">Are you sure you want to delete this activity/medication?</p>'+
                    '<button onclick="doDeleteAct('+id+')" class="btn btn-primary cancel-btn" type="button"><strong>YES, DELETE</strong></button>'+
                    '<a roll="button" onclick="closeDeletePop()" class="return-link" href="javascript:void(0)"><strong>CANCEL</strong></a>'+
                    '</button>'+
                    "</div>" +
                    "</div>" +
                    "</div>" +
              '</div>';
  $('body').append(html);
}

function closeDeletePop() {
  $('#delete-act-pop').remove();
  return;
}

function setupEditSaveBtn() {
  $('#edit-act-save-btn').click(function() {
    var count = $('#current_act_count').val();
    if (!count) {
      return;
    }
    count = parseInt(count);

    var payload = {
      hobbies_activities: []
    };

    for (var i=0; i<count; i++) {
      var id = i+1;
      if ($('#act_id__'+id).length) {
        var obj = {
          id: $('#act_id__'+id).val(),
          name: $('#act_hobby__'+id).val(),
        }
        payload.hobbies_activities.push(obj);
      }
    }

    // returns true if payload validation passes
    // definition in add_edit_activity_hobby_common.js
    if (!checkPayloadOK(payload)) {
      cleanErrorAfterChange();
      return;
    }

    console.log('Sending --> ', payload)

    addLoadingToPage();
    $.ajax({
      url: BASE_API_URL + '/update-activities-hobbies',
      type: 'PUT',
      dataType: 'json',
      data: payload,
      success: function (response) {
        console.log('success ', response);
        $('#act-update-success-pop').removeClass('d-none');
        $("#maia-body-inner").addClass("d-none")
        $("#pop-up-hd-sub-ft").removeClass("d-none");
      },
      error: function (error) {
        console.log('error ', error)
        $('#act-error-message').text(error.responseJSON.message)
        $('#act-update-error-pop').removeClass('d-none');
        $("#maia-body-inner").addClass("d-none")
        $("#pop-up-hd-sub-ft").removeClass("d-none");
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
  setupEditSaveBtn()
})
