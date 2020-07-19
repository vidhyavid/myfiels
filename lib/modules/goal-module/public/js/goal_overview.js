var BASE_API_URL = "/modules/goal-module";
var selected_date = '';

function getStepsHTML(type, steps) {
  var html = '';
  var disabled = 'disabled';
  var checked = 'checked';

  if (type == 'active') {
    disabled = '';
    checked = '';
  }

  for (var i=0; i<steps.length; i++) {
    var step = steps[i];
    html += '<div class="flex-sb-c mrg-tp-bt-10">'+
            '<div class="maia-checkbox-group">'+
              '<input type="checkbox" class="step-completed-cbox" id="step-check__'+step['entry_id']+'" '+disabled+' '+checked+'>'+
              '<label for="step-check__'+step['entry_id']+'">'+step['step_name']+'</label>'+
            '</div>'+
            '<label class="time-label">'+moment(step['date_time']).format('hh:mm A')+'</label>'+
          '</div>';
  }

  return html;
}

function deleteListing() {
  $('#accordion').empty();
  $('#accordion').addClass('d-none');
}

function emptyListing() {
  var html = '<h1 class="panel-title">No entries found for this date!</h1>'
  $('#accordion').html(html);
  $('#accordion').removeClass('d-none');
  return;
}

function makeListingHTML(data) {
  var html = '';

  for (var i=0; i<data.length; i++) {
    var goal = data[i];

    var active = [];
    var completed = [];
    for (var j=0; j<goal.steps.length; j++) {
      var step = goal['steps'][j];
      if (step.status == 'active') {
        active.push(step)
      } else {
        completed.push(step)
      }
    }

    var goal_html = '<div class="panel panel-default">';

    goal_html +=  '<div id="heading-goal-'+goal['goal_id']+'" class="panel-heading" role="tab">'+
                    '<h1 class="panel-title"><a href="#collapse-goal-'+goal['goal_id']+'" role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="false" aria-controls="collapse-goal-'+goal['goal_id']+'">'+goal['goal_name']+'<br></a></h1>'+
                    '<div class="edit-goal-link"><a href="'+location.pathname+'/'+goal['goal_id']+'">Edit goal</a></div>'+
                  '</div>';

    goal_html +=  '<div id="collapse-goal-'+goal['goal_id']+'" class="panel-collapse collapse show" role="tabpanel" aria-labelledby="heading-goal-'+goal['goal_id']+'" aria-expanded="true">'+
                    '<div class="maia-panel-body">'+
                      '<div class="space-input">'+
                      '<label class="panel-label-head"><strong>Incomplete steps</strong></label>'+
                      getStepsHTML('active', active)+
                      '<label class="panel-label-head"><strong>Completed steps</strong></label>'+
                      getStepsHTML('completed', completed)+
                      '</div>'+
                    '</div>'+
                  '</div>';

    goal_html += '</div>'; // panel

    html += goal_html
  }


  $('#accordion').append(html);
  $('#accordion').removeClass('d-none');
  return;
}


function getGoalStepsForDate(date) {
  $('.maia-loading').removeClass("d-none");
  $(".maia-loading").addClass("d-flex");
  console.log('getting steps for ', date)
  deleteListing();
  $.ajax({
    url: BASE_API_URL + '/search-goal-by-date?date='+date,
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function(response) {
      $('.maia-loading').addClass("d-none");
      console.log('success ', response)
      if (response.status == 'success' && response.data.length) {
        makeListingHTML(response.data)
        setCheckboxChange()
      } else {
        console.log('make empty goal html')
      }
    },
    error: function(error) {
      console.log('error ', error);
    }
  });
}

function setCheckboxChange() {
  $('.step-completed-cbox').unbind().change(function(e) {
    var id = e.target.id;
    var splits = id.split('__')
    id = splits[1];
    $('.maia-loading').removeClass("d-none");
    $.ajax({
      url: BASE_API_URL + '/complete-goal-task/' + id,
      type: 'PUT',
      dataType: 'json',
      data: {  },
      success: function(response) {
        $('.maia-loading').addClass("d-none");
        console.log('success ', response)
        calendarOnSelect([{'_i': selected_date}])
      },
      error: function(error) {
        console.log('error ', error);
      }
    });
  })
}

function calendarOnInit(context) {
  // console.log('calendar init ')
  // by default the current date is loaded!
  var date = moment().format('YYYY-MM-DD');
  selected_date = date;
  getGoalStepsForDate(date);
  return;
}

function calendarOnSelect(date, context) {
  // console.log('selected ', date, context)
  if (date.length && date[0]) {
    getGoalStepsForDate(date[0]['_i']);
    selected_date = date[0]['_i'];
  }
}

function setUpCalendar() {
  // console.log('called calendar setup')
  $('.calendar').pignoseCalendar({
    initialise: false,
    select: calendarOnSelect,
    init: calendarOnInit
  });
}

function getToday() {
  var date = moment().format('YYYY-MM-DD');
  $('.calendar').pignoseCalendar('set', date);
  calendarOnInit()
}

$(document).ready(function() {
  console.log('overview loaded!')
  setUpCalendar()
})
