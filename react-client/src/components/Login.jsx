import React from 'react';
// import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Balance from './components/Balance.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '',
      userData: {},
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e){
    this.setState({address: e.target.value});
  }

  handleSubmit(){
    $.get({
      url: `http://jobcoin.projecticeland.net/dinosaur/api/addresses/${this.state.address}`,
      success: function (data) {
        this.setState({ userData: data});
        this.props.history.push('/balance');
      }.bind(this),
      error: function (err) {
        console.log('err', err)
      }.bind(this)
    })
  };

  render () {
    
    return (
      <div>
        <h3> Welcome! Sign in with your JobCoin Address </h3>
        <p> JobCoin Address </p>

        <input type="text" onChange={this.handleInputChange} value={this.state.address} />

        <button type="button" onClick={this.handleSubmit}>Submit</button>

      </div>
    )
  }
}

export default Login;