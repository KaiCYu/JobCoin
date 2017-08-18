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
    const name = e.target.name;
    this.setState({[name]: e.target.value});
  }

  handleSignout() {
    this.setState(this.initialState);
  }

  handleSendCoin(){
    var data = {
      fromAddress: this.state.address,
      toAddress: this.state.sendingUserName,
      amount: this.state.sendingCoinAmount
    };
    $.post({
      url: "http://jobcoin.projecticeland.net/dinosaur/api/transactions",
      data: data,
      success: (success) => {
        console.log('sent coins', success);
        this.handleGetRequest();
        this.setState({sendingUserName: '', sendingCoinAmount: ''});
      }, 
      error: (error) => {
        console.log('ERROR', error)
      }
    })
  }

  transformDataForChart(dataset) {
    let result = {
      labels: [],   //x labels transactions (timestamps)
      datasets: [
        {
          data: [], //y values $(amount)
        }
      ]
    };
    let len = dataset.transactions.length;
    if (len !== 0) {
      let amount = Number.parseInt(dataset.transactions[0].amount);
      for (var i = 1; i < len; i++) {
        //sending (subract from amount)
        let transaction = dataset.transactions[i];
        if (transaction.fromAddress === this.state.address) {
          amount -= Number.parseInt(transaction.amount);
        //receiving (add to amount)
        } else {
          amount += Number.parseInt(transaction.amount);
        }
        result.datasets[0].data.push(amount);
        let formattedDate = moment(dataset.transactions[i].timestamp).format('YYYY-MM-DD hh:mm');
        result.labels.push(formattedDate);
      }
    }
    return result;
  }

  handleGetRequest(){
    if (this.state.address === '') {
      alert('Please enter an address!');
    } else {
      $.get({
        url: `http://jobcoin.projecticeland.net/dinosaur/api/addresses/${this.state.address}`,
        success: function (data) {
          let transformed = this.transformDataForChart(data);
          this.setState({chartData: transformed, userData: data, loggedIn: true});
        }.bind(this),
        error: function (err) {
          console.log('err in get request', err)
        }
      })
    }
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