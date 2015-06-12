$("#gender").change(function() {
	var gender = $("#gender").val();
	if(gender === "f") {
		$("#genstational").show();
	} else {
		$("#genstational").hide();
	}
});

$("#submit").click(function() {
	var age = $("#age").val();
	var gender = $("#gender").val();
	var genstational = $("input:radio[name=genstational]:checked").val();
	var dHistory = $("input:radio[name=diabetes]:checked").val();
	var hbp = $("input:radio[name=highbp]:checked").val();
	var active = $("input:radio[name=physical]:checked").val();
	var height = $("#height").val();
	var weight = $("#weight").val();
	var heights = [147.32, 149.86, 152.4, 154.94, 157.48, 160.02, 162.56, 165.1, 167.64, 170.18, 172.72, 175.26, 177.8, 180.34, 182.88, 185.42, 187.96, 190.5, 193.04];

	function dataCheck() {
		if(age === null || age === undefined) {
			$("#errorMessage").html("Please Select An Age");
			return false;
		} else if (gender === null || gender === undefined) {
			$("#errorMessage").html("Please Select A Gender");
			return false;
		} else if (height === null || height === undefined) {
			$("#errorMessage").html("Please Select A Height");
			return false;
		} else if (weight === null || Number(weight) <= 0 || weight === undefined) {
			$("#errorMessage").html("Please Enter A Valid Weight");
			return false;
		} else {
			return true;
		}
	}

	if(dataCheck()) {

		$("#errorMessage").empty();
		
		var formatAge = Number(age);
		var formatHeight = Number(height);
		var formatWeight = Number(weight);

		var score = 0;

		score += agePoints(formatAge);
		score += genderPoints();
		if(genstational !== null) {
			score += yesnoPoints(genstational);
		}
		score += yesnoPoints(dHistory);
		score += yesnoPoints(hbp);

		score += exercisePoints();
		score += heightweightpoints(formatWeight, formatHeight);

		results(score);

		$("#tallied").empty();
		$("#tallied").append("<h3>How your score was calculated:</h3>");
		var formatAge1 = Number(age);
		$("#tallied").append("<li>Age: " + agePoints(formatAge1) + " point(s)</li>");
		$("#tallied").append("<li>Gender: " + genderPoints() + " point(s)</li>");
		if(gender === "f") {
			$("#tallied").append("<li>Gestation Diabetes: " + yesnoPoints(genstational) + " point(s)</li>");
		}
		$("#tallied").append("<li>Diabetes History: " + yesnoPoints(dHistory) + " point(s)</li>");
		$("#tallied").append("<li>High Blood Pressure: " + yesnoPoints(hbp) + " point(s)</li>");
		$("#tallied").append("<li>Physical Activity: " + exercisePoints() + " point(s)</li>");
		var formatHeight2 = Number(height);
		var formatWeight2 = Number(weight);
		$("#tallied").append("<li>BMI: " + heightweightpoints(formatWeight2, formatHeight2) + " point(s)</li>");
	}

	function agePoints(age) {
		if(age === 0) {
			return 0;
		} else if(age === 1) {
			return 1;
		} else if(age === 2) {
			return 2;
		} else if(age === 3) {
			return 3;
		}
	}

	function genderPoints() {
		if(gender === "m") {
			return 1;
		} else {
			return 0;
		}
	}

	function exercisePoints() {
		if(active === "y") {
			return 0;
		} else {
			return 1;
		}

	}

	function yesnoPoints(input) {
		if(input === "y") {
			return 1;
		} else {
			return 0;
		}
	}

	function heightweightpoints(weight, height) {
		if(height === 0 && weight < 119) {
			return 0;
		} else if(height === 0 && weight >= 119 && weight <= 142) {
			return 1;
		} else if(height === 0 && weight >= 143 && weight <= 190) {
			return 2;
		} else if(height === 0 && weight > 191) {
			return 3;
		} else if(height === 1 && weight < 124) {
			return 0;
		} else if(height === 1 && weight >= 124 && weight <= 147) {
			return 1;
		} else if(height === 1 && weight >= 148 && weight <= 197) {
			return 2;
		} else if(height === 1 && weight > 198) {
			return 3;
		} else if(height === 2 && weight < 128) {
			return 0;
		} else if(height === 2 && weight >= 128 && weight <= 152) {
			return 1;
		} else if(height === 2 && weight >= 153 && weight <= 203) {
			return 2;
		} else if(height === 2 && weight > 204) {
			return 3;
		} else if(height === 3 && weight < 132) {
			return 0;
		} else if(height === 3 && weight >= 132 && weight <= 157) {
			return 1;
		} else if(height === 3 && weight >= 158 && weight <= 210) {
			return 2;
		} else if(height === 3 && weight > 211) {
			return 3;
		} else if(height === 4 && weight < 136) {
			return 0;
		} else if(height === 4 && weight >= 136 && weight <= 163) {
			return 1;
		} else if(height === 4 && weight >= 164 && weight <= 217) {
			return 2;
		} else if(height === 4 && weight > 218) {
			return 3;
		} else if(height === 5 && weight < 141) {
			return 0;
		} else if(height === 5 && weight >= 141 && weight <= 168) {
			return 1;
		} else if(height === 5 && weight >= 169 && weight <= 224) {
			return 2;
		} else if(height === 5 && weight > 225) {
			return 3;
		} else if(height === 6 && weight < 145) {
			return 0;
		} else if(height === 6 && weight >= 145 && weight <= 173) {
			return 1;
		} else if(height === 6 && weight >= 174 && weight <= 231) {
			return 2;
		} else if(height === 6 && weight > 232) {
			return 3;
		} else if(height === 7 && weight < 150) {
			return 0;
		} else if(height === 7 && weight >= 150 && weight <= 179) {
			return 1;
		} else if(height === 7 && weight >= 180 && weight <= 239) {
			return 2;
		} else if(height === 7 && weight > 240) {
			return 3;
		} else if(height === 8 && weight < 155) {
			return 0;
		} else if(height === 8 && weight >= 155 && weight <= 185) {
			return 1;
		} else if(height === 8 && weight >= 186 && weight <= 246) {
			return 2;
		} else if(height === 8 && weight > 247) {
			return 3;
		} else if(height === 9 && weight < 159) {
			return 0;
		} else if(height === 9 && weight >= 159 && weight <= 190) {
			return 1;
		} else if(height === 9 && weight >= 191 && weight <= 254) {
			return 2;
		} else if(height === 9 && weight > 255) {
			return 3;
		} else if(height === 10 && weight < 164) {
			return 0;
		} else if(height === 10 && weight >= 164 && weight <= 196) {
			return 1;
		} else if(height === 10 && weight >= 197 && weight <= 260) {
			return 2;
		} else if(height === 10 && weight > 262) {
			return 3;
		} else if(height === 11 && weight < 169) {
			return 0;
		} else if(height === 11 && weight >= 169 && weight <= 202) {
			return 1;
		} else if(height === 11 && weight >= 203 && weight <= 269) {
			return 2;
		} else if(height === 11 && weight > 270) {
			return 3;
		} else if(height === 12 && weight < 174) {
			return 0;
		} else if(height === 12 && weight >= 174 && weight <= 208) {
			return 1;
		} else if(height === 12 && weight >= 209 && weight <= 277) {
			return 2;
		} else if(height === 12 && weight > 278) {
			return 3;
		} else if(height === 13 && weight < 179) {
			return 0;
		} else if(height === 13 && weight >= 179 && weight <= 214) {
			return 1;
		} else if(height === 13 && weight >= 215 && weight <= 285) {
			return 2;
		} else if(height === 13 && weight > 286) {
			return 3;
		} else if(height === 14 && weight < 184) {
			return 0;
		} else if(height === 14 && weight >= 184 && weight <= 220) {
			return 1;
		} else if(height === 14 && weight >= 121 && weight <= 293) {
			return 2;
		} else if(height === 14 && weight > 294) {
			return 3;
		} else if(height === 15 && weight < 189) {
			return 0;
		} else if(height === 15 && weight >= 189 && weight <= 226) {
			return 1;
		} else if(height === 15 && weight >= 227 && weight <= 301) {
			return 2;
		} else if(height === 15 && weight > 302) {
			return 3;
		} else if(height === 16 && weight < 194) {
			return 0;
		} else if(height === 16 && weight >= 194 && weight <= 232) {
			return 1;
		} else if(height === 16 && weight >= 233 && weight <= 310) {
			return 2;
		} else if(height === 16 && weight > 311) {
			return 3;
		} else if(height === 17 && weight < 200) {
			return 0;
		} else if(height === 17 && weight >= 200 && weight <= 239) {
			return 1;
		} else if(height === 17 && weight >= 240 && weight <= 318) {
			return 2;
		} else if(height === 17 && weight > 319) {
			return 3;
		} else if(height === 18 && weight < 205) {
			return 0;
		} else if(height === 18 && weight >= 205 && weight <= 245) {
			return 1;
		} else if(height === 18 && weight >= 246 && weight <= 327) {
			return 2;
		} else if(height === 18 && weight > 328) {
			return 3;
		}
	}

	function results(score) {
		$("#score").html("Your risk score is " + score);
		$("#max").html("Out of a maximum of 10 total points");

		if(score < 5) {
			$("#risk").html("Your risk level is low");
			$("#info-detail").html("Congrats, currently you risk for diabetes is low. However please consult a doctor or other health care professional for professional diagnosis and treatment of medical conditions.");
		} else {
			$("#risk").html("Your risk level is high");
			$("#info-detail").html("Currently your risk for diabetes is high and therefore at increased risk for diabetes. Please consult a doctor or other health care professional for professional diagnosis and treatment of medical conditions.");
		}

		$("#step4-risks").empty();


		$("#step4-risks").append("<h3>Your Risks:</h3>");

		if(age > 0) {
			$("#step4-risks").append("<li><b>Age:</b> You are at higher risk for diabetes the older you are</li>");
		}
		if(gender === "m") {
			$("#step4-risks").append("<li><b>Gender:</b> Men are more likely than women to have undiagnosed diabetes</li>");
		}
		if(dHistory === "y") {
			$("#step4-risks").append("<li><b>Diabetes History:</b> A family history of diabetes could contribute to your diabetes risk</li>");
		}
		if(hbp === "y") {
			$("#step4-risks").append("<li><b>High Blood Pressure:</b> Having high blood pressure contributes to your overall risk for diabetes</li>");
		}
		if(active === "n") {
			$("#step4-risks").append("<li><b>Physical Activity:</b> Being inactive can increase your risk for diabetes</li>");
		}
		if(genstational === "y") {
			$("#step4-risks").append("<li><b>Gestation Diabetes:</b> Women who have gestational diabetes have an increased risk of developing diabetes</li>");
		}

		if(heightweightpoints(formatWeight, formatHeight) > 0) {

			var height1 = heights[formatHeight];
			var weight1 = (formatWeight / 2.2046);

			var finalBmi = weight1/(height1/100*height1/100);
			$("#step4-risks").append("<li><b>BMI:</b> People with higher BMIs are at a higher risk. Your <i>BMI is " + Math.round(finalBmi) + "</i></li>");
		}
	}

});