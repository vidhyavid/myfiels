var ctx = document.getElementById("myChart").getContext('2d');
var BASE_API_URL = "/modules/problem-module/";
var startDate = new moment().subtract(6, 'days').format('YYYY-MM-DD');
var daysArray = [];

var problemChart = new Chart(ctx, {
    type: 'line',
    data: {
      // labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [{
        label: 'problem',
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
            max: 5,
            stepSize: 1,
            fontSize: 12,
            fontColor:  '#61BCA4',
            padding: 10,


            callback: function (label, index, labels) {
              switch (label) {
                case 0:
                  return 'Not tracked';
                case 1:
                  return 'Poor';
                case 2:
                  return 'Fair';
                case 3:
                  return 'Good';
                case 4:
                  return 'Very good';
                case 5:
                  return 'Excellent';
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

  function addData(label, problem) {
    problemChart.data.labels = label;
    problemChart.data.datasets[0].data = problem;
    problemChart.update();
  }

  function prevBtnp() {
    startDate = new moment(startDate, 'YYYY-MM-DD').subtract(7, 'days').format('YYYY-MM-DD');
    problemGraph();
  };

  function nextBtnp() {
    startDate = new moment(startDate, 'YYYY-MM-DD').add(7, 'days').format('YYYY-MM-DD');
    problemGraph();
  };

  function getRangeOfDates(start, end, key) {
    var next = moment(start).add(1, key).startOf(key);
    daysArray.push(start.startOf(key).format('dddd Do'));
    if (start.startOf('day').format('YYYY-MM-DD') === end.startOf('day').format('YYYY-MM-DD')) {
      return daysArray;
    }
    return getRangeOfDates(next, end, key);
  }

  function problemGraph() {
    daysArray = [];
    let labelValue = moment(startDate, 'YYYY-MM-DD').format('Do') + " - " + moment(startDate, 'YYYY-MM-DD').add(6, 'days').format('Do MMMM YYYY');

    $("#chartlable").text(labelValue);
    var dateRange = getRangeOfDates(new moment(startDate, 'YYYY-MM-DD'), new moment(startDate, 'YYYY-MM-DD').add(6, 'days'), 'days');
    var graphData = {
      'date': dateRange
    };
    graphData.problem = ['0', '0', '0', '0', '0', '0', '0'];
    $.ajax({
      url: BASE_API_URL + "get-problem?startDate="+startDate ,
      type: "GET",
      success: function (response) {
        if (response.data && response.data.length > 0) {
          var problemEntry = response.data[0].entries_detail;
          var html = "";
             for (var i = 0; i < problemEntry.length; i++) {
               html +=
               '<div class="panel panel-default">'+
               '<div id="heading-1" class="panel-heading" role="tab">'+
               '<h1 class="panel-title"><a href="#collapse-'+ i +'"'+' role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" aria-controls="collapse-'+ i +'"'+'><strong>'+moment(problemEntry[i].date).format('dddd Do MMMM')+'</strong></a></h1>'+
               '<div class="edit-goal-link"><a href="/tracker/problem/edit/'+problemEntry[i].id+'"'+'><strong>Edit</strong></a></div>'+
               '</div>'+
               '<div id="collapse-'+ i +'"'+'class="panel-collapse" role="tabpanel" aria-labelledby="heading-1" aria-expanded="true">'+
               '<div class="maia-panel-body">'+
               '<div>'+
               '<h5 class="card-heading"><strong>How well did you cope?</strong><br></h5>'+
               '<div class="flex-div-col"><label class="profile-card-tittle">'+problemEntry[i].range+'</label></div>'+
               '</div>'+
               '<div>'+
               '<h5 class="card-heading"><strong>Notes</strong><br></h5>'+
               '<div class="flex-div-col"><label class="profile-card-tittle">'+problemEntry[i].notes+'</label></div>'+
               '</div>'+
               '</div>'+
               '</div>'+
               '</div';

               var ind = graphData.date.indexOf(new moment(problemEntry[i].date).format('dddd Do'));
               if (ind > -1) {
                 graphData.problem[ind] = (problemEntry[i].range == 'Excellent') ? 5 : (problemEntry[i].range == 'Very good') ? 4 : (problemEntry[i].range == 'Good') ? 3 : (problemEntry[i].range == 'Fair') ? 2 : (problemEntry[i].range == 'Poor') ? 1 : 0;
               }
             }
           }else{
             $('#noContent').show();
           }
           $('#accordion').empty();
           $('#accordion').append(html);
           addData(graphData.date, graphData.problem);

      },
      error: function (error) {
      }

    });
  }
  $(document).ready(function () {
    problemGraph();
  });
