import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import UserPage from './components/UserPage'
import LoginPage from './components/LoginPage'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  render () {
    return (
      <Router>
        <div>
          <div>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/UserPage" component={UserPage}/>
          </div>
        </div>
      </Router>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));