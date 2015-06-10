var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
};
var w = 960 - margin.left - margin.right;
var h = 500 - margin.top - margin.bottom;
var dataset; //to hold full dataset
d3.csv("cases.csv", function(error, rates) {
    //read in the data
    if (error) return console.warn(error);
    rates.forEach(function(d) {
        d.year = d.Year;
        d.cases = d.Cases;
    });
    dataset = rates;
    console.log(dataset);
    drawVis(dataset);
});


var col = d3.scale.category20b();
var svg = d3.select("body").append("svg").attr("width", w + margin.left +
        margin.right).attr("height", h + margin.top + margin.bottom).append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var x = d3.scale.linear().domain([1975, 2015]).range([0, w]);
var y = d3.scale.linear().domain([400000, 1800000]).range([h, 0]);
var tooltip = d3.select("body").append("div").attr("class", "tooltip").style(
    "opacity", 0);
var patt = new RegExp("all");

var line = d3.svg.line().x(function(d) {
    return x(d.x);
}).y(function(d) {
    return y(d.y);
});

function drawVis(data) {
    var circles = svg.selectAll("circle").data(data).enter().append(
        "circle").attr("cx", function(d) {
        return x(d.year);
    }).attr("cy", function(d) {
        return y(d.cases);
    }).attr("r", 3).style("fill", function(d) {
        return col(1);
    });
}

var xAxis = d3.svg.axis().scale(x).tickFormat(d3.format("d"));
svg.append("g").attr("class", "axis").attr("transform", "translate(0," + h +
    ")").call(xAxis).append("text").attr("x", w / 2).attr("y", 35).style(
    "text-anchor", "middle").text("Year");
var yAxis = d3.svg.axis().scale(y).orient("left");
svg.append("g").attr("class", "axis").call(yAxis).append("text").attr(
    "transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style(
    "text-anchor", "end").text("BMI");
