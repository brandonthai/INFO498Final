var datas = [["Nuts", -0.27], ["Coffee", -0.11], ["White Rice", 0.17], ["Sugary Drinks", 0.26], ["Yogurt", -0.27], ["Brown Rice", 0.11], ["Fruit Drinks", -0.31], ["Red Meat (3 oz)", 0.20], ["Bacon (2 slices)", 0.51], ["Hot Dog", 0.51], ["Poultry", 0.35], ["Fish", -0.35], ["Fast Food", 0.27], ["Dairy", -0.23], ["TV (2 hours)", 0.20], ["Walking (1/2 hour)", -0.30], ["Smoking", 0.50]];

$(".checkbox").change(function() {
  var data = new Array();
  if($('#one').is(":checked")) {
      data.push(["Nuts",-0.27]);
  }
  if($('#two').is(":checked")){
      data.push(datas[1]);
  }
  if($('#three').is(":checked")){
      data.push(datas[2]);
  }
  if($('#four').is(":checked")){
      data.push(datas[3]);
  }
  if($('#five').is(":checked")){
      data.push(datas[4]);
  }
  if($('#six').is(":checked")){
      data.push(datas[5]);
  }
  if($('#seven').is(":checked")){
      data.push(datas[6]);
  }
  if($('#eight').is(":checked")){
      data.push(datas[7]);
  }
  if($('#nine').is(":checked")){
      data.push(datas[8]);
  }
  if($('#ten').is(":checked")){
      data.push(datas[9]);
  }
  if($('#eleven').is(":checked")){
      data.push(datas[10]);
  }
  if($('#tweleve').is(":checked")){
      data.push(datas[11]);
  }
  if($('#thirteen').is(":checked")){
      data.push(datas[12]);
  }
  if($('#fourteen').is(":checked")){
      data.push(datas[13]);
  }
  if($('#fifteen').is(":checked")){
      data.push(datas[14]);
  }
  if($('#sixteen').is(":checked")){
      data.push(datas[15]);
  }
  if($('#seventeen').is(":checked")){
      data.push(datas[16]);
  } 

  var n = $("input:checkbox:checked").length;
  if( n > 1) {
    d3.select("#barchart")
    .datum(data)
      .call(columnChart()
        .width(775)
        .height(450)
        .x(function(d, i) { return d[0]; })
        .y(function(d, i) { return d[1]; }));
  }
});