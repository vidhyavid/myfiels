$(document).ready(function(){
  var API_URI = "/modules/mood-module";
  var METHOD = "PUT";

  $("#mood-date").datepicker({
    changeMonth: true,
    changeYear: true,
    yearRange: '2011:2037',
    dateFormat: 'dd/mm/yy',
    maxDate: 0,
    defaultDate: null
}).on('change', function() {
    $(this).valid();  // triggers the validation test
});

function getYYYMMDD(d) {
  var splits = d.split('/');
  return splits[2]+'-'+splits[1]+'-'+splits[0];
}

  $("#mood-form").validate({
    ignore: [],
    rules: {
      date: {
        required: true,
      },
      moods: {
        required: true,
      },
      notes: {
        maxlength: 250
      },
    },
    // highlight: function (element) {
    //   $(element)
    //     .closest(".input-group")
    //     .removeClass("has-success")
    //     .addClass("has-error");
    // },
    messages: {
      date: "This field is required.",
      units: "This field is required.",
      //maxlength: "This field is required.",
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") == "units"){
        error.appendTo($(".date-wrapper"));
      }else{
        error.insertAfter(element);
      }
  
    },
    submitHandler: function (form) {
      var dateFormat = getYYYMMDD($('#mood-date').val());
      $("input[name='date']").val(dateFormat);   
      var formDate = $("#mood-form").serializeArray();
      $(".maia-loading").removeClass("d-none");
      $.ajax({
        url: API_URI + "/update-mood",
        type: METHOD,
        dataType: "json",
        data: formDate, //$("#mood-form").serialize(),
        success: function (moodResponse) {
          $(".maia-loading").addClass("d-none");
          if (moodResponse.status == "success") {
            $("#maia-body-inner").addClass("d-none")
            $("#pop-up-hd-sub-ft").removeClass("d-none");
            $('#mood-add-success-pop').removeClass('d-none');
          }
        },
        error: function (error) {
          $(".maia-loading").addClass("d-none");
          $("#maia-body-inner").addClass("d-none")
          $("#pop-up-hd-sub-ft").removeClass("d-none");
          $('#mood-add-error-pop').removeClass('d-none')
          $('#mood-error-message').text(error.responseJSON.message);
s        },
      });
    },
  });
});