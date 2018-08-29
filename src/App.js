import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3';
import data from './data_set/data.csv';

class App extends Component {


  constructor(props){
    super(props)
  }

  componentDidMount(){

    d3.csv(data).then(function (data) {
      return data;
    })
    .then(function (data) {
      console.log('new_data', data);
    })
    .catch(function (err) {
        throw err;
    })
  }

  render() {


    return (
      <div className="App">
        <div>Data Visualization</div>
      </div>
    );
  }
}

export default App;
