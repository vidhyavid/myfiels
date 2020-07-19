$(document).ready(function(){
  var API_URI = "/modules/alcohol-module";
  var METHOD = "PUT";

  $("#alcohol-date").datepicker({
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

  $("#alcohol-form").validate({
    ignore: [],
    rules: {
      date: {
        required: true,
      },
      units: {
        required: true,
        number: true,
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
      var dateFormat = getYYYMMDD($('#alcohol-date').val());
      $("input[name='date']").val(dateFormat);   
      var formDate = $("#alcohol-form").serializeArray();
      $(".maia-loading").removeClass("d-none");
      $.ajax({
        url: API_URI + "/update-alcohol",
        type: METHOD,
        dataType: "json",
        data: formDate, //$("#alcohol-form").serialize(),
        success: function (alcoholResponse) {
          $(".maia-loading").addClass("d-none");
          if (alcoholResponse.status == "success") {
            $("#maia-body-inner").addClass("d-none")
            $("#pop-up-hd-sub-ft").removeClass("d-none");
            $('#alcohol-add-success-pop').removeClass('d-none');
          }
        },
        error: function (error) {
          $(".maia-loading").addClass("d-none");
          $("#maia-body-inner").addClass("d-none")
          $("#pop-up-hd-sub-ft").removeClass("d-none");
          $('#alcohol-add-error-pop').removeClass('d-none')
          $('#alcohol-error-message').text(error.responseJSON.message);
s        },
      });
    },
  });
});