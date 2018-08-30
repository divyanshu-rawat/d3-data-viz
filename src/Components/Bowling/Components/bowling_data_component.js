


import React from 'react';
import ReactDOM from 'react-dom';
import BowCalculate from './bowling_data_calculations';

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
		return(
			<div>
				<h3>Bowling Component</h3>
				{ (this.state.data) ? <BowCalculate data = {this.state.data}/> : null}
			</div>
		)
	}
}

export default Bowling;