import React from 'react';
import ChartComponent from './Chart';

const Dashboard = (props)=>{
  return (
    <div>

      <div className="topnav">
        <h4> Welcome {props.address}! </h4>
        {/*icon ??*/}
        <button id="button-signout" onClick={props.signout}>Sign Out</button>
      </div>

      <div className="balance">
        <h4> JobCoin Balance </h4>
        <h4> {props.userData.balance} </h4>
      </div>

      <div className="sendcoin">
        <h2> Send JobCoin </h2>
        Destination Address:<input type="text" name={'sendingUserName'} onChange={props.onInputChange.bind(this)} value={props.destination}/>
        Amount to send:<input type="text" name={'sendingCoinAmount'} onChange={props.onInputChange.bind(this)} value={props.amount}/>
        <button onClick={props.sendCoin}> Send JobCoin </button>
      </div>

      <div className="chart">
        <h4>JobCoin History Graph</h4>
        <ChartComponent chartData={props.chartData}/>
      </div>

    </div>
  )
};

export default Dashboard;