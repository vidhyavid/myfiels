var BASE_API_URL = "/modules/problem-module/";

function addProblem() {
  $(document).on("click", "#save", function () {
    event.preventDefault();
    let payload = {
      name : $.trim($('#problemName').val()),
      description : $.trim($('#problemDescription').val())
    };
    if ($('#problemId').val()) {
      payload.id = ($('#problemId').val())
    }    
    addLoadingToPage();
    $.ajax({
      url: BASE_API_URL + "add-problem",
      type: "POST",
      dataType: "json",
      data: payload,
      success: function (response) {
        $("#maia-body-inner").addClass("d-none");
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $("#prob-add-success-pop").removeClass("d-none");

        },
      error: function (error) {
        $("#prob-error-message").text(error.responseJSON.message);
        $("#maia-body-inner").addClass("d-none");
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $("#prob-add-error-pop").removeClass("d-none");
      },
      complete: function (data) {
        removeLoadingFromPage();
      },
    });
  });
}

function addProblemEntry() {
  $(document).on("click", "#saveEntry", function () {
    event.preventDefault();
    var method="POST";
    var url ="add-problem-entry"
    let payload = {
      date : getYYYMMDD($('#problemDate').val()),
      range : $.trim($('#problemRange').val()),
      notes:  $.trim($('#problemNotes').val()),
    };
    if ($('#problemId').val()) {
      payload.id = $('#problemId').val()
      method="PUT";
      url ="update-problem"
    }
    addLoadingToPage();

    $.ajax({
      url: BASE_API_URL + url,
      type: method,
      dataType: "json",
      data: payload,
      success: function (response) {
        $("#maia-body-inner").addClass("d-none");
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $("#prob-add-success-pop").removeClass("d-none");
      },
      error: function (error) {
        $("#prob-error-message").text(error.responseJSON.message);
        $("#maia-body-inner").addClass("d-none");
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $("#prob-add-error-pop").removeClass("d-none");
      },
      complete: function (data) {
        removeLoadingFromPage();
      },
    });
  });
}

function showDeleteProbPop(id) {
  var html =
    '<div id="delete-prob-pop" class="popup">' +
    '<div class="popup-body">' +
    '<div class="goal-pop-up-card">' +
    '<div class="popup-msg">' +
    '<h1 class="pop-heading">ARE YOU SURE?</h1>' +
    '<p class="color-w">Are you sure you want to delete this problem?</p>' +
    '<button onclick="doDeleteProblem(' +
    id +
    ')" class="btn btn-primary cancel-btn" type="button"><strong>YES, DELETE</strong></button>' +
    '<a roll="button" onclick="closeDeletePop()" class="return-link" href="/tracker/problem/view"><strong>CANCEL</strong></a>'+
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  $("body").append(html);
}
function closeDeletePop() {
  $("#delete-prob-pop").remove();
  return;
}

function doDeleteProblem(id) {
  closeDeletePop();

  $.ajax({
    url: BASE_API_URL + "delete-problem/" + id,
    type: "DELETE",
    dataType: "json",
    data: {},
    success: function (response) {
      $("#prob-del-success-pop").removeClass("d-none");
      $("#maia-body-inner").addClass("d-none");
      $("#pop-up-hd-sub-ft").removeClass("d-none");
      const url = "/tracker/problem/view";
      $(location).attr("href", url);
    },
    error: function (error) {
      $("#prob-error-message").text(error.responseJSON.message);
      $("#maia-body-inner").addClass("d-none");
      $("#pop-up-hd-sub-ft").removeClass("d-none");
      $("#prob-del-error-pop").removeClass("d-none");
    },
    complete: function (data) {
      removeLoadingFromPage();
    },
  });
}

function setupDeleteBtn() {
  $(".deleteProblem").click(function (e) {
    var id = e.target.id;
    showDeleteProbPop(id);
  });
}

$(document).ready(function () {
  addProblem();
  addProblemEntry();
  setupDeleteBtn();
});

$(document).ready(function() {
  let hide_pblm = $('.hid_pb_name').val();
  if(hide_pblm != 'PROBLEM'){
    $(".hidepb_div").addClass("d-none");
   $(".porblem_add").removeClass("d-none");
   $(".porblem_add1").removeClass("d-none");
   $(".problemheading").html('Go to Add Problem Entry');

  }
});

$(document).ready(function() {
  $(".datepicker1").datepicker({
  maxDate: new Date(),
  changeMonth: true,
  changeYear: true,
  yearRange: "-100:+0",
  dateFormat: 'dd/mm/yy',
});
 
});