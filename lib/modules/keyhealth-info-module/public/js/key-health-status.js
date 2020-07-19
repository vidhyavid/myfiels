$(document).ready( function(){
  var API_URI = "/modules/keyhealth-info-module";
  var METHOD = "PUT";
  // Add hospital
  $('#add-hospital').click( function(e){
    e.preventDefault();
    var counter = $('.hospital-details-wrapper').length + 1;

    var html = '<div class="hospital-details-wrapper">'+
              '<div class="space-input top-line"><div>' +
              '<div class="flex-sb"><label class="label-head"><strong>Hospital number</strong><br></label><a class="delete-link" href="#">Delete</a></div>' +
              '<input type="text" name="hospital_number[]" class="sm-font-14 hospital_number" placeholder="Enter hospital number">'+
              '</div>'+
              '</div>'+
          '<div class="space-input"><label class="label-head"><strong>Name of hospital</strong><br></label><input name="hospital_name[]" type="text" class="sm-font-14 hospital_name" placeholder="Enter the hospital that this number is for"></div>'+
          '<div>';

          if($('.hospital-details-wrapper').length > 1){
            $(this).parents('.hospital-details-wrapper').siblings(".hospital-details-wrapper").last().after(html);
          }else{
            $(this).parents('.hospital-details-wrapper').last().after(html);

          }
        });

   // Add physical health diagnosis
    $('#add-physical-health-diagnosis').click( function(e){
      e.preventDefault();
       var counter = $('.physical-health-diagnosis-wrapper').length + 1;

        var html = '<div class="status-profile physical_health_diagnosis_wrapper">' +
                  '<div class="flex-end-c">'+
                  '<div class="profile-icon"><img src="/modules/my-apostrophe-assets/img/directions_run-24px.svg"></div>'+
                  '</div>' +
                  '<div class="w-100">' +
                  '<div class="flex-sb"><label class="label-head"><strong>Physical health diagnosis</strong><br></label><a class="delete-link" href="#">Delete</a></div>'+
                  '<input type="text" name="physical_health_diagnosis[]" class="sm-font-14" placeholder="Add any physical health diagnosis you have">'+
                  '</div>'+
                  '</div>';

    $('.physical-health-diagnosis-wrapper').last().after(html);
  });

  // Add mental health diagnosis
  $('#add-mental-health-diagnosis').click( function(e){
    e.preventDefault();
     var counter = $('.mental-health-diagnosis-wrapper').length + 1;

      var html = '<div class="status-profile mental-health-diagnosis-wrapper">'+
                 '<div class="flex-end-c">'+
                 '<div class="profile-icon"><img src="/modules/my-apostrophe-assets/img/spa-24px.svg"></div>'+
                 '</div>'+
                 '<div class="w-100">'+
                 '<div class="flex-sb"><label class="label-head"><strong>Mental health diagnosis</strong><br></label><a class="delete-link" href="#">Delete</a></div>'+
                 '<input type="text" name="mental_health_diagnosis" class="sm-font-14" placeholder="Add any mental health diagnosis you have"></div>'+
                 '</div>';

  $('.mental-health-diagnosis-wrapper').last().after(html);
});

// Add medications
$('#add-medications').click( function(e){
  e.preventDefault();
   var counter = $('.medications-wrapper').length + 1;

    var html = '<div class="status-profile medications-wrapper">'+
               '<div class="flex-end-c">'+
               '<div class="profile-icon"><img src="/modules/my-apostrophe-assets/img/medication.svg"></div>'+
               '</div>'+
               '<div class="w-100">'+
               '<div class="flex-sb"><label class="label-head"><strong>Medications I am taking</strong><br></label><a class="delete-link" href="#">Delete</a></div>'+
               '<input type="text" name="medications[]" class="sm-font-14" placeholder="Add any medications you are taking"></div>'+
               '</div>';

$('.medications-wrapper').last().after(html);
});

// Add allergies
$('#add-allergies').click( function(e){
  e.preventDefault();
   var counter = $('.allergies-wrapper').length + 1;

    var html = '<div class="status-profile allergies-wrapper">'+
               '<div class="flex-end-c">'+
               '<div class="profile-icon"><img src="/modules/my-apostrophe-assets/img/allergies.svg"></div>'+
               '</div>'+
              '<div class="w-100">'+
              '<div class="flex-sb"><label class="label-head"><strong>Allergies</strong><br></label><a class="delete-link" href="#">Delete</a></div>'+
              '<input type="text" name="allergies[]" class="sm-font-14" placeholder="Add any allergies you have"></div>'+
              '</div>';

$('.allergies-wrapper').last().after(html);
});

// Add allergies
$('#add-immunisations').click( function(e){
  e.preventDefault();
   var counter = $('.immunisations-wrapper').length + 1;

    var html = '<div class="status-profile immunisations-wrapper">'+
               '<div class="flex-end-c">'+
               '<div class="profile-icon"><img src="/modules/my-apostrophe-assets/img/immunisations.svg"></div>'+
              '</div>'+
              '<div class="w-100">'+
              '<div class="flex-sb"><label class="label-head"><strong>Immunisations</strong><br></label><a class="delete-link" href="#">Delete</a></div>'+
              '<input type="text" name="immunisations[]" class="sm-font-14" placeholder="Add your immunisations or vaccines"></div>'+
              '</div>';

$('.immunisations-wrapper').last().after(html);
});

// Add langages
$('#add-language').click( function(e){
  e.preventDefault();
    var html = '<div class="status-profile language-wrapper">'+
               '<div class="flex-end-c">'+
               '<div class="profile-icon"><img src="/modules/my-apostrophe-assets/img/language-24px.svg"></div>'+
               '</div>'+
               '<div class="w-100">'+
               '<div class="flex-sb"><label class="label-head"><strong>Language</strong><br></label><a class="delete-link" href="#">Delete</a></div>'+
               '<div class="maia-select mrg-bt-10 w-100 additional-language">'+
               '</div>'+
               '</div>'+
               '</div>';
$('.language-wrapper').last().after(html);
$("#hidden-languages select ").clone().appendTo('.additional-language:last');

});

// Add who has it
$('#add-who-has-it').click( function(e){
  e.preventDefault();
   var counter = $('.who-has-it-wrapper').length + 1;

    var html = '<div class="who-has-it-wrapper">'+
               '<div class="space-input who-has-it-wrapper">'+
               '<div class="flex-sb"><label class="label-head"><strong>Who has it?</strong><br></label><a class="delete-link" href="#">Delete</a></div>'+
               '<input type="text" name="who_has_it[]" class="sm-font-14" placeholder="Add name of family member has this condition">'+
               '</div>'+
               '</div>';

$('.who-has-it-wrapper').last().after(html);
});

  $(document).on('click', '.delete-link', function(e) {
    e.preventDefault();
    if(this.hasAttribute("id")){
      $("#delete-diag-pop").removeClass("d-none");
      const id = $(this).attr("id");
      var queryparameter = $(this).attr("href");
      $("#delete-button").attr("data-id", id);
      $("#delete-button").attr("data-url", queryparameter);
    }
   $(this).closest('.hospital-details-wrapper, .who-has-it-wrapper, .status-profile').remove();
  });


  $(document).on('click', '#delete-button', function(e) {
    e.preventDefault();
    if(this.hasAttribute("id")){
      $(".maia-loading").removeClass("d-none");
      $(".maia-loading").addClass("d-flex");
      const id = $(this).attr("data-id");
      var queryparameter = $(this).attr("data-url");
      $.ajax({
        url: API_URI + "/key-health-info/" + id + "?"+queryparameter,
        type: "DELETE",
        dataType: "json",
        data: {},
        success: function (response) {
          $(".maia-loading").removeClass("d-flex");
          $(".maia-loading").addClass("d-none");
          $("#delete-diag-pop").addClass("d-none");
          $("#diag-del-success-pop").removeClass("d-none");
          $("#maia-body-inner").addClass("d-none");
          $("#pop-up-hd-sub-ft").removeClass('d-none');
          $("#health-save-success-popup").addClass("d-none");
        },
        error: function (error) {
          console.log("error ", error);
          $(".maia-loading").removeClass("d-flex");
          $(".maia-loading").addClass("d-none");
          $("#delete-diag-pop").addClass("d-none");
          $("#diag-error-message").text(error.responseJSON.message);
          $("#maia-body-inner").addClass("d-none");
          $("#diag-del-success-pop").removeClass("d-none");
          $("#pop-up-hd-sub-ft").removeClass('d-none');

        },
        complete: function (data) {
          //removeLoadingFromPage();
        },
      });
    }
  });

 // terms_and_condition: $("#signup_terms").is(":checked") ? true : false,


  $('form#key-health-info-form').on('submit', function(event) {
   //Add validation rule for dynamically generated name fields
  // $('.hospital_name').each(function() {
  //  $(this).rules("add",
  //      {
  //          required: true,
  //          messages: {
  //              required: "Hospital name is required",
  //          }
  //      });
  // });
  //Add validation rule for dynamically generated email fields
  // $('.hospital_number').each(function() {
  //  $(this).rules("add",
  //      {
  //          required: true,
  //          messages: {
  //              required: "Hospital number is required",
  //            }
  //      });
  // });
  });
  jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
  });
     $("#key-health-info-form").validate({
      ignore: [],
         rules: {
             nhs_number: {
              require_from_group: [1, ".health-status-group"]
             },
             "hospital_number[]": {
              require_from_group: [1, ".health-status-group"]
            },
            "hospital_name[]": {
              require_from_group: [1, ".health-status-group"]
            },
            blood_type: {
              require_from_group: [1, ".health-status-group"]
            },
            "physical_health_diagnosis[]": {
              require_from_group: [1, ".health-status-group"]
            },
            "mental_health_diagnosis[]": {
              require_from_group: [1, ".health-status-group"]
            },
            "medications[]": {
              require_from_group: [1, ".health-status-group"]
            },
            "allergies[]": {
              require_from_group: [1, ".health-status-group"]
            },
            "immunisations[]": {
              require_from_group: [1, ".health-status-group"]
            },
            "language[]": {
              require_from_group: [1, ".health-status-group"]
            },
            condition_name: {
              require_from_group: [1, ".health-status-group"]
            },
            mobility: {
              require_from_group: [1, ".health-status-group"]
            },
            vision: {
              require_from_group: [1, ".health-status-group"]
            },
            hearing: {
              require_from_group: [1, ".health-status-group"]
            },
            condition_name: {
              require_from_group: [1, ".health-status-group"]
            },
            "who_has_it[]": {
              require_from_group: [1, ".health-status-group"]
            },
          },
         highlight: function (element) {
          $(element)
            .closest(".input-group")
            .removeClass("has-success")
            .addClass("has-error");
        },

      errorPlacement: function(error, element) {
      if (element.attr("name") == "nhs_number") {
          error.insertAfter("#error-message");
        } 
      // if (element.attr("name") == "nhs_number") {
      //   error.insertAfter("#error-message");
      // } else {
        //error.insertAfter(element);
      //}
      },
     submitHandler: function (form) {
      $(".maia-loading").removeClass("d-none");
      $(".maia-loading").addClass("d-flex");
      var formData = $("#key-health-info-form").serializeArray();
      // var formData = $("#key-health-info-form").serializeArray().filter(function(k) {
      //   return $.trim(k.value) != "";
      // });

      //This is for checkbox values 
      formData = formData.concat(
      $('#key-health-info-form input[type=checkbox]:not(:checked)').map(
        function() {
            return {name: this.name, value: this.checked}
        }).get()
      );
         $.ajax({
          url: API_URI + "/key-health-info",
          type: METHOD,
          dataType: "json",
          data: formData,
          success: function (healthStatusResponse) {
            $(".maia-loading").removeClass("d-flex");
            $(".maia-loading").addClass("d-none");
            if (healthStatusResponse.status == "success") {
               $("#maia-body-inner").addClass("d-none")
              // $("#health-factors-success-pop").removeClass("d-none");
               $("#pop-up-hd-sub-ft").removeClass("d-none");
            }
          },
          error: function (error) {
          $(".maia-loading").removeClass("d-flex");
          $(".maia-loading").addClass("d-none");
          $("#maia-body-inner").addClass("d-none")
          $("#pop-up-hd-sub-ft").removeClass("d-none");
            // $("#health-factors-error-message").text(error.responseJSON.message);
            // $("#health-factors-error-pop").removeClass("d-none");
          },
        });
     }
     });

  });
