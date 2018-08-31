


import React from 'react';
import ReactDOM from 'react-dom';
import BowCalculate from './bowling_data_calculations';
import Bowlingvisualization   from './bowling_data_viz';

class Bowling extends React.Component{

	constructor(props){
		super(props);
		this.state = {}
		this.remove_irrelevant_parts = this.remove_irrelevant_parts.bind(this);
	}

	remove_irrelevant_parts(){

		const {data} = this.props;
		let Clean_Data = data.filter((object) => {
 
  			 if(isNaN(object.wickets) && isNaN(object.runs_conceded)){
  			 	return false;
  			 } 
  			 return true;
		});

		this.setState({ data: Clean_Data })
	}

	componentDidMount(){
		this.remove_irrelevant_parts();
	}

	render(){

		console.log('intial Data Bowling', this.state.data);
		return(
			<div>
				<h3>Bowling Component</h3>
				{ (this.state.data) ?  <BowCalculate data = {this.state.data}/> : null} 
				{ (this.state.data) ?  <Bowlingvisualization data = {this.state.data}/> : null}
			</div>
		)
	}
}

export default Bowling;