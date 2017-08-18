import React from 'react';
import ChartComponent from './Chart';

const Balance = (props)=>{
  // console.log('props in balance', props)
  return (
    <div>
      <div>
        <button onClick={props.signout}> Sign Out </button>
        <h1> Welcome {props.address}! </h1>
        <h2> JobCoin Balance </h2>
        <h2> {props.userData.balance} </h2>
      </div>
      <div>
        <h2> Send JobCoin </h2>
        Destination Address:<input type="text" name={'sendingUserName'} onChange={props.onInputChange.bind(this)} value={props.destination}/>
        Amount to send:<input type="text" name={'sendingCoinAmount'} onChange={props.onInputChange.bind(this)} value={props.amount}/>
        <button onClick={props.sendCoin}> Send JobCoin </button>
      </div>

      <ChartComponent chartData={props.chartData}/>
    </div>
  )
};

export default Balance;