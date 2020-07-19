
var BASE_API_URL = "/modules/goal-module";
var step_count = 1;
var steps = [
  {
    id: 1,
    meta_how_often: "",
  },
];

function setupDateAndTimepickers() {
  $(".datepicker").datepicker({
    minDate: new Date(),
    changeMonth: true,
    changeYear: true,
    yearRange: "-100:+0",
    dateFormat: "dd/mm/yy",
  });

  $(".timepicker").timepicki();
}

function addNewGoalStep() {
  // for some reason, the a tag only works once,
  // this is the work around
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
      setupDateAndTimepickers();
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

function deleteStep(id) {
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

function buildAddGoalPayload() {
  /**
   {
    "name": "Be a kungfu master",
    "description": "Another part of my weight loss regieme",
    "from_date": "2020-05-07",
    "to_date": "2020-06-07",
    "steps": [
      {
        "name": "Watch bruce lee movies",
        "meta_how_often": "other",
        "meta_times": ["2020-05-07T17:30:38.137", "2020-05-07T20:30:38.137"],
        "meta_has_reminder": true,
        "meta_reminder_minutes": 15,
        "meta_do_this_for_type": "weeks",
        "meta_do_this_for_value": 2,
        "meta_days": [
          "wed", "thur", "fri"
        ]
      },
      {
        "name": "Pracrise kung fu",
        "meta_how_often": "once_a_day",
        "meta_times": ["2020-05-07T18:30:38.137"],
        "meta_has_reminder": false
      }
    ]
  }
  **/

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

function addNewGoal() {
  clearErrorMsg();
  var payload = buildAddGoalPayload();
 
  // do validation
  if (!payloadOK(payload)) {
    console.log("payload is invalid");
    return;
  }
  console.log("Sending --> ", payload);

  $(".maia-loading").removeClass("d-none");
  $(".maia-loading").addClass("d-flex");
  $.ajax({
    url: BASE_API_URL + "/add-goal",
    type: "POST",
    dataType: "json",
    data: payload,
    success: function (response) {
      $(".maia-loading").addClass("d-none");
      $(".maia-loading").removeClass("d-flex");
      if (response.status == "success") {
        $("#goal-add-success-pop").removeClass("d-none");
        $("#pop-up-hd-sub-ft").removeClass("d-none");
        $("#maia-body-inner").addClass("d-none");
        $(".success-msg").prop("disabled", true);       
      } else {
        $(".maia-loading").addClass("d-none");
        $(".maia-loading").removeClass("d-flex");
        $("#goal-error-message").text(response.message);
        $("#goal-add-error-pop").removeClass("d-none");
      }
    },
    error: function (error) {
      console.log("error ", error);
    },
  });
  return;
}
 $(document).ready(function () {
  console.log("add loaded");
  setupDateAndTimepickers();
  setupHowOftenAndReminderRadios();
  setupAddTimeBoxes();
  addNewGoalStep();
});
