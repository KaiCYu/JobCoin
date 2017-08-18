import React from 'react';
import chartJS from 'react-chartjs';
import {Line as LineChart} from 'react-chartjs';

// var LineChart = require("react-chartjs").Line;

const ChartComponent = (props)=>{
  return (
    <div>
      {console.log('chart props', props.chartData)}
      <LineChart data={set1} options={null} width="600" height="250"/> 
    </div>
  )
};

export default ChartComponent;

const set1 = {
  // labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: true,
      pointHoverRadius: 5,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
      spanGaps: false,
    }
  ]
};