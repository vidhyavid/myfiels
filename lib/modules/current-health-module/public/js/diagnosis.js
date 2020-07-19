var BASE_API_URL = "/modules/current-health-module/";

// api call
function addDiagnosis() {
  $(document).on("click", "#save", function () {
    event.preventDefault();
    var diagnoses = [];
    $(".diagnosisInput" + $(this).data("type")).each(function (key, elem) {
      var obj = {};
      obj.id = $(this).attr("diagnosisId");
      obj.diagnosis = $.trim($(this).val());
      obj.type = $(this).data("type");
      diagnoses.push(obj);
    });
    let payload = {
      Diagnosis: diagnoses,
    };
    addLoadingToPage();

    $.ajax({
      url: BASE_API_URL + "add-diagnosis",
      type: "POST",
      dataType: "json",
      data: payload,
      success: function (response) {
        $("#maia-body-inner").addClass("d-none");
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $("#diag-add-success-pop").removeClass("d-none");
      },
      error: function (error) {
        console.log("error response", error);
        $("#diag-error-message").text(error.responseJSON.message);
        $("#maia-body-inner").addClass("d-none");
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $("#diag-add-error-pop").removeClass("d-none");
      },
      complete: function (data) {
        removeLoadingFromPage();
      },
    });
  });
}

// DOM dynamic update

function addDiagnosisBlock() {
  var primaryDiagnosisBlock =
    `<div class="tittle-min16-max20"><h1 class="pd-tp-10"><strong>ADD&nbsp;DIAGNOSES</strong><br></h1></div>` +
    `<div class="space-input">` +
    `<div><label class="label-head"><strong>Add a primary diagnoses</strong><br></label></div><input type="text" data-type="primary" class="sm-font-14 diagnosisInputprimary" placeholder="Add a primary diagnosis">` +
    `<div class="flex-end" id="addInput"><button class="btn btn-primary add-btn-org" type="button" >ADD</button></div>` +
    `<div class="flex-end mrg-tp-bt-30"><a href="" <button class="btn btn-primary save-btn mrg-rt-20" type="button" data-type="primary" id="save">SAVE</button><a href="/my-health/current-health"><button class="btn btn-primary cancel-btn" type="button">CANCEL</button></a></div>` +
    `</div>`;

  $("#primaryDiagnosis").click(function () {
    $(this).before(primaryDiagnosisBlock);
    $(this).hide();
    // deleteRows();
  });

  $(document).on("click", "#addInput", function () {
    $(this).before(
      '<div class="diagnosis-wrapper"><a class="delete-link" href="#">Remove</a>' +
        '<input type="text" data-type="primary" class="sm-font-14 diagnosisInputprimary" placeholder="Add a primary diagnosis"></div>'
    );
  });

  $(document).on("click", "#addInputSecondary", function () {
    $(this).before(
      '<div class="diagnosis-wrapper"><a class="delete-link" href="#">Remove</a>' +
        '<input type="text" data-type="secondary" class="sm-font-14 diagnosisInputsecondary" placeholder="Add a seconary diagnosis">'
    );
  });

  var secondaryDiagnosisBlock =
    '<div class="tittle-min16-max20"><h1 class="pd-tp-10"><strong>ADD&nbsp;DIAGNOSES</strong><br></h1></div>' +
    '<div class="space-input">' +
    '<div><label class="label-head"><strong>Add a secondary diagnoses</strong><br></label></div><input type="text" data-type="secondary" class="sm-font-14 diagnosisInputsecondary" placeholder="Add a seconary diagnosis">' +
    '<div class="flex-end" id="addInputSecondary"><button class="btn btn-primary add-btn-org" type="button" >ADD</button></div>' +
    '<div class="flex-end mrg-tp-bt-30"><button class="btn btn-primary save-btn mrg-rt-20" type="button" data-type="secondary" id="save">SAVE</button><a href="/my-health/current-health"><button class="btn btn-primary cancel-btn" type="button">CANCEL</button></a></div>' +
    "</div>";

  $("#secondaryDiagnosis").click(function () {
    $(this).before(secondaryDiagnosisBlock);
    $(this).hide();
  });
}

function showDeleteDiagPop(id) {
  var html =
    '<div id="delete-diag-pop" class="popup">' +
    '<div class="popup-body">' +
    '<div class="goal-pop-up-card">' +
    '<div class="popup-msg">' +
    '<h1 class="pop-heading">ARE YOU SURE?</h1>' +
    '<p class="color-w">Are you sure you want to delete this diagnosis?</p>' +
    '<button onclick="doDeleteDiag(' +
    id +
    ')" class="btn btn-primary cancel-btn" type="button"><strong>YES, DELETE</strong></button>' +
    '<a roll="button" onclick="closeDeletePop()" class="return-link" href="javascript:void(0)"><strong>CANCEL</strong>' +
    "</a>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  $("body").append(html);
}

function closeDeletePop() {
  $("#delete-diag-pop").remove();
  return;
}

function doDeleteDiag(id) {
  closeDeletePop();

  $.ajax({
    url: BASE_API_URL + "delete-diagnosis/" + id,
    type: "DELETE",
    dataType: "json",
    data: {},
    success: function (response) {
      $("#diag-del-success-pop").removeClass("d-none");
      $("#maia-body-inner").addClass("d-none");
      $("#pop-up-hd-sub-ft").removeClass("d-none");
    },
    error: function (error) {
      console.log("error ", error);
      $("#diag-error-message").text(error.responseJSON.message);
      $("#maia-body-inner").addClass("d-none");
      $("#pop-up-hd-sub-ft").removeClass("d-none");
      $("#diag-del-error-pop").removeClass("d-none");
    },
    complete: function (data) {
      removeLoadingFromPage();
    },
  });
}

function setupDeleteBtn() {
  $(".deleteDiagnosis").click(function (e) {
    var id = e.target.id;
    showDeleteDiagPop(id);
  });
}

function setupEditSaveBtn() {
  $("#edit-diag-save-btn").click(function () {
    var diagnoses = [];
    $(".diagnosisInput").each(function (key, elem) {
      var obj = {};
      obj.id = $(this).attr("diagnosisId");
      obj.diagnosis = $.trim($(this).val());
      obj.type = $(this).data("type");
      diagnoses.push(obj);
    });
    let payload = {
      Diagnosis: diagnoses,
    };
    addLoadingToPage();

    $.ajax({
      url: BASE_API_URL + "update-diagnosis",
      type: "PUT",
      dataType: "json",
      data: payload,
      success: function (response) {
        $("#maia-body-inner").addClass("d-none");
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $("#diag-update-success-pop").removeClass("d-none");
      },
      error: function (error) {
        console.log("error ", error);
        $("#diag-error-message").text(error.responseJSON.message);
        $("#maia-body-inner").addClass("d-none");
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $("#diag-update-error-pop").removeClass("d-none");
      },
      complete: function (data) {
        removeLoadingFromPage();
      },
    });
  });
}

function viewMore() {
  $("#viewMore").click(function () {
    let primaryDiagnoses = JSON.parse($("#primaryDiagnosesJson").text());
    let secondaryDiagnoses = JSON.parse($("#secondaryDiagnosesJson").text());
    let pdLength = $(".addedPrimaryDiagnoses").length;
    let sdLength = $(".addedSecondaryDiagnoses").length;

    let pdata = primaryDiagnoses.slice(pdLength, pdLength + 5);
    let sdata = secondaryDiagnoses.slice(sdLength, sdLength + 5);

    var pdhtml = "";
    for (var i = 0; i < pdata.length; i++) {
      pdhtml +=
        '<label class="profile-card-tittle addedPrimaryDiagnoses" >' +
        pdata[i].diagnosis +
        "</label>";
    }
    if (pdLength < primaryDiagnoses.length) {
      $("#pBlock").append(pdhtml);
    }
    var sdhtml = "";
    for (var i = 0; i < sdata.length; i++) {
      sdhtml +=
        '<label class="profile-card-tittle addedSecondaryDiagnoses" >' +
        sdata[i].diagnosis +
        "</label>";
    }
    if (sdLength < secondaryDiagnoses.length) {
      $("#sBlock").append(sdhtml);
    }
  });
}
function saveBlockOnEdit() {}
$(document).ready(function () {
  addDiagnosisBlock();
  addDiagnosis();
  setupDeleteBtn();
  setupEditSaveBtn();
  viewMore();
  $(document).on("click", ".delete-link", function (e) {
    e.preventDefault();
    $(this).parent(".diagnosis-wrapper").remove();
  });
});
