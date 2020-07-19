var BASE_API_URL = "/modules/current-health-module";

function doDeleteMed(id) {
  console.log('deleting ', id);
  closeDeletePop();

  $.ajax({
    url: BASE_API_URL + '/delete-medication/' + id,
    type: 'DELETE',
    dataType: 'json',
    data: {},
    success: function (response) {
      console.log('success ', response);
      $("#maia-body-inner").addClass("d-none")
      $("#pop-up-hd-sub-ft").removeClass("d-none");
      $('#med-del-success-pop').removeClass('d-none');
    },
    error: function (error) {
      console.log('error ', error)
      $('#med-error-message').text(error.responseJSON.message);
      $("#maia-body-inner").addClass("d-none")
      $("#pop-up-hd-sub-ft").removeClass("d-none");
      $('#med-del-error-pop').removeClass('d-none')
    },
    complete: function (data) {
      console.log('response data -> ', data);
      removeLoadingFromPage();
    }
  });
}

function showDeleteMedPop(id) {
  var html = '<div id="delete-med-pop" class="popup">'+
                  '<div class="popup-body">' +
                    '<div class="goal-pop-up-card">' +
                    '<div class="popup-msg">' +
                    '<h1 class="pop-heading">ARE YOU SURE?</h1>'+
                    '<p class="color-w">Are you sure you want to delete this medication?</p>'+
                    '<button onclick="doDeleteMed('+id+')" class="btn btn-primary cancel-btn" type="button"><strong>YES, DELETE</strong></button>'+
                    '<a roll="button" onclick="closeDeletePop()" class="return-link" href="javascript:void(0)"><strong>CANCEL</strong>' +
                    "</div>" +
                    "</div>" +
                    "</div>" +
              '</div>';
  $('body').append(html);
}

function closeDeletePop() {
  $('#delete-med-pop').remove();
  return;
}

function setupDeleteBtn() {
  $('.delete-med').click(function(e) {
    var id = e.target.id;
    var splits = id.split('__');
    id = splits[1];
    showDeleteMedPop(id);
  })
}

function setupEditSaveBtn() {
  $('#edit-med-save-btn').click(function() {
    var count = $('#current_med_count').val();
    if (!count) {
      return;
    }
    count = parseInt(count);

    var payload = {
      medications: []
    };

    for (var i=0; i<count; i++) {
      var id = i+1;
      if ($('#med__'+id).length) {
        var obj = {
          id: $('#med_id__'+id).val(),
          name: $('#name__'+id).val(),
          dose: $('#dose__'+id).val(),
          frequency: $('#frequency__'+id).val(),
        }
        payload.medications.push(obj);
      }
    }

    // returns true if payload validation passes
    // definition in add_edit_medication_common.js
    if (!checkPayloadOK(payload)) {
      cleanErrorAfterChange();
      return;
    }

    console.log('--> sending payload ', payload)
    addLoadingToPage();
    $.ajax({
      url: BASE_API_URL + '/update-medications',
      type: 'PUT',
      dataType: 'json',
      data: payload,
      success: function (response) {
        console.log('success ', response);
        $("#maia-body-inner").addClass("d-none")
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $('#med-update-success-pop').removeClass('d-none');
      },
      error: function (error) {
        console.log('error ', error)
        $('#med-error-message').text(error.responseJSON.message);
        $("#maia-body-inner").addClass("d-none")
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $('#med-update-error-pop').removeClass('d-none')
      },
      complete: function (data) {
        console.log('response data -> ', data);
        removeLoadingFromPage();
      }
    });
  })
}

$(document).ready(function() {
  console.log('edit loaded')
  setupDeleteBtn()
  setupEditSaveBtn()
})
