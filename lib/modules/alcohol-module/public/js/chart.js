var ctx = document.getElementById("AlcoholChart").getContext('2d');
var BASE_API_URL = "/modules/alcohol-module/";
var startDate = new moment().subtract(6, 'days').format('YYYY-MM-DD');
var daysArray = [];

var alcoholChart = new Chart(ctx, {
    type: 'line',
    data: {
      // labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [{
        label: 'alcohol',
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
            padding: 5

          },
          ticks: {
            min: 0,
            max: 5,
            stepSize: 1,
            fontSize: 12,
            fontColor:  '#61BCA4',
            padding: 5,


            callback: function (label, index, labels) {
              switch (label) {
                case 0:
                  return 'Very Poor';
                case 1:
                  return 'Poor';
                case 2:
                  return 'Okay';
                case 3:
                  return 'Well';
                case 4:
                  return 'Very well';
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

  function addData(label, alcohol) {
    alcoholChart.data.labels = label;
    alcoholChart.data.datasets[0].data = alcohol;
    alcoholChart.update();
  }

  function prevBtnp() {
    startDate = new moment(startDate, 'YYYY-MM-DD').subtract(7, 'days').format('YYYY-MM-DD');
    alcoholGraph();
  };

  function nextBtnp() {
    startDate = new moment(startDate, 'YYYY-MM-DD').add(7, 'days').format('YYYY-MM-DD');
    alcoholGraph();
  };

  function getRangeOfDates(start, end, key) {
    var next = moment(start).add(1, key).startOf(key);
    daysArray.push(start.startOf(key).format('dddd Do'));
    if (start.startOf('day').format('YYYY-MM-DD') === end.startOf('day').format('YYYY-MM-DD')) {
      return daysArray;
    }
    return getRangeOfDates(next, end, key);
  }

  function alcoholGraph() {
    daysArray = [];
    let labelValue = moment(startDate, 'YYYY-MM-DD').format('Do') + " - " + moment(startDate, 'YYYY-MM-DD').add(6, 'days').format('Do MMMM YYYY');

    $("#chartlable").text(labelValue);
    var dateRange = getRangeOfDates(new moment(startDate, 'YYYY-MM-DD'), new moment(startDate, 'YYYY-MM-DD').add(6, 'days'), 'days');
    var graphData = {
      'date': dateRange
    };
    graphData.alcohol = ['5', '5', '5', '5', '5', '5', '5'];
    $.ajax({
      url: BASE_API_URL + "get-alcohol?startDate="+startDate ,
      type: "GET",
      success: function (response) {
        if (response.data && response.data.length > 0) {
          var alcoholEntry = response.data;
          var html = "";
          var units = "";
             for (var i = 0; i < alcoholEntry.length; i++) {
                 units = (alcoholEntry[i].units == 5) ? "Excellent" : (alcoholEntry[i].units == 4) ? "Very well" : (alcoholEntry[i].units == 3) ? "Well" : (alcoholEntry[i].units == 2) ? "Okay" : (alcoholEntry[i].units == 1) ? "Poor" : "Very Poor";
               html +=
               '<div class="panel panel-default">'+
               '<div id="heading-1" class="panel-heading" role="tab">'+
               '<h1 class="panel-title"><a href="#collapse-'+ i +'"'+' role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" aria-controls="collapse-'+ i +'"'+'><strong>'+moment(alcoholEntry[i].date).format('dddd Do MMMM')+'</strong></a></h1>'+
               '<div class="edit-goal-link"><a href="/tracker/alcohol/edit/'+alcoholEntry[i].id+'"'+'><strong>Edit</strong></a></div>'+
               '</div>'+
               '<div id="collapse-'+ i +'"'+'class="panel-collapse" role="tabpanel" aria-labelledby="heading-1" aria-expanded="true">'+
               '<div class="maia-panel-body">'+
               '<div>'+
               '<h5 class="card-heading"><strong>How did you cope with your alcohol intake?</strong><br></h5>'+
               '<div class="flex-div-col"><label class="profile-card-tittle">'+units+'</label></div>'+
               '</div>'+
               '<div>'+
               '<h5 class="card-heading"><strong>Notes</strong><br></h5>'+
               '<div class="flex-div-col"><label class="profile-card-tittle">'+alcoholEntry[i].notes+'</label></div>'+
               '</div>'+
               '</div>'+
               '</div>'+
               '</div';

               var ind = graphData.date.indexOf(new moment(alcoholEntry[i].date).format('dddd Do'));
               if (ind > -1) {
                // graphData.alcohol[ind] = (alcoholEntry[i].units == 5) ? 5 : (alcoholEntry[i].units == 4) ? 4 : (alcoholEntry[i].units == 3) ? 3 : (alcoholEntry[i].units == 2) ? 2 : (alcoholEntry[i].units == 1) ? 1 : 0;
                graphData.alcohol[ind] = alcoholEntry[i].units;
                 console.log("==== inside ===", graphData.alcohol[ind]);
               }
             }
           }else{
             $('#noContent').show();
           }
           $('#accordion').empty();
           $('#accordion').append(html);
           addData(graphData.date, graphData.alcohol);

      },
      error: function (error) {
      }

    });
  }



  $(document).ready(function () {
    alcoholGraph();
  });
