

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Batting extends React.Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){
		console.log('componentDidMount', this.props.data);
	}

	render(){

		return(
			<div>
				<p>Batting Component</p>
			</div>
		)
	}
}

export default Batting;