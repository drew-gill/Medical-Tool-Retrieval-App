import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import Chart from 'chart.js';

Chart.defaults.global.defaultFontFamily = 'Roboto';

const RetrievalChart = ({ retrievalHistory }) => {
  // Interpolate the retrievalHistory into chart data
  let retrievalData = retrievalHistory;
  retrievalData.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  const dates = [];
  const times = [];
  const numberOfEntries = Math.min(retrievalData.length, 30);
  for (var i = 0; i < numberOfEntries; i++) {
    const d = moment(retrievalData[i].retrievalDate).format(
      'dddd, MMMM Do YYYY, h:mm:ss a'
    );
    dates.push(d.toString());
    times.push(parseInt(retrievalData[i].retrievalTime));
  }

  // Calculate the minimum and maximum chart values
  const minVal = Math.min(...times);
  const maxVal = Math.max(...times);
  const chartMin = 0;
  const chartMax = 1.1 * maxVal;

  // Combine the interpolated data into a chart data object
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Retrieval Time',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: '#3F51B5',
        pointColor: 'rgba()',
        pointBackgroundColor: '#FFFFFF',
        borderWidth: 2,
        data: times
      }
    ]
  };

  // Chart options
  const options = {
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20
      }
    },
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Retrieval History',
      fontColor: 'black',
      fontSize: 20,
      fontFamily: 'Roboto'
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: chartMin,
            suggestedMax: chartMax
          },
          scaleLabel: {
            display: true,
            labelString: 'Retrieval Time (s)'
          }
        }
      ],
      xAxes: [
        {
          display: false
        }
      ]
    }
  };

  return (
    <React.Fragment>
      <Line data={data} options={options} />
    </React.Fragment>
  );
};

export default RetrievalChart;
