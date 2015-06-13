var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
};
var w = 960 - margin.left - margin.right;
var h = 500 - margin.top - margin.bottom;
var dataset; //to hold full dataset
d3.csv("data/bmiuse.csv", function(error, rates) {
    //read in the data
    if (error) return console.warn(error);
    rates.forEach(function(d) {
        d.year = d.Year;
        d.sex = d.Sex;
        d.average = d.Average;
    });
    dataset = rates;
    drawVis(dataset);
});


var col = d3.scale.category10();
var bmi_svg = d3.select("#bmig").append("svg").attr("width", w + margin.left +
        margin.right).attr("height", h + margin.top + margin.bottom).append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    bmi_svg.append("rect")
    .attr("width", "100%")
    .attr("height", "110")
    .attr("y", "0")
    .attr("fill", "#FFA7A7")
    .attr("opacity", ".5");

    bmi_svg.append("rect")
    .attr("width", "100%")
    .attr("height", "120")
    .attr("y", "110")
    .attr("fill", "#FFFFD6")
    .attr("opacity", ".9");

    bmi_svg.append("rect")
    .attr("width", "100%")
    .attr("height", "140")
    .attr("y", "230")
    .attr("fill", "#C1E6C3")
    .attr("opacity", ".5");

    bmi_svg.append("rect")
    .attr("width", "100%")
    .attr("height", "80")
    .attr("y", "370")
    .attr("fill", "gray")
    .attr("opacity", ".2");

var x = d3.scale.linear().domain([1975, 2015]).range([0, w]);
var y = d3.scale.linear().domain([15, 35]).range([h, 0]);
var tooltip = d3.select("body").append("div").attr("class", "tooltip").style(
    "opacity", 0);
var patt = new RegExp("all");

var line = d3.svg.line().x(function(d) {
    return x(d.x);
}).y(function(d) {
    return y(d.y);
});

function drawVis(data) {
    var circles = bmi_svg.selectAll("circle").data(data).enter().append(
        "circle").attr("cx", function(d) {
        return x(d.year);
    }).attr("cy", function(d) {
        return y(d.average);
    }).attr("r", 4).style("fill", function(d) {
        return col(d.sex);
    })
    .on("mouseover", function(d) {

            bp_tooltip.transition()
                 .duration(200)
                 .style("opacity", .9);
            bp_tooltip.html("Sex: " + d.sex 
            + "<br>" + "BMI: " + d.average)
                 .style("left", (d3.event.pageX + 10) + "px")
                 .style("top", (d3.event.pageY) + "px")
                 .style("background-color: red")
        })
        .on("mouseout", function(d) {
            bp_tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
        });
}

var xAxis = d3.svg.axis().scale(x).tickFormat(d3.format("d"));
bmi_svg.append("g").attr("class", "axis").attr("transform", "translate(0," + h +
    ")").call(xAxis).append("text").attr("x", w / 2).attr("y", 30).style(
    "text-anchor", "middle").text("Year").attr("font-size", "125%");
var yAxis = d3.svg.axis().scale(y).orient("left");
bmi_svg.append("g").attr("class", "axis").call(yAxis).append("text").attr(
    "transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style(
    "text-anchor", "end").text("BMI").attr("font-size", "125%");



var userHeight;
var userWeight;
// var userSex = "Male";

$("#bmisubmit").click(function() {
    userHeight = $("#uHeight").val();
    userWeight = $("#uWeight").val();

    var userBmi = userWeight / (userHeight * userHeight) * 703;

   bmi_svg.append("circle")
        .attr("cx", function(d) {
            return x(2015);
        })
        .attr("cy", function(d) {
            return y(userBmi);
        })
        .attr("id", "inp")
        .attr("r", 5)
        .style("fill", "black")
        .on("mouseover", function(d) {

            bp_tooltip.transition()
                 .duration(200)
                 .style("opacity", .9);
            bp_tooltip.html("BMI: " + userBmi.toFixed(2))
                 .style("left", (d3.event.pageX + 10) + "px")
                 .style("top", (d3.event.pageY) + "px")
        })
        .on("mouseout", function(d) {
            bp_tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
        });
})


$("#bmireset").click(function() {
    bmi_svg.selectAll("#inp").remove()
});