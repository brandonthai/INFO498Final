var Scatter = function(sets) {
	var self = this
	defaults = {
	  width:600, 
	  height:400, 
	  radius:8,
	  padding:55, 
	  color:false,
	  yPosition:false, 
	  showX:false, 
	  showY:false, 
	  showTitle:false,
	}
	self.settings = $.extend(false, defaults, sets)
	self.circleFunc = function(circ) {
		circ
			.attr('cx', function(d) {return self.xScale(d.gdp)})
		  	.attr('cy', function(d) {
		  		return self.settings.yPosition == true ? self.yScale(d.ex) : self.yScale(self.yScale.domain()[0]) - self.settings.radius
		  	})
			.attr('r', self.settings.radius)
			.attr('fill', function(d) {
				return self.settings.color == true ? self.colorScale(d.region) : 'gray'
			})
			.style('opacity', '.8')
			.attr('class', 'entered')
			.attr('id', function(d) {return d.id})
			.attr('title', function(d) {return d.country})
	} 

	self.init()
}

 Scatter.prototype.init = function() {
 	var self = this
 	self.build()
 	self.addHovers()
 }

Scatter.prototype.setScales = function() {
	var self = this

	// Get min/max values for x
	var xMin = d3.min(self.settings.data, function(d ){return d.gdp})*.9
	var xMax = d3.max(self.settings.data, function(d ){return d.gdp})*1.05
  
	// Using a function for y
	var yMin = d3.min(self.settings.data, function(d ){return d.ex})*.95
	var yMax = d3.max(self.settings.data, function(d ){return d.ex})*1.05
  
	// Define the xScale
	self.xScale = d3.scale.log().domain([xMin, xMax]).range([0, self.settings.width])
 
	// Define the yScale
	self.yScale = d3.scale.linear().domain([yMin, yMax]).range([self.settings.height,0])
	
	// Define the xAxis
	self.xAxisFunction = d3.svg.axis()
	  .scale(self.xScale)
	  .orient('bottom')
	  .ticks(4)
	  
	// Define the yAxis
	self.yAxisFunction = d3.svg.axis()
	  .scale(self.yScale)
	  .orient('left')
	  .ticks(4)
	  
	// Color scale
	self.colorScale = d3.scale.category10()
	self.settings.uniqueRegions.map(function(d){self.colorScale(d)})
}  

// Function to build chart -- appends axes, then calls the draw function for the circle elements
Scatter.prototype.build =  function() {
	var self = this
	// Set scales
	self.setScales()
	
	// Append xAxis
	self.xAxis = d3.select('#scatter-svg').append('g').attr('class', 'axis')
	  .attr('transform', 'translate(' + (self.settings.padding) + ','+ (self.settings.height + self.settings.padding) + ')')
	  .call(self.xAxisFunction)
	  .style('opacity', self.settings.showX == true ? 1 : 0)
	  
	// Append yAxis
	self.yAxis = d3.select('#scatter-svg').append('g').attr('class', 'axis')
	  .attr('transform', 'translate(' + self.settings.padding + ',' + (self.settings.padding) + ')')
	  .call(self.yAxisFunction)
	  .style('opacity', self.settings.showY == true ? 1 : 0)
	  
	// Append G in which to draw the plot
	self.plotG = d3.select('#scatter-svg').append('g').attr('transform', 'translate(' + self.settings.padding + ',' + self.settings.padding + ')')
	
	// Draw legend
	self.drawLegend()
	
	// Draw axis labels
	self.drawAxisLabels()
	
	// Draw circles and axes
	self.settings.currData = []
	self.draw()
}
// Circle positioning function

// Draw function

Scatter.prototype.draw = function() {
	// Set the scales
	var self = this
	self.setScales()
	
	// Bind self.settings.data
	var circles = self.plotG.selectAll('circle').data(self.settings.currData, function(d) {return d.id})
	
	// Enter new elements
	circles.enter().append('circle').call(self.circleFunc).style('opacity', 0)
	
	// Exit elements that may have left
	circles.exit().attr('class', 'leaving').transition().duration(1000).style('opacity', 0).remove()
	
	// Transition all circles to new dself.settings.data
	self.plotG.selectAll('.entered').transition().duration(1500).call(self.circleFunc)
	
	// Axes
	self.xAxisLabel.style('opacity', self.settings.showX == true ? 1 : 0)
	self.yAxisLabel.style('opacity', self.settings.showY == true ? 1 : 0)
	self.xAxis.style('opacity', self.settings.showX == true ? 1 : 0)
	self.yAxis.style('opacity', self.settings.showY == true ? 1 : 0)
	self.legendG.style('opacity', self.settings.color == true ? 1 : 0)
	self.title.style('opacity', self.settings.showTitle == true ? 1 : 0)
	
}	

// Draw axis labels
Scatter.prototype.drawAxisLabels = function() {
	var self = this
	// xAxisLabel
	self.xAxisLabel = d3.select('#scatter-svg').append('text').attr('transform', 'translate(' + self.settings.width/2 + ',' + (self.settings.height + self.settings.padding*2) + ')').text('Income Per Person').attr('class', 'axis-label')
		.style('opacity', self.settings.showX == true ? 1 : 0)
	
	// yAxisLabel
	self.yAxisLabel = d3.select('#scatter-svg').append('text').attr('transform', 'translate(' + self.settings.padding/4 + ',' + (self.settings.height - 40) + ') rotate(270)').text('Life expectancy (years)').attr('class', 'axis-label')
		.style('opacity', self.settings.showX == true ? 1 : 0)
	
	// title
	self.title = d3.select('#scatter-svg').append('text').text('Income per Capita and Life Expectancy').attr('class', 'title')
		.attr('transform', 'translate(' + (self.settings.padding + 30) + ',' + (30) + ')')
		.style('opacity', self.settings.showTitle == true ? 1 : 0)
}

// Legend function
Scatter.prototype.drawLegend = function() {
	var self = this

	// Append a legend G
	self.legendG = d3.select('#scatter-svg').append('g').attr('id', 'legendG').attr('transform', 'translate(' + (510) + ',' + 350 + ')')
		.style('opacity', self.settings.color == true ? 1 : 0)
	
	self.legendG.selectAll('text')
		.data(self.settings.uniqueRegions)
		.enter().append('text')
		.text(function(d) {return d})
		.attr('transform', function(d,i) {return 'translate(0, ' + i*20 + ')'})
		.style('fill', function(d) {return self.colorScale(d)})
}



// update
Scatter.prototype.update = function(index) {
	var self = this
	switch(index) {
		case 0: 
			self.settings.showTitle = false
			break;
		case 1:
			self.settings.showTitle = true
			self.settings.currData = []
			self.settings.showX = false
			break;
		case 2:
			self.settings.currData = self.settings.data.filter(function(d) {return d.id == 'UG'})
			self.settings.showX = true
			break;
		case 3:
			self.settings.currData = self.settings.data.filter(function(d) {return d.region == 'Sub-Saharan Africa'})
			self.settings.yPosition = false
			self.settings.showY = false
			break;
		case 4:
			self.settings.currData = self.settings.data.filter(function(d) {return d.region == 'Sub-Saharan Africa'})
			self.settings.yPosition = true
			self.settings.showY = true
			break;
		case 5:
			self.settings.currData = self.settings.data
			self.settings.color = false
			break;
		case 6:
			self.settings.color = true
			break;
	}
	self.draw()
	if(index == 2) setTimeout(function() {
		$('#UG').tipsy('hide')
		$('#UG').tipsy({trigger:'manual', gravity:'w'})
		$('#UG').tipsy('show')
	}, 1500)
	else {$('#UG').tipsy('hide')}
} 

Scatter.prototype.addHovers = function () {
	var self = this
	 $('circle').tipsy({ 
        gravity: 'w', 
        html: true, 
        live:true,
        title: function() {
        	var dat = this.__data__
        	var formatter = d3.format('.2s')
			var text = ''
			text += '<b style="text-decoration:underline">' + dat.country + '</b><br/>'
			text +='<b>Income per person</b>:$' + formatter(dat.gdp) + '<br/>'
			if(self.settings.yPosition == true) text +='<b>Life Expectancy</b>:' + dat.ex
			return text
        }
      });
}
