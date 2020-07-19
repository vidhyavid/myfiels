function getUserDeviceString() {
  return $('#user_device_string').val();
}

$(document).ready(function () {
  var API_URI = "/modules/auth-module";
  var METHOD = "POST";
  // User sign in form submission

  $("#showPassword").click(function () {
    if ($("#signin_password").attr("type") === "password") {
      $("#showPassword").text("hide");
      $("#signin_password").attr("type", "text");
    } else {
      $("#showPassword").text("show");
      $("#signin_password").attr("type", "password");
    }
  });

  $.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      var check = false;
      return this.optional(element) || regexp.test(value);
    },
    "Please enter Valid password"
  );

  $("#signupform").validate({
    rules: {
      first_name: "required",
      email: { email: true, required: true },
      phone_number: { required: true, minlength: 10 },
      password: {
        required: true,
        regex: /(?=.*[!@#$%^&*])[a-zA-Z0-9![@#$%/()<>{^&*]{8,}/i,
        minlength: 8,
      },
    },

    messages: {
      first_name: "Please enter your name",
      email: {
        email: "Please enter your valid email address",
        required: "Please enter your email address",
      },
      phone_number: {
        minlength: "Please enter your valid mobile number",
        required: "Please enter your mobile number",
      },
      password: {
        minlength: "Please enter valid password",
        required: "Please enter your password",
      },
    },

    submitHandler: function (form) {
      console.log("-------------signup---------");
      $(".maia-loading").addClass("d-flex");
      $(".maia-loading").removeClass("d-none");
      $.ajax({
        url: API_URI + "/signup",
        type: METHOD,
        dataType: "json",
        data: {
          first_name: $("#signin_first_name").val(),
          email: $("#signin_email").val(),
          password: $("#signin_password").val(),
          phone_number: $("#signin_phone_number").val(),
          reCaptchaToken: grecaptcha.getResponse(),
          // user_device: getUserDeviceString(),
        },
        success: function (signupResponse) {
          console.log("-------------sucess---------", signupResponse);
          $(".maia-loading").removeClass("d-flex");
          $(".maia-loading").addClass("d-none");
          if (signupResponse.status == "success") {
            localStorage.setItem("temp_uuid", signupResponse.data.user_uuid);
            localStorage.setItem("temp_email", signupResponse.data.email);
            const url = "/users/signup_consent";
            $(location).attr("href", url);
          }
          if (signupResponse.status == "fail") {
            $(".maia-loading").removeClass("d-flex");
            $(".maia-loading").addClass("d-none");
            $("#warning_msg").text(signupResponse.message);
          }
        },
        error: function (error) {},
      });
    },
  });
  $("#signup_consent").validate({
    // initialize the plugin
    ignore: [],
    rules: {
      signup_terms: {
        required: true,
      },
      signup_privacy: {
        required: true,
      },
      consent: {
        required: true,
      },
    },
    messages: {
      signup_terms: {
        required: "Please accept the terms of service",
      },
      signup_privacy: {
        required: "Please accept the terms of the privacy policy",
      },
      consent: {
        required: "Please consent to sharing my data with NHS staff",
      },
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") == "signup_terms")
        error.appendTo($(".signup_terms_wrapper"));
      else if (element.attr("name") == "signup_privacy")
        error.appendTo($(".signup_privacy_wrapper"));
      else if (element.attr("name") == "consent")
        error.appendTo($(".consent_wrapper"));
    },
    submitHandler: function (form) {
      $(".maia-loading").addClass("d-flex");
      $(".maia-loading").removeClass("d-none");

      const userUuid = localStorage.getItem("temp_uuid");
      $.ajax({
        url: API_URI + "/signup_consent?user_uuid=" + userUuid,
        type: "PUT",
        dataType: "json",
        data: {
          terms_and_condition: $("#signup_terms").is(":checked") ? true : false,
          privacy_statement: $("#signup_privacy").is(":checked") ? true : false,
          consent: $("#consent").is(":checked") ? true : false,
        },
        success: function (signupConsentRepsonse) {
          if (signupConsentRepsonse.status == "success") {
            $(".popup").removeClass("d-none");
            signupMailVerification();
          }
          if (signupConsentRepsonse.status == "fail") {
            $("#warning_msg").text(signupConsentRepsonse.message);
          }
        },
        error: function (error) {},
      });
    },
  });

  $("#resend_verification_mail").on("click", function () {
    signupMailVerification();
  });
  function signupMailVerification() {
    $(".maia-loading").removeClass("d-flex");
    $(".maia-loading").addClass("d-none");

    const userUuid = localStorage.getItem("temp_uuid");
    var signupMailVerificationData = {
      uuid: userUuid,
    };

    $.ajax({
      url: API_URI + "/signupmailverification",
      type: "POST",
      dataType: "json",
      data: signupMailVerificationData,
      success: function (verificationRepsonse) {
        $(".maia-loading").removeClass("d-flex");
        $(".maia-loading").addClass("d-none");

        if (verificationRepsonse.status == "success") {
          // localStorage.removeItem("temp_uuid");
          // localStorage.removeItem("temp_email");
          $(".popup").removeClass("d-none");
          // alert(verificationRepsonse.message);
        }
      },
      error: function (error) {},
    });
  }
  $("#forgot_password_form").validate({
    rules: {
      email: { email: true, required: true },
    },
    messages: {
      email: {
        email: "Please enter your valid email address",
        required: "Please enter your email address",
      },
    },

    submitHandler: function (form) {
      $(".maia-loading").removeClass("d-none");

      $.ajax({
        url: API_URI + "/forgot",
        type: METHOD,
        dataType: "json",
        data: {
          email: $("#forgot_email").val(),
        },
        success: function (forgotPasswordDataResponse) {
          $(".maia-loading").removeClass("d-flex");
          $(".maia-loading").addClass("d-none");
          if (forgotPasswordDataResponse.status == "success") {
            $(".forgotshow").show();
          }
          if (forgotPasswordDataResponse.status == "fail") {
            $(".maia-loading").removeClass("d-flex");
            $(".maia-loading").addClass("d-none");
            $("#warning_msg").removeClass("d-none");
            $("#warning_msg").text(forgotPasswordDataResponse.message);
          }
        },
        error: function (error) {},
      });
    },
  });

  $("#reset_password_form").validate({
    rules: {
      password: {
        required: true,
        regex: /(?=.*[!@#$%^&*])[a-zA-Z0-9![@#$%/()<>{^&*]{8,}/i,
        minlength: 8,
      },
      confirmpassword: {
        equalTo: "#reset_password",
      },
    },
    messages: {
      password: {
        minlength: "Please enter valid password",
        required: "Please enter your password",
      },
      confirmpassword: "Please enter confirm password same as password",
    },

    submitHandler: function (form) {
      $(".maia-loading").addClass("d-flex");
      $(".maia-loading").removeClass("d-none");

      var searchParams = new URLSearchParams(window.location.search);
      var verificationToken = null;
      if (searchParams.has("token")) {
        verificationToken = searchParams.get("token");
      }

      $.ajax({
        url: API_URI + "/reset",
        type: METHOD,
        dataType: "json",
        data: {
          password: $("#reset_password").val(),
          confirm_password: $("#reset_confirm_password").val(),
          token: verificationToken,
        },
        success: function (resetPasswordDataDataResponse) {
          $(".maia-loading").removeClass("d-flex");
          $(".maia-loading").addClass("d-none");

          if (resetPasswordDataDataResponse.status == "success") {
            // alert(resetPasswordDataDataResponse.message);
            $(".d-hidehere").hide();
            $(".resetshow").addClass("d-noneI");
          }
        },

        error: function (error) {},
      });
    },
  });

  $(".close-right").click(function () {
    //window.location.reload();
    url = "/users/login";
    $(location).attr("href", url);
    $(".popup").css("display", "none");
  });
});
