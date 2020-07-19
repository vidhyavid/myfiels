$(document).ready(function () {
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#profile-picture").attr("src", e.target.result);
        $("#profile-picture").show();
        $('.profile-circle-small').hide();
       // $('.profile-circle-small').prepend('<img id="profile-picture" src="' + e.target.result + '" />');

      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#profile-img").change(function () {
    $('#profile-error-msg').html('');
    var fd = new FormData();
    var files = $('#profile-img')[0].files[0];
    if (files && files.type.split('/')[0] != 'image') {
      console.log("inside");
      $('#profile-error-msg').html('Only images allowed');
      return false;
    }

    //$(this).hide();
    // upload btn disabled by default
    $('#profile-upload-button').prop('disabled', false);
    readURL(this);
  });

  $("#profile-upload-button").click(function(e){
    e.preventDefault();
    var fd = new FormData();
    var files = $('#profile-img')[0].files[0];
    fd.append('file', files);
    $(".maia-loading").removeClass("d-none");
    $(".maia-loading").addClass("d-flex");
    $.ajax({
      url: "/modules/aboutme-module/uploadimg",
      type: 'PUT',
      data: fd,
      contentType: false,
      processData: false,
      success: function (response) {
      $(".maia-loading").addClass("d-none");
      $(".maia-loading").removeClass("d-flex");
      console.log(response)
      console.log("====== response image=========", response.imageurl);
         $('#profile-picture').attr("src", response.imageurl);
         //$('.profile-circle-small').prepend('<img id="profile-picture" src="' + response.data.imageurl + '" />');

      },
      error: function (error) {
        $(".maia-loading").addClass("d-none");
        $(".maia-loading").removeClass("d-flex");


      }
    });
  });
  $("#pf_dob").datepicker({
    changeMonth: true, 
    changeYear: true, 
    dateFormat: "dd/mm/yy",
    yearRange: "-90:+00"
  });
});
