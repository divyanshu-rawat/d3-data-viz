

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as d3 from 'd3';
import data from './data_set/data.csv';
import Batting from './Components/batting_data_component';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.load_data_driven_document = this.load_data_driven_document.bind(this);
  }

  load_data_driven_document(){
    d3.csv(data)
    .then((data) => {
      this.setState({ data: data })
    })
    .catch((err) => {
        throw err;
    })
  }

  componentDidMount() {
    this.load_data_driven_document();
  }

  render() {
    return ( 
      <div className = "App" >
       <div> Data Visualization </div> 
          { this.state.data ? <Batting data = {this.state.data}/> : null}
      </div>
    );
  }
}

export default App;