var BASE_API_URL = "/modules/current-health-module";
var med_count = 1;

function getAddForm(id) {
  var html = '<div id="med__'+id+'" class="top-line">'+
                '<div class="space-input">'+
                    '<div class="flex-sb">'+
                        '<label class="label-head"><strong>Add a medication</strong><br></label>'+
                        '<a class="delete-link" href="javascript:void(0);" onclick="deleteMedStep('+id+')">Delete</a>'+
                    '</div>'+
                    '<input type="text" class="sm-font-14" placeholder="Add a medication" id="name__'+id+'">'+
                '</div>'+
                '<div class="space-input">'+
                    '<label class="label-head"><strong>Dose</strong><br></label>'+
                    '<input type="text" class="sm-font-14" id="dose__'+id+'" placeholder="What strength is your medication?">'+
                '</div>'+
                '<div class="space-input">'+
                    '<label class="label-head"><strong>Frequency</strong><br></label>'+
                    '<input type="text" class="sm-font-14" id="frequency__'+id+'" placeholder="How often do you take it?">'+
                '</div>'+
              '</div>';
  return html;
}

function deleteMedStep(id) {
  if($('#med__'+id).length) {
    med_count=$('#med__'+id).length;
    $('#med__'+id).remove()
  }
}
function setupAddAnotherBtn() {
  $('#add_another_med_btn').click(function() {
    var new_med_count = med_count + 1;
    var html = getAddForm(new_med_count);
    $('#medications-container').append(html);
    med_count = new_med_count;
  })
}
function setupSaveBtn() {
  $('#add_med_save_btn').click(function() {
    var payload = {
      "medications": []
    };
    for(var i=0; i<med_count; i++) {
      var id = i+1;
      if ($('#name__'+id).length) {
        var med = {
          name: $('#name__'+id).val(),
          dose: $('#dose__'+id).val(),
          frequency: $('#frequency__'+id).val(),
        }       
        payload.medications.push(med);        
      }
    }
    // returns true if payload validation passes
    // definition in add_edit_medication_common.js
    if (!checkPayloadOK(payload)) {
      cleanErrorAfterChange();
      return;
    }
    
    console.log(payload,'payload data')
    addLoadingToPage();
    
    $.ajax({
      url: BASE_API_URL + '/add-medications',
      type: 'POST',
      dataType: 'json',
      data: payload,
      success: function (response) {
        $("#maia-body-inner").addClass("d-none")
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $('#med-add-success-pop').removeClass('d-none');
      },
      error: function (error) {
        console.log('error ', error)
        $('#med-error-message').text(error.responseJSON.message);
        $("#maia-body-inner").addClass("d-none")
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $('#med-add-error-pop').removeClass('d-none')
      },
      complete: function (data) {
        console.log('response data -> ', data);
        removeLoadingFromPage();
      }
    });
  })
}

$(document).ready(function() {
  console.log('loaded add medication');
  setupAddAnotherBtn()
  setupSaveBtn()
})
