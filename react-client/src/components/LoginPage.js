import $ from 'jquery';
import React from 'react';
import Route from './Routes'
import ReactDOM from 'react-dom';
import ChartComponent from './Chart';
import {Link} from 'react-router-dom';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '',
      loggedIn: false,
      sendingUserName: '',
      sendingCoinNumber: '',
      userData: {},   //data from ajax
      chartData: {},  //transformed data
    }

    this.initialState = this.state;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGetRequest = this.handleGetRequest.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSendCoin = this.handleSendCoin.bind(this);
    this.handleCoinChange = this.handleCoinChange.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.transformDataForChart = this.transformDataForChart.bind(this);
  }

  handleInputChange(e){
    this.setState({address: e.target.value});
  }
  handleUserChange(e){
    this.setState({sendingUserName: e.target.value});
  }
  handleCoinChange(e){
    this.setState({sendingCoinNumber: e.target.value})
  }

  handleSignout() {
    console.log('signing out... setting state to:', this.initialState);
    this.setState(this.initialState);
  }

  handleSendCoin(){
    var data = {
      fromAddress: this.state.address,
      toAddress: this.state.sendingUserName,
      amount: this.state.sendingCoinNumber
    };

    $.post({
      url: "http://jobcoin.projecticeland.net/dinosaur/api/transactions",
      data: data,
      success: (success)=>{
        console.log('sent coins', success);
        //send for new transactions?
        this.handleGetRequest();
        //update state 
      }, 
      error: (error)=>{
        console.log('ERROR', error)
      }
    })
  }

  transformDataForChart(dataset){
    let result = {
      labels: [],   //x labels transactions (timestamps)
      datasets: [
        {
          label: `Amount vs Time for ${this.state.address}`,
          fill: true,
          pointHoverRadius: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [], //y values $(amount)
          spanGaps: false,
        }
      ]
    };

    let amount = Number.parseInt(dataset.transactions[0].amount);  //intial amount
    // console.log('initial amount', amount);
    for (var i = 1; i < dataset.transactions.length; i++) {
      //sending (subract from amount)
      if (dataset.transactions[i].fromAddress === this.state.address) {
        amount -= Number.parseInt(dataset.transactions[i].amount);
      //receiving (add to amount)
      } else {
        amount += Number.parseInt(dataset.transactions[i].amount);
      }
      //add amount to result (y axis)
      result.datasets[0].data.push(amount);
      //add timestamps to result (x axis)
      result.labels.push(dataset.transactions[i].timestamp);
    }
    console.log(result);
    return result;
  }

  handleGetRequest(){
    $.get({
      url: `http://jobcoin.projecticeland.net/dinosaur/api/addresses/${this.state.address}`,
      success: function (data) {
        // console.log('data back from ajax', data);
        let transformed = this.transformDataForChart(data);
        console.log('transformed', transformed);
        this.setState({chartData: transformed, userData: data, loggedIn: true});
      }.bind(this),
      error: function (err) {
        console.log('err in get request', err)
      }
    })
  };

  render () {
      //not logged in
      { if(!this.state.loggedIn){
        return (
          <div>
            <h3> Welcome! Sign in with your JobCoin Address </h3>
            <p> JobCoin Address </p>
            <input type="text" onChange={this.handleInputChange} value={this.state.address}/>
            <button onClick={this.handleGetRequest}>Sign In </button>
          </div>
        )
      //logged in
      } else {
        return (
          <div>
            <div>
              <button onClick={this.handleSignout}> Sign Out </button>
              <h1> Welcome {this.state.address}! </h1>
              <h2> JobCoin Balance </h2>
              <h2> {this.state.userData.balance} </h2>
            </div>
            <div>
              <h2> Send JobCoin </h2>
              Destination Address:<input type="text" onChange={this.handleUserChange} value={this.state.sendingUserName}/>
              Amount to send:<input type="text" onChange={this.handleCoinChange} value={this.state.sendingCoinNumber}/>
              <button onClick={this.handleSendCoin}> Send JobCoin </button>
            </div>

            <ChartComponent chartData={this.state.chartData} options={null}/>
          </div>
        )
      }
    }
  }
}

export default LoginPage;