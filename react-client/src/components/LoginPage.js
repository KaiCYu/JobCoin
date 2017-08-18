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
      value: '',
      userInformation: '',
      sendingUserName: '',
      sendingCoinNumber: '',
      userData: [1,2,3,4,5,6],
      userInfor: [10, 20, 30 , 40]
    }

    this.initialState = this.state;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGetRequest = this.handleGetRequest.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSendCoin = this.handleSendCoin.bind(this);
    this.handleCoinChange = this.handleCoinChange.bind(this);
  }

  handleInputChange(e){
    this.setState({value: e.target.value});
  }
  handleUserChange(e){
    this.setState({sendingUserName: e.target.value});
  }
  handleCoinChange(e){
    this.setState({sendingCoinNumber: e.target.value})
  }

  handleSignout() {
    this.setState(this.initialState);
  }

  handleSendCoin(){
    var data = {
      fromAddress: this.state.value,
      toAddress: this.state.sendingUserName,
      amount: this.state.sendingCoinNumber
    };

    $.post({
      url: "http://jobcoin.projecticeland.net/dinosaur/api/transactions",
      data: data,
      success: (success)=>{
        console.log(success)
      }, 
      error: (error)=>{
        console.log('ERROR', error)
      }
    })
  }

  getDataForChart(){

  }

  handleGetRequest(){
    $.get({
      url: `http://jobcoin.projecticeland.net/dinosaur/api/addresses/${this.state.value}`,
      success: function (data) {
        this.setState({userInformation: data})

        console.log(data);
      }.bind(this),
      error: function (err) {
        console.log('err in get request', err)
      }
    })
 // <Link to="/UserPage">Submit</Link>
  };

  render () {
      //not logged in
      { if(this.state.userInformation === ''){
        return (
          <div>
            <h3> Welcome! Sign in with your JobCoin Address </h3>
            <p> JobCoin Address </p>
            <input type="text" onChange={this.handleInputChange} value={this.state.value}/>
            <button onClick={this.handleGetRequest}>Sign In </button>
          </div>
        )
      //logged in
      } else {
        return (
          <div>
            <div>
              <button onClick={this.handleSignout}> Sign Out </button>
              <h1> Welcome User: {this.state.value} </h1>
              <h2> JobCoin Balance </h2>
              <h2> {this.state.userInformation.balance} </h2>
            </div>
            <div>
              <h2> Send JobCoin </h2>
              To:<input type="text" onChange={this.handleUserChange} value={this.state.sendingUserName}/>
              Amount:<input type="text" onChange={this.handleCoinChange} value={this.state.sendingCoinNumber}/>
              <button onClick={this.handleSendCoin}> Send JobCoin </button>
            </div>
              
            <ChartComponent chartData={this.state.userInfor} options={this.state.userData}/>
          </div>
        )
      }
    }
  }
}

export default LoginPage;