import React, { Component } from 'react';
import NavRouter from './components/NavRouter';
import './components/stylesheets/App.css';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavRouter />
      </div>
    );
  }
}

export default App;
