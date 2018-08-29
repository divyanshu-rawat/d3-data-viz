import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3';
import data from './data_set/data.csv';

class App extends Component {


  constructor(props){
    super(props);

    this.state = {
      'batting_data' : []
    }

  }

  componentDidMount(){

    d3.csv(data).then( (data) =>{

      let clean_data = data.filter((data) => {

          if(isNaN(data.batting_score) && !(/[*]$/g.test(data.batting_score))){     
              return false;
           }
           return true;
      });

      return clean_data;

    })
    .then( (data) => {
      
      this.setState({
        batting_data: data
      })

    })
    .catch( (err) =>{
        throw err;
    })
  }

  render() {

    console.log('batting_data', this.state.batting_data)

    return (
      <div className="App">
        <div>Data Visualization</div>
      </div>
    );
  }
}

export default App;
