// has functions common for add and edit

// -- html generators
// functions for building new step form
// these are split because debugging a function that
// returns html is a nightmare!
function getNameAndHowOftenHTML(id) {
  var html = '<div class="space-input">'+
                '<label class="label-head"><strong>What steps will I take to complete my goal?</strong></label>'+
                '<div class="flex-end"><a class="delete-link" href="javascript:void(0);" onclick="deleteStep('+id+')">Delete</a></div>'+
                '<div class="flex-sb-c">'+
                  '<div class="step-count-box mb-2">'+id+'</div>'+
                  '<input type="text" class="sm-font-14" placeholder="Go for a 5k run" id="step_name__'+id+'">'+
                  // '<a class="bin-icon" href="javascript:void(0);" onclick="deleteStep('+id+')"><i class="fas fa-trash-alt"></i></a>'+
                '</div>'+
              '</div>';


  html += '<div class="space-input">'+
            '<label class="label-head"><strong>How often will I take this step?</strong><br></label>'+
            '<div class="flex-div">'+
                '<div class="maia-day-group sm-select mrg-rt-15">'+
                    '<input type="radio" class="how_often_radios" id="once_a_day__'+id+'" name="how_often__'+id+'" value="once_a_day" />'+
                    '<label class="sm-font-14" for="once_a_day__'+id+'">ONCE A DAY<br /></label>'+
                '</div>'+
                '<div class="maia-day-group sm-select ">'+
                    '<input type="radio" class="how_often_radios" id="other__'+id+'" name="how_often__'+id+'" value="other" />'+
                    '<label class="sm-font-14" for="other__'+id+'">OTHER<br /></label>'+
                '</div>'+
            '</div>'+
          '</div>';

  return html;
}

function getOnceADayOptions(id) {
  var html =  '<div id="once_a_day-options-container__'+id+'" class="d-none">'+

                '<div class="space-input">'+
                  '<label class="label-head"><strong>What time will I take this step?</strong></label>'+
                  '<label class="calenderdiv time">'+
                      '<input type="text" class="sm-font-14 timepicker" placeholder="Select a time" id="once_a_day-time__'+id+'">'+
                        '<span class="material-icons time-calender">query_builder</span>'+
                  '</label>'+
                '</div>';

  html += '<div class="space-input"><label class="label-head"><strong>Do I want to be reminded?</strong><br></label>'+
            '<div class="flex-div">'+
                '<div class="maia-day-group sm-select mrg-rt-20">'+
                    '<input type="radio" id="once_a_day__do-remind__yes__'+id+'" class="do_remind_radios" name="once_a_day-do-remind__'+id+'" value="yes" />'+
                    '<label class="sm-font-14" for="once_a_day__do-remind__yes__'+id+'">YES<br /></label>'+
                '</div>'+
                '<div class="maia-day-group sm-select">'+
                    '<input type="radio" id="once_a_day__do-remind__no__'+id+'" name="once_a_day-do-remind__'+id+'" class="do_remind_radios" value="no" />'+
                    '<label class="sm-font-14" for="once_a_day__do-remind__no__'+id+'">NO<br /></label>'+
                '</div>'+
            '</div>'+
          '</div>';

  html += '<div class="space-input d-none" id="once_a_day__reminder-container__'+id+'">'+
            '<label class="label-head"><strong>Set reminder</strong><br></label>'+
            '<div class="flex-div">'+
                '<div class="maia-select">'+
                    '<select required id="once_a_day__reminder-value__'+id+'">'+
                        '<option value="15" selected>15 minutes before goal starts</option>'+
                        '<option value="30">30 minutes before goal starts</option>'+
                        '<option value="45">45 minutes before goal starts</option>'+
                        '<option value="60">1 hour before goal starts</option>'+
                        '<option value="75">1 hour 15 minutes before goal starts</option>'+
                        '<option value="90">1 hour 30 minutes before goal starts</option>'+
                        '<option value="120">2 hours before goal starts</option>'+
                        '<option value="150">2 hours 30 minutes before goal starts</option>'+
                    '</select>'+
                '</div>'+
            '</div>'+
          '</div>';

  html += '</div>';

  return html;
}

function getOtherOptions(id) {
  var html = '<div id="other-options-container__'+id+'" class="d-none">';

  var days = [
    {name: 'MONDAY', val: 'mon'},
    {name: 'TUESDAY', val: 'tues'},
    {name: 'WEDNESDAY', val: 'wed'},
    {name: 'THURSDAY', val: 'thur'},
    {name: 'FRIDAY', val: 'fri'},
    {name: 'SATURDAY', val: 'sat'},
    {name: 'SUNDAY', val: 'sun'},
  ];

  html += '<div class="space-input">'+
            '<label class="label-head"><strong>Which days will I take this step?</strong><br></label>'+
            '<div class="row">';

  for (var i=0; i<days.length; i++) {
    var day_html = '<div class="col-5 col-sm-4 col-md-3 col-lg-3 mrg-bt-15">'+
                      '<div class="maia-day-group">'+
                          '<input type="checkbox" id="days-checkbox__'+days[i]['val']+'__'+id+'" value="'+days[i]['val']+'">'+
                          '<label class="sm-font-14" for="days-checkbox__'+days[i]['val']+'__'+id+'">'+
                              '<strong>'+days[i]['name']+'</strong><br>'+
                         ' </label>'+
                      '</div>'+
                  '</div>';
    html += day_html;
  }
  html += '</div>'; // row
  html += '<div></div>';
  html += '</div>'; // space input

  html += '<div class="space-input" id="other__time-container__'+id+'">'+
            '<label class="label-head"><strong>What time will I take this step?</strong></label>'+
            '<input type="number" class="d-none" value="1" id="other__time-box-count__'+id+'">'+
            '<label class="calenderdiv time">'+
            '<div id="other__time-box__'+id+'__1">'+
              '<input type="text" class="sm-font-14 timepicker" placeholder="Select a time" id="other__time__'+id+'__1">'+
              '<span class="material-icons time-calender">query_builder</span>'+
            '</div>'+
            '</label>'+
          '</div>'+
          '<div class="add-another-div"><a class="add-another-time" id="add_time__'+id+'" href="javascript:void(0);">Add another time</a></div>';

  html += '<div class="space-input">'+
            '<label class="label-head"><strong>How long will I do this for?</strong><br></label>'+
            '<div class="flex-div">'+
                '<div class="space-input w--inherit mrg-rt-20">'+
                  '<input type="number" class="sm-font-14" placeholder="3" id="other__how_long_value__'+id+'__1">'+
                '</div>'+
                '<div class="maia-select">'+
                    '<select id="other__how_long_type__'+id+'__1">'+
                        '<option value="days" selected>Days</option>'+
                        '<option value="weeks">Weeks</option>'+
                        '<option value="months">Months</option>'+
                    '</select>'+
                '</div>'+
            '</div>'+
          '</div>';

  html += '<div class="space-input"><label class="label-head"><strong>Do I want to be reminded?</strong><br></label>'+
            '<div class="flex-div">'+
                '<div class="maia-day-group sm-select mrg-rt-20">'+
                    '<input type="radio" id="other__do-remind__yes__'+id+'" class="do_remind_radios" name="other-do-remind__'+id+'" value="yes" />'+
                    '<label class="sm-font-14" for="other__do-remind__yes__'+id+'">YES<br /></label>'+
                '</div>'+
                '<div class="maia-day-group sm-select">'+
                    '<input type="radio" id="other__do-remind__no__'+id+'" name="other-do-remind__'+id+'" class="do_remind_radios" value="no" />'+
                    '<label class="sm-font-14" for="other__do-remind__no__'+id+'">NO<br /></label>'+
                '</div>'+
            '</div>'+
          '</div>';

  html += '<div class="space-input d-none" id="other__reminder-container__'+id+'">'+
            '<label class="label-head"><strong>Set reminder</strong><br></label>'+
            '<div class="flex-div">'+
                '<div class="maia-select mrg-rt-20">'+
                    '<select required id="other__reminder-value__'+id+'">'+
                        '<option value="15" selected>15 minutes before goal starts</option>'+
                        '<option value="30">30 minutes before goal starts</option>'+
                        '<option value="45">45 minutes before goal starts</option>'+
                        '<option value="60">1 hour before goal starts</option>'+
                        '<option value="75">1 hour 15 minutes before goal starts</option>'+
                        '<option value="90">1 hour 30 minutes before goal starts</option>'+
                        '<option value="120">2 hours before goal starts</option>'+
                        '<option value="150">2 hours 30 minutes before goal starts</option>'+
                    '</select>'+
                '</div>'+
            '</div>'+
          '</div>';

  html += '</div>' // other container

  return html;
}
// -- end of html generators

function setupHowOftenAndReminderRadios() {
  $('.how_often_radios').unbind().change(function(e) {
    var id = e.target.id;
    var splits = id.split('__');
    var option = splits[0];
    var step_id = splits[1];

    // once_a_day-options-container__1
    $('#'+option+'-options-container__'+step_id).removeClass('d-none');

    var other_option = 'once_a_day';
    if (option == 'once_a_day') {
      other_option = 'other';
    }
    $('#'+other_option+'-options-container__'+step_id).addClass('d-none');

    // update our global var
    var index = -1;
    for (var i=0; i<steps.length; i++) {
      if (steps[i]['id'] == step_id) {
        index = i;
      }
    }
    if (index != -1) {
      steps[index]['meta_how_often'] = option;
    }

    return;
  });

  $('.do_remind_radios').unbind().change(function(e) {
    var id = e.target.id;
    // once_a_day__do-remind__yes__1
    var splits = id.split('__');
    var option = splits[0];
    var yn = splits[2];
    var step_id = splits[3];

    if (yn == 'yes') {
      // once_a_day__reminder-container__1
      $('#'+option+'__reminder-container__'+step_id).removeClass('d-none');
    } else {
      $('#'+option+'__reminder-container__'+step_id).addClass('d-none');
    }
    return;
  })
}

function setupAddTimeBoxes() {
  $('.add-another-time').unbind().click(function(e) {
    var id = e.target.id;
    // add_time__1
    var splits = id.split('__');
    var step_id = splits[1];

    // other__time-box-count__1
    var current_timebox_count = $('#other__time-box-count__'+step_id).val();
    current_timebox_count = parseInt(current_timebox_count);
    var next_count = current_timebox_count + 1;

    var html =  '<span class="calenderdiv goal-add-icon" id="other__time-box__'+step_id+'__'+next_count+'"><div class="goal-add-another">'+
                  '<input type="text" class="sm-font-14 timepicker" placeholder="Select a time" id="other__time__'+step_id+'__'+next_count+'"><span class="material-icons time-calender">query_builder</span>'+

                '</div><a class="bin-icon" href="javascript:void(0);"><i class="fas fa-trash-alt" onclick="deleteTimeBox(\''+step_id+'__'+next_count+'\')"></i></a></span>';
                // <button class="delete-btn-icon" onclick="deleteTimeBox(\''+step_id+'__'+next_count+'\')">Delete</button></label>';

                // '<div class="flex-sb-c">'+
                //                 '<input type="text" class="sm-font-14" placeholder="Go for a 5k run" id="step_name__1">'+
                //                 '<a class="bin-icon" href="javascript:void(0);"><i class="fas fa-trash-alt"></i></a>'+
                //             '</div>';
    // other__time-container__1
    $('#other__time-container__'+step_id).append(html);
    $('#other__time-box-count__'+step_id).val(next_count);
    $('.timepicker').unbind().timepicki();
    return;
  })
}

function getYYYMMDD(d) {
  var splits = d.split('/');
  return splits[2]+'-'+splits[1]+'-'+splits[0];
}
function getDateArray(start, end) {
  var
    arr = new Array(),
    dt = new Date(start);
  while (dt <= end) {
   let datem = moment(new Date(dt)).format('dddd');
    let daychange = (datem == "Monday") ? "mon" : (datem == "Tuesday") ? "tues" : (datem == "Wednesday") ? "wed" : (datem == "Thursday") ? "thur" : (datem == "Friday") ? "fri" : (datem == "Saturday") ? "sat" : "sun";
    arr.push(daychange);
    dt.setDate(dt.getDate() + 1);
  }

  return arr;

}
function deleteTimeBox(id) {
  $('#other__time-box__'+id).remove();
}

function clearErrorMsg() {
  $('#error-msgs').html('')
  $('#error-msgs').addClass('d-none')
}

function setAndShowErrorMsg(msg) {
  $('#error-msgs').html(msg)
  $('#error-msgs').removeClass('d-none')
  scrollTop();
}

function scrollTop() {
  $(window).scrollTop($(".error_show").offset().top);
}

function payloadOK(payload) {
  if (!payload.name) {
    setAndShowErrorMsg('Goal name cannot be empty');
    return false;
  }
  if (!payload.description) {
    setAndShowErrorMsg('Goal description cannot be empty');
    return false;
  }

  if (!payload.from_date) {
    setAndShowErrorMsg('Goal from date cannot be empty');
    return false;
  }

  if (!payload.to_date) {
    setAndShowErrorMsg('Goal to date cannot be empty');
    return false;
  }

  if ( moment(payload.from_date).isSameOrAfter( moment(payload.to_date) ) ) {
    setAndShowErrorMsg('Goal to date needs to be after from date');
    return false;
  }

  if (!payload.steps.length) {
    setAndShowErrorMsg('Please add some steps to your goal');
    return false;
  }

  for (var i=0; i<payload.steps.length; i++) {
    var step = payload.steps[i];
    if (!step.name) {
      setAndShowErrorMsg('Please add a title to step '+ (i+1));
      return false;
    }
    if (!step.meta_how_often) {
      setAndShowErrorMsg('Please choose how often you want to do step '+ (i+1));
      return false;
    }

    if (!step.meta_times.length) {
      setAndShowErrorMsg('Please choose a time to do step '+ (i+1));
      return false;
    }
    // yes!! this is a weird condition
    // if (step.meta_has_reminder != true || step.meta_has_reminder != false) {
    //   console.log(step.meta_has_reminder)
    //   setAndShowErrorMsg('Please choose yes or no for reminder to step '+ (i+1));
    //   return false;
    // }

    if (step.meta_has_reminder) {
      if ([15, 30, 45, 60, 75, 90, 120, 150].indexOf(step.meta_reminder_minutes) == -1) {
        setAndShowErrorMsg('Please choose when you like to be reminded in step '+ (i+1));
        return false;
      }
    }

    if (step.meta_how_often == 'other') {

      let dateArr = getDateArray(moment(getYYYMMDD(payload.from_date)), moment(getYYYMMDD(payload.to_date)));
      let differenceday = $(payload.steps[i].meta_days).not(dateArr).get();
      if (!step.meta_days.length) {
        setAndShowErrorMsg('Please choose the days to do step '+ (i+1));
        return false;
      }
      if(differenceday.length > 0){        
        setAndShowErrorMsg('You must be choosen wrong days between start & end date in step '+ (i+1));
        return false;
      }
      if (!step.meta_do_this_for_type || !step.meta_do_this_for_value) {
        setAndShowErrorMsg('Please choose how long you want to do step '+ (i+1) + ' for' );
        return false;
      }

      if (step.meta_do_this_for_type == 'days') {
        var day_count = step.meta_days.length;
        var goal_day_count = moment(payload.to_date).diff(moment(payload.from_date), 'days')

        if (parseInt(step.meta_do_this_for_value) > goal_day_count) {

          setAndShowErrorMsg('You can only enter '+goal_day_count+' days for step '+ (i+1));
          return false;
        }

        if (day_count > goal_day_count) {
          setAndShowErrorMsg('You can only choose '+goal_day_count+' days for step '+ (i+1));
          return false;
        }

        if (goal_day_count <= 7) {
          if (parseInt(step.meta_do_this_for_value) != day_count) {
            setAndShowErrorMsg('Please choose the '+goal_day_count+' days for step '+ (i+1));
            return false;
          }
        }
      }

    }
  }

  return true;
}
