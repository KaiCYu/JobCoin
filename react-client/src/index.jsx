import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import ChartComponent from './components/Chart';
import SignIn from './components/SignIn.js';
import Dashboard from './components/Dashboard.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '',
      loggedIn: false,
      sendingUserName: '',
      sendingCoinAmount: '',
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
    console.log('changing', e.target.name, 'to: ', e.target.value);
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  handleSignout() {
    console.log('signing out')
    this.setState(this.initialState);
  }

  handleSendCoin(){
    console.log('sending coin');
    var data = {
      fromAddress: this.state.address,
      toAddress: this.state.sendingUserName,
      amount: this.state.sendingCoinAmount
    };
    console.log('data', data);

    $.post({
      url: "http://jobcoin.projecticeland.net/dinosaur/api/transactions",
      data: data,
      success: (success)=>{
        console.log('sent coins', success);
        this.handleGetRequest();
        this.setState({sendingUserName: '', sendingCoinAmount: ''});
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
    console.log('getting request')
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
          <SignIn onChange={this.onInputChange} address={this.state.address} handleGetRequest={this.handleGetRequest}/>
        )
      //logged in
      } else {
        return (
          <Dashboard onInputChange={this.onInputChange} signout={this.handleSignout} sendCoin={this.handleSendCoin} address={this.state.address} userData={this.state.userData} amount={this.state.sendingCoinAmount} destination={this.state.sendingUserName}  chartData={this.state.chartData}/>
        )
      }
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));