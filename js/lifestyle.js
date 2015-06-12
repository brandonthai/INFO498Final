var datas = [
    ["Nuts", -0.27, "Nuts will lower your glycemic index, which is a measurement of how fast your body absorbs certain carbohydrates"], 
    ["Coffee", -0.11, "There is ongoing research that the caffeine in coffee may increase insulin resistence"],
    ["White Rice", 0.17, "White rice has a high glycemic index and cause your blood sugar levels to peak quicker than other carbohydrates"],
    ["Sugary Drinks", 0.26, "These drinks are not only bad for your diabetes but for general health. Too much sugar!"],
    ["Yogurt", -0.27, "Ongoing research shows that the probiotics in yogurt reduces intestinal inflammation and regulates appetite control"],
    ["Brown Rice", 0.11, "Brown rice helps stabilizes blood sugar levels. Consuming 1/2 cup of rice daily to experience the health benefits"],
    ["Fruit Drinks", -0.31, "Processed sugar and high fructose corn syrups are the worst drinks for you health. Hydrate yourselves with water!"], 
    ["Red Meat (3 oz)", 0.20, "Too much red meat can increase the risk of developing Type II Diabetes by 20 percent"], 
    ["Bacon (2 slices)", 0.51, "Bacon provides excessive calories with little or no nutrition"], 
    ["Hot Dog", 0.51, "Similar to bacon, fatty foods and processed meats provide no nutritional value to your diet"], 
    ["Poultry", 0.35, "Poultry is a versatile, lean protein product"], 
    ["Fish", -0.35, "A low source of unhealthy saturated fats, cholesterol, and plenty of omega-3 fatty acids"], 
    ["Fast Food", 0.27, "McDonalds, need I say more?"],
    ["Dairy", -0.23, "Similar to yogurt, the probiotics kick in to increase your insulin levels"], 
    ["TV (2 hours)", 0.20, "Sitting on the couch all day means no calories are burned"], 
    ["Walking (1/2 hour)", -0.30, "An easy excercise easy on the joints and effective in lowering your blood sugar levels"], 
    ["Smoking", 0.50, "Smoking not only affects Type II Diabetes but can lead to Heart and kidney disease and Retionopathy (blindness)"]];

$(".checkbox").change(function() {
  var data = new Array();
  if($('#one').is(":checked")) {
      data.push(["Nuts",-0.27, "Nuts will lower your glycemic index, which is a measurement of how fast your body absorbs certain carbohydrates"]);
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