


import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import '../../../App.css';

// using d3.js version 5.7.0

class Bowlingvisualization extends React.Component{

	constructor(props){
		super(props)
		this.generate_chart = this.generate_chart.bind(this);
	}

	generate_chart(){

		d3.select("#bowChart").remove();
		let data = this.props.data;


		data.forEach((data) => {
		    data.runs_conceded = parseInt(data.runs_conceded,10);
			data.wickets 	   = parseInt(data.wickets,10);
		});

		console.log('Wickets', data);

	    let margin = {top: 20, right: 20, bottom: 30, left: 40};
	    let width = 860;
    	let height = 540 - margin.top - margin.bottom;

	    let x = d3.scaleBand().range([0, width]).padding(0.1);
    	let y = d3.scaleLinear().range([height, 0]);

    	let div = d3.select("body").append("div")	
    	.attr("class", "tooltip")				
    	.style("opacity", 0);

    	let svg = d3.select("#BowlingViz")
    			 .append("svg")
  		  		 .attr("width",  width)
    			 .attr("height", height)
    			 .attr("id", "bowChart")
  				 .append("g")
    			 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    	x.domain(data.map(function(obj) { return obj.date; }));
    	y.domain([0, d3.max(data, function(obj) { return parseInt(obj.wickets,10)})]).range([height, 0]);


    	svg.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x));

         svg.append("text")             
         .attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
         .style("text-anchor", "middle")
         .text("Date");

		 svg.append("g")
         .call(d3.axisLeft(y))
         
         svg.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 0 - margin.left)
         .attr("x",0 - (height / 2))
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .text("Wickets"); 

		 svg.selectAll(".bar")
	    	.data(data)
	    	.enter().append("rect")
	    		.attr("class", function(d) { 
		      		if(d.match_result == "won")
		      			return 'bar-won' 
		      		if(d.match_result == "lost")
		      			return 'bar-lost'
		      		else{
		      			return 'bar'
		      		}
	    		})
	    		.on("mouseover", function(d) {		
		            div.transition()		
		                .duration(10)		
		                .style("opacity", 1);		
		            div	.html( 'Wickets: ' +d.wickets + "<br/>" + d.opposition + "<br/>" + 'in ' + d.ground + "<br/>" + "on" + d.date)	
		                .style("left", (d3.event.pageX) + "px")		
		                .style("top", (d3.event.pageY - 28) + "px");	
		            })	

		        .on("mouseout", function(d) {		
		            div.transition()		
		                .duration(1000)		
		                .style("opacity", 0);	
		        })
	            .transition()
				.duration(500)
	      		.attr("x", function(d) { return x(d.date); })
	      		.attr("width", x.bandwidth())
	      		.attr("y", function(d) { return y(parseInt(d.wickets,10)); })
	      		.attr("height", function(d) { return height - y(parseInt(d.wickets,10)); })
	}

	componentDidMount(){
		this.generate_chart();	
	}

	render(){
		return(
			 <div>
			 	<p>{}</p>
			 </div>
		)
	}
}

export default Bowlingvisualization;


