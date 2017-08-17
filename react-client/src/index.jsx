import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import {browserHistory} from 'react-router';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Login from './components/Login.jsx';
import Balance from './components/Balance.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Login}/>
            <Route path="/balance" component={Balance}/>
          </div>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));