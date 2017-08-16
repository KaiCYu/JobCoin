import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Balance from './components/Balance.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '',
      userData: {},
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGetRequest = this.handleGetRequest.bind(this);
  }

  handleInputChange(e){
    this.setState({address: e.target.address});
  }

  handleGetRequest(){
    $.get({
      url: `http://jobcoin.projecticeland.net/dinosaur/api/addresses/${this.state.value}`,
      success: function (data) {
        console.log('success',data);
        this.setState({ userData: data});
      }.bind(this),
      error: function (err) {
        console.log('err', err)
      }
    })
  };

  render () {
    return (
      <div>
        <Router>
          <div>
            <h3> Welcome! Sign in with your JobCoin Address </h3>
            <p> JobCoin Address </p>

            <input type="text" name="name" onChange={this.handleInputChange} value={this.state.address}/>
            <button onClick={this.handleGetRequest}>Submit</button>
            <Route path="/Balance" component={Balance}/>
            {/*<Link to="/Balance" onClick={this.handleGetRequest} value={this.state.address}>Submit</Link>*/}
          </div>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));