import $ from 'jquery';
import React from 'react';
import Route from './Routes'
import ReactDOM from 'react-dom';
import ChartComponent from './Chart';
import {Link} from 'react-router-dom';
import moment from 'moment';

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
    this.handleGetRequest = this.handleGetRequest.bind(this);
    this.handleSendCoin = this.handleSendCoin.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.transformDataForChart = this.transformDataForChart.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }

  handleSignout() {
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
        this.handleGetRequest();
        //update state
        this.setState({sendingUserName: '', sendingCoinNumber: ''});
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
          data: [], //y values $(amount)
        }
      ]
    };

    let amount = Number.parseInt(dataset.transactions[0].amount);  //intial amount
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

      let formattedDate = moment(dataset.transactions[i].timestamp).format('YYYY-MM-DD hh:mm');
      result.labels.push(formattedDate);
    }

    return result;
  }

  handleGetRequest(){
    $.get({
      url: `http://jobcoin.projecticeland.net/dinosaur/api/addresses/${this.state.address}`,
      success: function (data) {
        let transformed = this.transformDataForChart(data);
        // console.log('transformed', transformed);
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
            <input type="text" name={'address'} onChange={this.onInputChange} value={this.state.address}/>
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
              Destination Address:<input type="text" name={'sendingUserName'} onChange={this.onInputChange} value={this.state.sendingUserName}/>
              Amount to send:<input type="text" name={'sendingCoinNumber'} onChange={this.onInputChange} value={this.state.sendingCoinNumber}/>
              <button onClick={this.handleSendCoin}> Send JobCoin </button>
            </div>

            <ChartComponent chartData={this.state.chartData}/>
          </div>
        )
      }
    }
  }
}

export default LoginPage;