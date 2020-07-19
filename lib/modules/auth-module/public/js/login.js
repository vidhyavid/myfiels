// TODO: there is no login via phone at the moment!
// we get a 200 for even errors!
// flesh out the error handlers next

var BASE_API_URL = "/modules/auth-module";
var user_email = '';

$.validator.addMethod(
  "regex",
  function (value, element, regexp) {
    var check = false;
    return this.optional(element) || regexp.test(value);
  },
  "Please enter Valid password"
);
$.validator.addMethod(
  "email_or_phone_number",
  function (value, element, email_or_phone_number) {
    var check = false;
    return this.optional(element) || /*is optional*/
      /^[0-9,-]{10,15}$|^$/.test(value) || /*is phone number*/
      /^[a-z-0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,7}$/i.test(value); /*is email*/
  },
  "Please enter your email address or phone number"
);
function validatelogin() {
  $("#login_form").validate({
    rules: {
      email_phone: { required: true, email_or_phone_number: true },
      password: { required: true, regex: /(?=.*[!@#$%^&*])[a-zA-Z0-9![@#$%/()<>{^&*]{8,}/i, minlength: 8 },
    },
    messages: {
      email_phone: {
        required: "Please enter your email address or phone number"
      },
      password: {
        minlength: "Please enter valid password",
        required: "Please enter your password",
      },
    },
    submitHandler: function (form) {
      doLogin();
    }
  });
}

function doLoginWithOTP() {
  var payload = {
    email: user_email ? user_email : $('#email_phone').val(),
    password: $('#password').val(),
    login_otp: '',
    user_device: $('#user_device_string').val(),
    remember_me: $('#remember_me').is(':checked'),
  };

  var otp = '';
  for (var i = 0; i < 4; i++) {
    otp += $('#otp_' + (i + 1)).val()
  }
  payload.login_otp = otp;
  $(".error-otp").remove();
  if (($("#otp_1").val() == '') && ($("#otp_2").val() == '') && ($("#otp_3").val() == '') && ($("#otp_4").val() == '')) {
    $('.popup-heading').before('<div class="error-otp">Please enter your OTP</div>');
  }
  if (($("#otp_1").val() !== '') && ($("#otp_2").val() !== '') && ($("#otp_3").val() !== '') && ($("#otp_4").val() !== '') && otp.length == 4) {
    $(".maia-loading").addClass("d-flex");
    $('.maia-loading').removeClass("d-none");
    $.ajax({
      url: BASE_API_URL + '/login-with-otp',
      type: 'POST',
      dataType: 'json',
      data: payload,
      success: function (response) {
        $(".maia-loading").removeClass("d-flex");
        $('.maia-loading').addClass("d-none");
        if (response.status == 'success') {
          $(".error-otp").remove();
          location.href = "/tracker/goal";
          // temporarily for the demo, as we have only goals module
          localStorage.removeItem("temp_uuid");
          localStorage.removeItem("temp_email");
        }
      },
      error: function (error) {
        $(".maia-loading").removeClass("d-flex");
        $('.maia-loading').addClass("d-none");
        $(".warning-des").html(error.responseJSON.message);
        console.log(error);
      }
    });
  }
  else {
    // $('.maia-loading').addClass("d-none");
    $(".error-otp").remove();
    $('.popup-heading').before('<div class="error-otp">Please enter your OTP</div>');
  }
}

function isEmailOrMobile(val) {
  var phone_number_reg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
  var email_reg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

  var type = '';
  if (!val) {
    return type;
  }

  if (val.match(phone_number_reg)) {
    type = 'mobile';
  } else if (val.match(email_reg)) {
    type = 'email';
  }

  return type;
}

function doLogin() {
  $('#login-error-msg').text('')
  $('#login-error-msg').addClass('d-none')

  var payload = {
    email: $('#email_phone').val(),
    password: $('#password').val(),
    user_device: $('#user_device_string').val(),
    remember_me: $('#remember_me').is(':checked'),
  }


  var uri = '/send-login-otp';

  if (isEmailOrMobile(payload.email) == 'mobile') {
    delete payload.email;
    payload.phone_number = $('#email_phone').val();
    uri = '/send-login-otp-mobile';
  }
  $(".maia-loading").addClass("d-flex");
  $('.maia-loading').removeClass("d-none");

  $.ajax({
    url: BASE_API_URL + uri,
    type: 'POST',
    dataType: 'json',
    data: payload,
    success: function (response) {
      $(".maia-loading").removeClass("d-flex");
      $('.maia-loading').addClass("d-none");
      if (response.status == 'success'){
        console.log(response);
        if (response.data && response.data.auth_token) {
          location.href = "/tracker/goal"; // temporarily for the demo, as we have only goals module
          localStorage.removeItem("temp_uuid");
          localStorage.removeItem("temp_email");
          return;
        }
        $('#otp_box').removeClass('d-none');
        user_email = response.data.email;
      } else {
        $('#login-error-msg').text('Login failed!')
        $('#login-error-msg').removeClass('d-none')
      }
    },
    error: function (error) {
      $(".maia-loading").removeClass("d-flex");
      $('.maia-loading').addClass("d-none");
      // console.log(error)
      if (error && error.responseJSON) {
        var msg = error.responseJSON.message;
        $('#login-error-msg').text(msg)
        $('#login-error-msg').removeClass('d-none')
      }
    }
  });
}

function setupLogin() {
  // $("#login_form").on('submit', function(e){
  //   e.preventDefault();
  //   // do validation here!!
  //   doLogin();
  //   return;
  // });
  validatelogin();
  $('#login-with-otp-btn').on('click', function () {
    doLoginWithOTP()
  })
}

// https://stackoverflow.com/questions/10539113/focusing-on-next-input-jquery
function setupCodeFocus() {
  $(".secutity-code").keyup(function () {
    if (this.value.length == this.maxLength) {
      $(this).next('.secutity-code').focus();
    }
  });
}

function setupCloseBtn() {
  $('#close-pop-btn').click(function () {
    $('#otp_box').addClass('d-none');
  })
}

$(document).ready(function () {
  // console.log('login ready')
  setupLogin()
  setupCodeFocus()
  setupCloseBtn()

  // Resending the OTP to sign in
  $("#login-email-resend").on("click", function () {
    doLogin();
  });
});
