
// It is the ratio of runs conceded per wickets taken, meaning that the lower the bowling average is, the better the bowler is performing.

import React from 'react';
import ReactDOM from 'react-dom';

class BowCalculate extends React.Component{

	constructor(props){
		super(props);

		this.state = {}
		this.calculate_data 	      = this.calculate_data.bind(this);
	}


	componentDidMount(){
		this.calculate_data();
	}
		
	calculate_data(){

		const {data} = this.props;
		let wickets = 0, runs_conceded = 0, catches = 0, bowling_average = 0, innings_played = 0;

		data.forEach((object) => {
		    runs_conceded += parseInt(object.runs_conceded, 10);
		    wickets       += parseInt(object.wickets, 10);
		    catches       += parseInt(object.catches, 10);
		});

		bowling_average = (runs_conceded) / (wickets);
		bowling_average = parseInt(bowling_average.toFixed(2));

		this.setState({ 
			   wickets: wickets,
			   runs_conceded : runs_conceded,
			   catches : catches,
			   bowling_average : bowling_average,
			})

	}

	render(){

		return(
			<div> 
			 	<p>Bowling Average : {this.state.bowling_average}</p>
			 	<p>Catches Taken   : {this.state.catches}</p>
			 	<p>Runs Conceded   : {this.state.runs_conceded}</p>
			 	<p>Wickets Taken   : {this.state.wickets}</p>
			</div>

		)
	}

}

export default BowCalculate;
