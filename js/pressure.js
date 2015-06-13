  var dataset;

  var bp_margin = {top: 20, right: 20, bottom: 30, left: 40},
      bp_width = 960 - bp_margin.left - bp_margin.right,
      bp_height = 450 - bp_margin.top - bp_margin.bottom;

  // setup x 
  var bp_xValue = function(d) { return d.age;}, // data -> value
      bp_xScale = d3.scale.linear().domain([21, 70]).range([0, bp_width]), // value -> display
      bp_xMap = function(d) { return bp_xScale(bp_xValue(d));}, // data -> display
      bp_xAxis = d3.svg.axis().scale(bp_xScale).orient("bottom");

  // setup y
  var bp_yValue = function(d) { return d.blood_pressure;}, // data -> value
      bp_yScale = d3.scale.linear().domain([30, 114]).range([bp_height, 0]), // value -> display
      bp_yMap = function(d) { return bp_yScale(bp_yValue(d));}, // data -> display
      bp_yAxis = d3.svg.axis().scale(bp_yScale).orient("left");

  // setup fill color
  var bp_cValue = function(d) { return d.blood_pressure;},
      bp_color = d3.scale.category10();

  // add the graph canvas to the body of the webpage
  var bp_svg = d3.select("#scatter").append("svg")
      .attr("width", bp_width + bp_margin.left + bp_margin.right)
      .attr("height", bp_height + bp_margin.top + bp_margin.bottom)
      .append("g")
      .attr("transform", "translate(" + bp_margin.left + "," + bp_margin.top + ")");

  // add the tooltip area to the webpage
  var bp_tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  // x-axis
  bp_svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + bp_height + ")")
      .call(bp_xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", bp_width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Age");

  // y-axis
  bp_svg.append("g")
      .attr("class", "y axis")
      .call(bp_yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Blood Pressure Level");

  d3.csv("diabetes.csv", function(error, data) {
    data.forEach(function(d) {
      d.pregnancies = +d.pregnancies;
      d.plasma_glucose = +d.plasma_glucose;
      d.blood_pressure = +d.blood_pressure;
      d.triceps_skin_thickness = +d.triceps_skin_thickness;
      d.insulin = +d.insulin;
      d.bmi = +d.bmi;
      d.diabetes_pedigree = +d.diabetes_pedigree;
      d.age = +d.age;
    });

    // don't want dots overlapping axis, so add in buffer to data domain
    bp_xScale.domain([d3.min(data, bp_xValue)-1, d3.max(data, bp_xValue)+1]);
    bp_yScale.domain([d3.min(data, bp_yValue)-1, d3.max(data, bp_yValue)+1]);

    dataset = data;
    drawGraph(data);
  });  

  function updateRange(first, second) {
      var newData = dataset.filter(function(d) {
        return d.blood_pressure >= first && d.blood_pressure <= second
      });
      drawGraph(newData);  
  }  

  function updateGraph(data) {
    var newData = dataset.filter(function(d) { return d.blood_pressure >= first && d.blood_pressure <= second });
    drawGraph(newData);  
  }

  // $(function() {
  //     $("#slider-range").slider({
  //       range: true,
  //       min: 0,
  //       max: 150,
  //       values: [0, 150],
  //       slide: function( event, ui ) {
  //           $("#amount").text(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
  //           updateRange(ui.values[ 0 ], ui.values[ 1 ]);
  //       }
  //     });
  // }); 

  function drawGraph(data) {
    d3.selectAll("circle").remove();    

    // draw dots
    bp_svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", bp_xMap)
        .attr("cy", bp_yMap)
        .style("fill", "red") 
        .on("mouseover", function(d) {
            bp_svg.append("line")
            .attr("x1", 0)
            .attr("x2", bp_xMap(d))
            .attr("y1", bp_yMap(d))
            .attr("y2", bp_yMap(d))
            .style("stroke-dasharray", ("3, 3"))
                    .style("stroke-opacity", 0.9)
                    .style("stroke", "blue")
                    .style("z-index", "100")
            bp_svg.append("line")
            .attr("x1", bp_xMap(d))
            .attr("x2", bp_xMap(d))
            .attr("y1", bp_height)
            .attr("y2", bp_yMap(d))
            .style("stroke-dasharray", ("3, 3"))
                    .style("stroke-opacity", 0.9)
                    .style("stroke", "blue")
                    .style("z-index", "100")
            bp_tooltip.transition()
                 .duration(200)
                 .style("opacity", .9);
            bp_tooltip.html("Age: " + bp_xValue(d) 
            + "<br>" + "Blood Pressure: " + bp_yValue(d))
                 .style("left", (d3.event.pageX + 10) + "px")
                 .style("top", (d3.event.pageY - 28) + "px")
                 .style("background-color: red")
        })
        .on("mouseout", function(d) {
          bp_svg.selectAll("line").remove()
            bp_tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
        });
  };

