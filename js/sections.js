// Set last step height
var height = $('.step:last').height()
var marginBottom = parseInt($('.step:last').css('margin-bottom'))
var newHeight = $(window).height() - height - marginBottom
$('.step:last').height(newHeight)

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function(index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity',  function(d,i) { return i == index ? 1 : 0.1; });

    // activate current section
    // plot.activate(index);
    scatter.update(index)
  });

  scroll.on('progress', function(index, progress){

  });