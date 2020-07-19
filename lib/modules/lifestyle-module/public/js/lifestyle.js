$(document).ready(function () {
  var API_URI = "/modules/lifestyle-module";
  var METHOD = "POST";

  // Calculating the BMI based on the height and weight
  $(document).on("change", ".bmi-calculation", function () {
    var weight = $("#health-factor-weight").val();
    var height = $("#health-factor-height").val();
    if (weight > 0 && height > 0) {
      var finalBmi = weight / (((height / 100) * height) / 100);
      var dec = parseFloat(finalBmi, 10).toFixed(2);

      $("#health-factor-bmi").val(dec);
    }
  });

  $("#health-factor-form").validate({
    ignore: [],
    rules: {
      smoking: {
        required: true,
        number: true,
      },
      drinking: {
        required: true,
        number: true,
      },
      weight: {
        required: true,
        number: true,
      },
      height: {
        required: true,
        number: true,
      },
    },
    highlight: function (element) {
      $(element)
        .closest(".input-group")
        .removeClass("has-success")
        .addClass("has-error");
    },
    // messages: {
    //   smoking: "Please select smoking",
    //   drinking: "Please select drinking",
    //   weight: "Please select weight",
    //   height: "Please select height",
    // },
    errorPlacement: function (error, element) {
      if (element.attr("name") == "smoking")
        error.appendTo($(".smoking_wrapper"));
      else if (element.attr("name") == "drinking")
        error.appendTo($(".drinking_wrapper"));
      else if (element.attr("name") == "weight")
        error.appendTo($(".weight_wrapper"));
      else if (element.attr("name") == "height")
        error.appendTo($(".height_wrapper"));
      else if (element.attr("name") == "bmi") error.appendTo($(".bmi_wrapper"));
    },
    submitHandler: function (form) {
      console.log(API_URI + "/health_factors");
      $(".maia-loading").addClass("d-flex");
      $(".maia-loading").removeClass("d-none");
      $.ajax({
        url: API_URI + "/health_factors",
        type: METHOD,
        dataType: "json",
        data: $("#health-factor-form").serialize(),
        success: function (healthFactorResponse) {
          $(".maia-loading").removeClass("d-flex");
          $(".maia-loading").addClass("d-none");
          if (healthFactorResponse.status == "success") {
            // const url = "/my-health/lifestyle";
            // $(location).attr("href", url);
            $("#maia-body-inner").addClass("d-none")
            $("#health-factors-success-pop").removeClass("d-none");
            $("#pop-up-hd-sub-ft").removeClass("d-none");
          }
        },
        error: function (error) {
          //$(".maia-loading").addClass("d-none");
          //$(".warning-des").html(error.responseJSON.message);
          console.log(error.responseJSON.message);
          $("#maia-body-inner").addClass("d-none")
          $("#pop-up-hd-sub-ft").removeClass("d-none");
          $("#health-factors-error-message").text(error.responseJSON.message);
          $("#health-factors-error-pop").removeClass("d-none");
        },
      });
    },
  });
});
