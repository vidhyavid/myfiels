var BASE_API_URL = "/modules/goal-module";
var step_count = 0;
var steps = [];

/**
 * {
 *  id: 1,
 *  meta_how_often: ''
 * }
 */

function getOriginalStepCount() {
  var count = $("#orig_step_count").val();
  if (count) {
    count = parseInt(count);
  }
  return count;
}

function setCount() {
  step_count = getOriginalStepCount();
  for (var i = 0; i < step_count; i++) {
    var id = i + 1;
    var step_id = parseInt($("#step_id__" + id).val());
    var meta_how_often = $("#step_how_often__" + id).val();
    steps.push({
      id: id,
      step_id: step_id,
      meta_how_often: meta_how_often,
    });
  }
}

function setUpTimeAndDatePickers() {
  var min_date = $("#min-date").val();
  if (min_date) {
    min_date = new Date(min_date);
  } else {
    min_date = new Date();
  }
  $(".datepicker").datepicker({
    minDate: min_date,
    changeMonth: true,
    changeYear: true,
    yearRange: "-100:+0",
    dateFormat: "yy-mm-dd",
  });

  $(".timepicker").timepicki();
}

function setDeleteBtnClick() {
  $(".delete-step").click(function (e) {
    var id = e.target.id;
    if (id) {
      // delete-step__1
      var splits = id.split("__");
      if (splits.length == 2) {
        // 1
        id = splits[1];
      }

      if (id != 1) {
        var index = -1;
        for (var i = 0; i < steps.length; i++) {
          if (steps[i]["id"] == id) {
            index = i;
          }
        }

        if (index != -1) {
          steps.splice(index, 1);
          $("#step_container__" + id).remove();
        }
      }
    }
  });
}

function addNewGoalStep() {
  $(".another-step-a-container").on(
    "click",
    "#add-another-goal-step",
    function (e) {
      var new_count = step_count + 1;

      var html =
        '<div class="top-line" id="step_container__' +
        new_count +
        '">' +
        getNameAndHowOftenHTML(new_count) +
        getOnceADayOptions(new_count) +
        getOtherOptions(new_count) +
        "</div>";

      $("#all-steps-container").append(html);
      setUpTimeAndDatePickers();
      setupHowOftenAndReminderRadios();
      setupAddTimeBoxes();
      step_count = new_count;
      steps.push({
        id: new_count,
        meta_how_often: "",
      });

      return;
    }
  );
}

function buildUpdateGoalPayload() {
  var today = moment().format("YYYY-MM-DD");
  today = today.replace(/-/g, '/'); // safari doesnt do dashes
  var payload = {
    name: $("#goal-name").val(),
    description: $("#goal-description").val(),
    from_date: $("#goal-from-date").val(),
    to_date: $("#goal-to-date").val(),
    steps: [],
  };

  if (payload.from_date) {
    payload.from_date = getYYYMMDD(payload.from_date);
  }

  if (payload.to_date) {
    payload.to_date = getYYYMMDD(payload.to_date);
  }

  for (var i = 0; i < steps.length; i++) {
    var s = steps[i];
    var id = s["id"];
    var obj = {
      name: $("#step_name__" + id).val(),
      meta_how_often: s["meta_how_often"],
      meta_times: [],
      meta_has_reminder: false,
    };

    if (s["step_id"]) {
      obj.id = s["step_id"];
    }

    if (obj.meta_how_often == "once_a_day") {
      var t = $("#once_a_day-time__" + id).val();
      if (t) {
        var dt = new Date(today + " " + t).toISOString();
        obj.meta_times.push(dt);
      }

      var n = "once_a_day-do-remind__" + id;
      var v = $('input[name^="' + n + '"]:checked').val();
      if (v && v == "yes") {
        obj.meta_has_reminder = true;
        // once_a_day__reminder-value__2
        obj.meta_reminder_minutes = $(
          "#once_a_day__reminder-value__" + id
        ).val();
        if (obj.meta_reminder_minutes) {
          obj.meta_reminder_minutes = parseInt(obj.meta_reminder_minutes);
        }
      }
    } else if (obj.meta_how_often == "other") {
      obj.meta_do_this_for_value = $(
        "#other__how_long_value__" + id + "__1"
      ).val();
      obj.meta_do_this_for_type = $(
        "#other__how_long_type__" + id + "__1"
      ).val();

      var n = "other-do-remind__" + id;
      var v = $('input[name^="' + n + '"]:checked').val();
      if (v && v == "yes") {
        obj.meta_has_reminder = true;
        obj.meta_reminder_minutes = $("#other__reminder-value__" + id).val();
        if (obj.meta_reminder_minutes) {
          obj.meta_reminder_minutes = parseInt(obj.meta_reminder_minutes);
        }
      }

      // times
      var tcount = $("#other__time-box-count__" + id).val();
      tcount = parseInt(tcount);
      for (var j = 0; j < tcount; j++) {
        // other__time-box__1__1
        var tid = "other__time__" + id + "__" + (j + 1);
        if ($("#" + tid).length) {
          var xt = $("#" + tid).val();
          if (xt) {
            var dxt = new Date(today + " " + xt).toISOString();
            obj.meta_times.push(dxt);
          }
        }
      }

      // meta days
      obj.meta_days = [];
      var days = ["mon", "tues", "wed", "thur", "fri", "sat", "sun"];
      for (var j = 0; j < days.length; j++) {
        var day = days[j];
        // days-checkbox__mon__1
        if (
          $("#days-checkbox__" + day + "__" + id).length &&
          $("#days-checkbox__" + day + "__" + id).is(":checked")
        ) {
          // console.log(id, day)
          obj.meta_days.push(day);
        }
      }
    }

    payload.steps.push(obj);
  }

  return payload;
}

function updateGoal() {
  clearErrorMsg();
  var payload = buildUpdateGoalPayload();
  // do validation
  if (!payloadOK(payload)) {
    console.log("payload is invalid");
    return;
  }

  console.log("Sending --> ", payload);
  $(".maia-loading").removeClass("d-none");
  $(".maia-loading").addClass("d-flex");
  // do validation
  var goal_id = $("#goal_id").val();
  $.ajax({
    url: BASE_API_URL + "/update-goal/" + goal_id,
    type: "PUT",
    dataType: "json",
    data: payload,
    success: function (response) {
      $(".maia-loading").addClass("d-none");
      $(".maia-loading").removeClass("d-flex");
      if (response.status == "success") {
        $(".success-msg").prop("disabled", true);
        $("#goal-update-success-pop").removeClass("d-none");
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $("#maia-body-inner").addClass("d-none");
      } else {
        $(".maia-loading").addClass("d-none");
        $(".maia-loading").removeClass("d-flex");
        $("#goal-error-message").text(response.message);
        $("#goal-update-error-pop").removeClass("d-none");
      }
    },
    error: function (error) {
      console.log("error ", error);
    },
  });

  return;
}

function makeTimesAndDaysProper() {
  for (var i = 0; i < steps.length; i++) {
    var id = i + 1;
    var step = steps[i];
    if (step["meta_how_often"] == "once_a_day") {
      var orig = $("#once_a_day-time_orig__" + id).val();
      var m = moment(orig).format("hh:mm a");
      $("#once_a_day-time__" + id).val(m);
    } else {
      var times = $("#other__time-box-count__" + id).val();
      times = parseInt(times);

      for (var j = 0; j < times; j++) {
        var jid = j + 1;
        var orig = $("#other__time-orig__" + id + "__" + jid).val();
        // console.log(orig, ' --- else')
        var m = moment(orig).format("hh:mm a");
        $("#other__time__" + id + "__" + jid).val(m);
      }

      // highlight the days
      var days = $("#step_meta_days__" + id).val();
      var dsplits = JSON.parse(days);
      for (var j = 0; j < dsplits.length; j++) {
        var day = dsplits[j];
        // other-options-days__{{ loop.index }}__mon
        var jid = "days-checkbox__" + day + "__" + id;
        $("#" + jid).prop("checked", true);
      }
    }
  }
}

function deleteStep(id, do_delete) {
  if(!do_delete) {
    showDeleteDiagPop(id);
    return;
  }
  closeDeletePop()
  if (id != 1) {
    var index = -1;
    for (var i = 0; i < steps.length; i++) {
      if (steps[i]["id"] == id) {
        index = i;
      }
    }

    if (index != -1) {
      steps.splice(index, 1);
      $("#step_container__" + id).remove();

      // we are not decrementing the count variable
      // edgecase: if there are 3 steps and the user deletes step 2
    }
  }
  return;
}

function closeDeletePop() {
  $('#delete-diag-pop').remove();
}

function showDeleteDiagPop(id) {
  var html =
    '<div id="delete-diag-pop" class="popup">' +
    '<div class="popup-body">' +
    '<div class="goal-pop-up-card">' +
    '<div class="popup-msg">' +
    '<h1 class="pop-heading">ARE YOU SURE?</h1>' +
    '<p class="color-w">Are you sure you want to delete this step?</p>' +
    '<button onclick="deleteStep(' +
    id +
    ', true)" class="btn btn-primary cancel-btn" type="button"><strong>YES, DELETE</strong></button>' +
    '<a roll="button" onclick="closeDeletePop()" class="return-link" href="javascript:void(0)"><strong>NO, RETURN TO GOALS</strong>' +
    "</a>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  $("body").append(html);
}

$(document).ready(function () {
  setUpTimeAndDatePickers();
  setCount();
  setDeleteBtnClick();
  setupHowOftenAndReminderRadios();
  setupAddTimeBoxes();
  addNewGoalStep();
  makeTimesAndDaysProper();
});
