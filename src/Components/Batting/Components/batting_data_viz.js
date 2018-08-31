
import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import '../../../App.css';

// using d3.js version 5.7.0

class Battingvisualization extends React.Component{

	constructor(props){
		super(props)
	}

	render(){

		d3.select("#batChart").remove();
		let data = this.props.data;

		data = data.filter((data)=>{

			data.batting_score = parseInt(data.batting_score,10);
			return true;
		})

	    let margin = {top: 20, right: 20, bottom: 30, left: 40};
	    let width = 860;
    	let height = 540 - margin.top - margin.bottom;

	    let x = d3.scaleBand().range([0, width]).padding(0.1);
    	let y = d3.scaleLinear().range([height, 0]);

    	let div = d3.select("body").append("div")	
    	.attr("class", "tooltip")				
    	.style("opacity", 0);

    	let svg = d3.select("#BattingViz")
    			 .append("svg")
  		  		 .attr("width",  width)
    			 .attr("height", height)
    			 .attr("id", "batChart")
  				 .append("g")
    			 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    	x.domain(data.map(function(obj) { return obj.date; }));
    	y.domain([0, d3.max(data, function(obj) { return parseInt(obj.batting_score,10)})]).range([height, 0]);


    	 svg.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x));
         
		 svg.append("g")
         .call(d3.axisLeft(y))
         
         svg.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 0 - margin.left)
         .attr("x",0 - (height / 2))
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .text("Runs"); 


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
		            div	.html("Score :" + d.batting_score + "<br/>" + d.opposition + "<br/>" + 'IN ' + d.ground + "<br/>" + "ON " + d.date)	
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
	      		.attr("y", function(d) { return y(parseInt(d.batting_score,10)); })
	      		.attr("height", function(d) { return height - y(parseInt(d.batting_score,10)); })
		
		return(
			 <div>
			 </div>
		)
	}
}

export default Battingvisualization;


