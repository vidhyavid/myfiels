var ctx = document.getElementById("MoodChart").getContext('2d');
var BASE_API_URL = "/modules/mood-module/";
var startDate = new moment().subtract(6, 'days').format('YYYY-MM-DD');
var daysArray = [];

var moodChart = new Chart(ctx, {
    type: 'line',
    data: {
      // labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [{
        label: 'mood',
        borderColor: '#61BCA4',
        backgroundColor: '#61BCA4', // Add custom color background (Points and Fill)
        data: [0, 0, 0, 0, 0, 0, 0],
        fill: false
        }]
    },
    options: {
      responsive: true,
      tooltips: {
        enabled: false
      },
      legend: {
        // display: true,
        display: false,
      },
      scales: {
        yAxes: [{
              gridLines: {
                color: ['rgba(78, 77, 77, 0.5)','rgba(78, 77, 77, 1)','rgba(78, 77, 77, 1)','rgba(78, 77, 77, 1)','rgba(78, 77, 77, 1)'],
            },
          scaleLabel: {
            display: true,
            // labelString: '<rating level>',
            fontStyle: "bold",
            padding: 0

          },
          ticks: {
            min: 0,
            max: 4,
            stepSize: 1,
            fontFamily: 'Material Icons',
            fontSize: 24,
            fontColor:  '#FFBF00',
            padding: 5,
            callback: function (label, index, labels) {
              switch (label) {
                case 0:
                  return '\ue7f3';
                case 1:
                  return '\ue814';
                case 2:
                  return '\ue811';
                case 3:
                  return '\ue813';
                case 4:
                  return '\ue815';
              }
            }
          },

        }],
        xAxes: [{
          ticks: {
            suggestedMin: 0,
            suggestedMax: 7,
            maxTicksLimit: 7,
            fontSize:12,
            fontColor:  '#61BCA4',
            padding: 5
          },
          gridLines: {
          // display: false ,
          color: ['#FFFFFF','#4E4D4D','#4E4D4D','#4E4D4D','#4E4D4D','#4E4D4D','#4E4D4D'],
        }

        }],
      }
    }
  });

  function addData(label, mood) {
    moodChart.data.labels = label;
    moodChart.data.datasets[0].data = mood;
    moodChart.update();
  }

  function prevBtnp() {
    startDate = new moment(startDate, 'YYYY-MM-DD').subtract(7, 'days').format('YYYY-MM-DD');
    moodGraph();
  };

  function nextBtnp() {
    startDate = new moment(startDate, 'YYYY-MM-DD').add(7, 'days').format('YYYY-MM-DD');
    moodGraph();
  };

  function getRangeOfDates(start, end, key) {
    var next = moment(start).add(1, key).startOf(key);
    daysArray.push(start.startOf(key).format('dddd Do'));
    if (start.startOf('day').format('YYYY-MM-DD') === end.startOf('day').format('YYYY-MM-DD')) {
      return daysArray;
    }
    return getRangeOfDates(next, end, key);
  }

  function moodGraph() {
    daysArray = [];
    let labelValue = moment(startDate, 'YYYY-MM-DD').format('Do') + " - " + moment(startDate, 'YYYY-MM-DD').add(6, 'days').format('Do MMMM YYYY');

    $("#chartlable").text(labelValue);








    var dateRange = getRangeOfDates(new moment(startDate, 'YYYY-MM-DD'), new moment(startDate, 'YYYY-MM-DD').add(6, 'days'), 'days');
    var graphData = {
      'date': dateRange
    };
    graphData.mood = ['4', '4', '4', '4', '4', '4', '4'];
    $.ajax({
      url: BASE_API_URL + "get-mood?startDate="+startDate ,
      type: "GET",
      success: function (response) {
        if (response.data && response.data.length > 0) {
          var moodEntry = response.data;
          var html = "";
          var moods = "";
             for (var i = 0; i < moodEntry.length; i++) {
               moods = (moodEntry[i].moods == "very_happy") ? '<img class="mood-feeling-img" src="/modules/my-apostrophe-assets/img/mood/sentiment_very_satisfied-active.svg">' : (moodEntry[i].moods == "happy") ? '<img class="mood-feeling-img" src="/modules/my-apostrophe-assets/img/mood/sentiment_satisfied-active.svg">' : (moodEntry[i].moods == "neutral") ? '<img class="mood-feeling-img" src="/modules/my-apostrophe-assets/img/mood/sentiment_dissatisfied-active.svg"">' : (moodEntry[i].moods == "sad") ? '<img class="mood-feeling-img" src="/modules/my-apostrophe-assets/img/mood/sentiment_very_dissatisfied-active.svg">' : (moodEntry[i].moods == "very_sad") ? '<img class="mood-feeling-img" src="/modules/my-apostrophe-assets/img/mood/mood_bad-active.svg">': 0;

               html +=
               '<div class="panel panel-default">'+
               '<div id="heading-1" class="panel-heading" role="tab">'+
               '<h1 class="panel-title"><a href="#collapse-'+ i +'"'+' role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" aria-controls="collapse-'+ i +'"'+'><strong>'+moment(moodEntry[i].date).format('dddd Do MMMM')+'</strong></a></h1>'+
               '<div class="edit-goal-link"><a href="/tracker/mood/edit/'+moodEntry[i].id+'"'+'><strong>Edit</strong></a></div>'+
               '</div>'+
               '<div id="collapse-'+ i +'"'+'class="panel-collapse" role="tabpanel" aria-labelledby="heading-1" aria-expanded="true">'+
               '<div class="maia-panel-body">'+
               '<div>'+
               '<h5 class="card-heading"><strong>How were you feeling?</strong><br></h5>'+
               '<div class="flex-div-col"><label class="profile-card-tittle">'+moods+'</label></div>'+
               '</div>'+
               '<div>'+
               '<h5 class="card-heading"><strong>Notes</strong><br></h5>'+
               '<div class="flex-div-col"><label class="profile-card-tittle">'+moodEntry[i].notes+'</label></div>'+
               '</div>'+
               '</div>'+
               '</div>'+
               '</div';

               var ind = graphData.date.indexOf(new moment(moodEntry[i].date).format('dddd Do'));
               if (ind > -1) {
                graphData.mood[ind] = (moodEntry[i].moods == "very_happy") ? 4 : (moodEntry[i].moods == "happy") ? 3 : (moodEntry[i].moods == "neutral") ? 2 : (moodEntry[i].moods == "sad") ? 1 : (moodEntry[i].moods == "very_sad") ? 0 : 0;
               // graphData.mood[ind] = moodEntry[i].moods;
                 console.log("==== inside ===", graphData.mood[ind]);
               }
             }
           }else{
             $('#noContent').show();
           }
           $('#accordion').empty();
           $('#accordion').append(html);
           addData(graphData.date, graphData.mood);

      },
      error: function (error) {
      }

    });
  }



  $(document).ready(function () {
    moodGraph();
  });
