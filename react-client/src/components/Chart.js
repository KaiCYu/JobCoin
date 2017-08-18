import React from 'react';
import chartJS from 'react-chartjs';
import {Line as LineChart} from 'react-chartjs';

// var LineChart = require("react-chartjs").Line;
//TODO: change dataset, pass into Chart component
const ChartComponent = (props)=>{
  // const chartOptions = {
  //   legend: {
  //     display: true,
  //     position: 'top',
  //   },
  //   title: {
  //     display: true,
  //     position: 'top',
  //   }
  //   // xAxisID: 'Time of Transactions',
  //   // yAxisID: 'Amount Balance',
  //   // label: 'Amount vs Time',
  //   // fill: false,
  //   // pointHoverRadius: 5,
  //   // pointRadius: 1,
  //   // pointHitRadius: 10,
  //   // spanGaps: false,
  // }

  return (
    <div>
      <LineChart data={props.chartData} options={null} width="600" height="400"/> 
    </div>
  )
};

export default ChartComponent;

// const set1 = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "My First dataset",
//       fill: true,
//       pointHoverRadius: 5,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [65, 59, 80, 81, 56, 55, 40],
//       spanGaps: false,
//     }
//   ]
// };