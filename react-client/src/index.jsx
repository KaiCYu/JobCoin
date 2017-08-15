import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  // componentDidMount() {
    
  // }

  onSubmit() {
    //send ajax call with address to API
    console.log('state:', this.state.address);
    $.get({
      url: `http://jobcoin.projecticeland.net/dinosaur/api/addresses/${this.state.address}`,
      success: (data) => {
        console.log('got data back!', data);
      },
      error: (err) => {
        console.log('err', err);
      }
    })
    //take you to next screen
  }

  onInputChange(event) {
    console.log('name', event.target.value);
    this.setState({
      address: event.target.value,
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <h1> Kai Yu</h1>

      <div>
        <p>Welcome! Sign in with your Job Coin Address</p>

        <form>
          <input type="text" onChange={this.onInputChange} value={this.state.address}/>
          <button onClick={this.onSubmit} >Sign In</button>
        </form>
      </div>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));