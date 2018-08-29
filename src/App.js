

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as d3 from 'd3';
import data from './data_set/data.csv';
import Batting from './Components/batting_data_component';
import Bowling from './Components/bowling_data_component';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'Boolean': true
    };
    this.load_data_driven_document = this.load_data_driven_document.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(){

    this.setState({ Boolean: !this.state.Boolean })
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
      <div className = "container App" > 
          <button type="button" className="btn btn-default" onClick = {this.toggle}>Toggle Batting/Bowling</button>
          { (this.state.data && this.state.Boolean == true ) ? <Batting data = {this.state.data}/> : null}
          { (this.state.data && this.state.Boolean == false) ? <Bowling data = {this.state.data}/> : null}

      </div>
    );
  }
}

export default App;