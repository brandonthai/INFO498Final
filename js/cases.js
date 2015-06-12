var margin = {top:0, right:0, bottom:40, left:100},
    width  = 700,
    height = 200;

var svg = d3.select("#t2")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 " + width + " " + height);

var yScale = d3.scale.linear()
    .range([height - margin.top - margin.bottom, 0]);

var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width - margin.right - margin.left], .1);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

d3.csv("data/cases.csv", function(error, data){
    data = data.map(function(d){ 
        d["Cases"] = +d["Cases"];
        d["Year"] = +d["Year"]; 
        return d;
    });

    yScale.domain([0, d3.max(data, function(d){ return d["Cases"]; })]);

    xScale.domain(data.map(function(d){ return d["Year"]; }));

    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d){ return xScale(d["Year"]); })
        .attr("y", function(d){ return yScale(d["Cases"]); })
        .attr("height", 0)
        .attr("width", function(d){ return xScale.rangeBand(); })
        .transition()
        .delay(function (d, i) { return i*150; })
        .attr("y", function(d){ return yScale(d["Cases"]); })
        .attr("height", function(d){ return height - margin.top - margin.bottom - yScale(d["Cases"]); })

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis)
            .append('text')
            .attr('text-anchor', 'end')
            .attr('y', 10)
            .attr('transform', 'rotate(-90)')
            .text('# of new cases');

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
        .call(xAxis)
        // .append('text')
        //     .attr('text-anchor', 'end')
        //     .attr('x', 10)
        //     .text('# of new cases')
        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });

    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
})


