
import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import '../../../App.css';

// using d3.js version 5.7.0

class Visualization extends React.Component{

	constructor(props){
		super(props)
		console.log('data', this.props.data);
	}

	render(){

		d3.select("#barChart").remove();
		const {data} = this.props;
	    let margin = {top: 20, right: 20, bottom: 30, left: 40};
	    let width = 760 - margin.left - margin.right;
    	let height = 540 - margin.top - margin.bottom;

	    let x = d3.scaleBand().range([0, width]).padding(0.1);
    	let y = d3.scaleLinear().range([height, 0]);

    	let div = d3.select("body").append("div")	
    	.attr("class", "tooltip")				
    	.style("opacity", 0);

    	let svg = d3.select("#visualization")
    			 .append("svg")
  		  		 .attr("width",  width)
    			 .attr("height", height)
    			 .attr("id", "barChart")
  				 .append("g")
    			 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    	x.domain(data.map(function(obj) { return obj.date; }));
    	y.domain([0, d3.max(data, function(obj) { return parseInt(obj.batting_score,10)})]).range([height, 0]);


    	 svg.append("g")
		 	  .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x))
		      .selectAll("text")
		      .attr("y", 0)
		      .attr("x", 9)
		      .attr("dy", ".35em")
		      .attr("transform", "rotate(90)")
		      .style("text-anchor", "start");

		 svg.append("g")
		 	   .attr("class", "y axis")
		       .call(d3.axisLeft(y))
		       .append("text")
		  	   .attr("transform", "rotate(-90)")
			   .attr("y", 6)
			   .attr("dy", ".71em")
			   .style("text-anchor", "end")
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
		                .duration(1000)		
		                .style("opacity", .9);		
		            div	.html(d.wickets + "<br/>"  + d.opposition + "<br/>" + 'in ' + d.ground + "<br/>" + d.date)	
		                .style("left", (d3.event.pageX) + "px")		
		                .style("top", (d3.event.pageY - 28) + "px");	
		            })	

		        .on("mouseout", function(d) {		
		            div.transition()		
		                .duration(800)		
		                .style("opacity", 0);	
		        })
	            .transition()
				.duration(500)
	      		.attr("x", function(d) { return x(d.date); })
	      		.attr("width", x.bandwidth())
	      		.attr("y", function(d) { return y(parseInt(d.batting_score,10)); })
	      		.attr("height", function(d) { return height - y(parseInt(d.batting_score,10)); })
		
				

		return(
			<div>
				<p>Data Visualization</p>
			</div>
		)
	}
}

export default Visualization;


