google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Название', 'Число голосов'],
          ['Предложение 1',     72],
          ['Предложение 2',      50],
          ['Предложение 3',  38],
          ['Предложение 4', 99]
        ]);

        var options = {
          title: 'Результаты голосования'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }