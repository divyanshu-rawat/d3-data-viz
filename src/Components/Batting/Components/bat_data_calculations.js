
// batting average is the total number of runs that they have scored divided by the number of times they have been out.

import React from 'react';
import ReactDOM from 'react-dom';

class BatCalculate extends React.Component{

	constructor(props){
		super(props);

		this.state = {}
		
		this.calculate_remaining_data       = this.calculate_remaining_data.bind(this);
		this.calculate_batting_average_data = this.calculate_batting_average_data.bind(this);
	}


	componentDidMount(){
		this.calculate_batting_average_data();
		this.calculate_remaining_data();
	}


	calculate_remaining_data(){

		const {data} = this.props;
		let hundered_scored = 0, fifty_scored = 0, innings_played = 0, maximum_score = 0;

		data.forEach((object) => {
		    let score_int = parseInt(object.batting_score, 10);

		    if(score_int > maximum_score)
		    	maximum_score = score_int;
  			if(score_int >= 50 && score_int < 100)
		 		fifty_scored += 1;
		    if(score_int >= 100)
				hundered_scored += 1;

			innings_played += 1
		});

		this.setState({ 
			   fifty_scored: fifty_scored,
			   innings_played : innings_played,
			   maximum_score : maximum_score,
			   hundered_scored : hundered_scored
			})
     }

		
	calculate_batting_average_data(){

		let _outs, total_number_of_runs = 0;
		let batting_average;
		const pattern = new RegExp("[*]$");

		const {data} = this.props
		_outs = data.filter((object) => {

  		  if(pattern.test(object.batting_score)){

  		  	  total_number_of_runs += parseInt(object.batting_score, 10);
		 	  return false;
  		    }

  		    total_number_of_runs += parseInt(object.batting_score, 10)
  		    return true;
		});

		batting_average = (total_number_of_runs) / (_outs.length);
		batting_average = parseInt(batting_average.toFixed(2));
		
		this.setState({
			 batting_average : batting_average,
			 total_number_of_runs: total_number_of_runs
	   })
	}

	render(){

		return(
			<div> 
			 	<p>Batting Average : {this.state.batting_average}</p>
			 	<p>Runs scored     : {this.state.total_number_of_runs}</p>
			 	<p>Fifty Scored    : {this.state.fifty_scored}</p>
			 	<p>Hundred Scored  : {this.state.hundered_scored}</p>
			 	<p>Innings Played  : {this.state.innings_played}</p>
			 	<p>Highest Score   : {this.state.maximum_score} </p>
			</div>

		)
	}

}

export default BatCalculate;
