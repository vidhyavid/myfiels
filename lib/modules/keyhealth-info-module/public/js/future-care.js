$(document).ready( function(){
  var API_URI = "/modules/keyhealth-info-module";
  var METHOD = "PUT";

  $("#future-care-form").validate({
    ignore: [],
    rules: {
      organ_donor: {
        required: true,
      },
    },
    // highlight: function (element) {
    //   $(element)
    //     .closest(".input-group")
    //     .removeClass("has-success")
    //     .addClass("has-error");
    // },
    messages: {
      organ_donor: "This field is required",
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") == "organ_donor")
        error.appendTo($(".organ_donor_wrapper"));
    },
    submitHandler: function (form) {
      console.log(API_URI + "/health_factors");
      $(".maia-loading").removeClass("d-none");
      $(".maia-loading").addClass("d-flex");
      $("#pop-up-hd-sub-ft").removeClass("d-block");
      $("#pop-up-hd-sub-ft").addClass("d-none");

      $.ajax({
        url: API_URI + "/key-health-info",
        type: METHOD,
        dataType: "json",
        data: $("#future-care-form").serialize(),
        success: function (healthFactorResponse) {
          $(".maia-loading").addClass("d-none");
          $(".maia-loading").removeClass("d-flex");
          if (healthFactorResponse.status == "success") {
            $("#maia-body-inner").addClass("d-none");
            $(".maia-loading").removeClass("d-flex");
            $(".maia-loading").addClass("d-none");
            $("#pop-up-hd-sub-ft").removeClass("d-none");
            $("#pop-up-hd-sub-ft").addClass("d-block");
          }
        },
        error: function (error) {
          //$(".maia-loading").addClass("d-none");
          //$(".warning-des").html(error.responseJSON.message);
         // console.log(error.responseJSON.message);
          $(".maia-loading").removeClass("d-flex");
          $(".maia-loading").addClass("d-none");
          $("#maia-body-inner").addClass("d-none")
          $("#pop-up-hd-sub-ft").removeClass("d-none");
          $("#pop-up-hd-sub-ft").addClass("d-block");
          //$("#health-factors-error-message").text(error.responseJSON.message);
          //$("#health-factors-error-pop").removeClass("d-none");
        },
      });
    },
  });

});
