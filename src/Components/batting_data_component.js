

import React from 'react';
import ReactDOM from 'react-dom';

class Batting extends React.Component{

	constructor(props){
		super(props);
		this.state = {}
		this.remove_irrelevant_parts = this.remove_irrelevant_parts.bind(this);
	}

	remove_irrelevant_parts(){
		const {data} = this.props;
		const pattern = new RegExp("[*]$");

		let Clean_Data = data.filter((object) => {
 
  			 if(isNaN(object.batting_score) && !(pattern.test(object.batting_score))){
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

		console.log('Clean', this.state.data)
		return(
			<div>
				<p>Batting Component</p>
			</div>
		)
	}
}

export default Batting;