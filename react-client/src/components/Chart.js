import React from 'react';
import chartJS from 'react-chartjs';

var LineChart = require("react-chartjs").Line;
// var LineChart = require("react-chartjs").Line;


const ChartComponent = (props)=>{
  return <LineChart data={props.chartData} options={props.option} width="600" height="250"/> 
};

export default ChartComponent;