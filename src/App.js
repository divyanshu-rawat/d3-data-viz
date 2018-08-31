

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as d3 from 'd3';
import data from './data_set/data.csv';
import {Batting} from './Components/Batting';
import {Bowling} from './Components/Bowling';


// console.log('bowling', );
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Boolean: true
      // isLoading: true
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
    // setTimeout(() => this.setState({isLoading: false}), 500)
  }

  render() {

    if(this.state.isLoading){
     return(
        <div className="container"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" className="_loader" /></div>
      )
    }

    return ( 
      <div className = "container App col-lg-12" id = "App"> 

          <button type="button" className="btn btn-default" onClick = {this.toggle}>Toggle Batting/Bowling</button>
          <h3 className = "text">Sachin Tendulkar Data Visualization</h3>
          <p className = "text">As we can see from the visualization <b>Sachin Tendulkar</b> can be regarded as the greatest cricketer of all time.</p>
          { 
            (this.state.data && this.state.Boolean == true ) ? 
             
             <div className = "col-lg-12">
               <div className = "col-lg-2">
                 <Batting data = {this.state.data}/>
               </div>

               <div className = "col-lg-10"> 
                  <div id="BattingViz">
                  </div>
                   <ul className="label-graph">
                    <li><div className="won"></div> Won</li>
                    <li><div className="lost"></div>Lost</li>
                    <li><div className="no-result"></div>Draw</li>
                  </ul>

              </div>

             </div> : null
          }

          { 
            (this.state.data && this.state.Boolean == false) ?

              <div className = "col-lg-12">
                 
                   <div className = "col-lg-2">
                     <Bowling data = {this.state.data}/>
                   </div>

                   <div className = "col-lg-9"> 
                      <div id="BowlingViz">
                      </div>
                       <ul className="label-graph">
                        <li><div className="won"></div> Won</li>
                        <li><div className="lost"></div>Lost</li>
                        <li><div className="no-result"></div>Draw</li>
                      </ul>
                   </div>
               
               </div> : null
           }
          
          
      </div>
    );
  }
}

export default App;