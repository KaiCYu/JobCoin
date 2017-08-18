import React from 'react';
import ChartComponent from './Chart';

const Dashboard = (props)=>{
  return (
    <div>

      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li className="active">Welcome {props.address}!</li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><span className="glyphicon glyphicon-user"></span> Logged In</li>
            <li onClick={props.signout}><span className="glyphicon glyphicon-log-out"></span> Sign Out</li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid content">
        <div className="col-one">
          <div className="balance">
            <p> JobCoin Balance </p>
            <p> {props.userData.balance} </p>
          </div>

          <div className="sendcoin">
            <p> Send JobCoin </p>
            Destination Address:<input type="text" name={'sendingUserName'} onChange={props.onInputChange.bind(this)} value={props.destination}/>
            Amount to send:<input type="text" name={'sendingCoinAmount'} onChange={props.onInputChange.bind(this)} value={props.amount}/>
            <button onClick={props.sendCoin}> Send JobCoin </button>
          </div>
        </div>
        
        <div className="col-two">
          <div className="chart">
            <p>JobCoin History Graph</p>
            <ChartComponent chartData={props.chartData}/>
          </div>
        </div>
      </div>

    </div>
  )
};

export default Dashboard;