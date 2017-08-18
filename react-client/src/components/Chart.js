import React from 'react';
import chartJS from 'react-chartjs';
import {Line as LineChart} from 'react-chartjs';

const ChartComponent = (props)=>{
  return (
    <div>
      <LineChart data={props.chartData} options={null} width="600" height="400"/> 
    </div>
  )
};

export default ChartComponent;
