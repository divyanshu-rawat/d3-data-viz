


import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Bowling extends React.Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){
		console.log('Bowling Data', this.props.data);
	}

	render(){

		return(
			<div>
				<p>Bowling Component</p>
			</div>
		)
	}
}

export default Bowling;