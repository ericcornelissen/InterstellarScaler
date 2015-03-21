var __IS_cur_planetID = 4;

var __IS_acc_Sun = 274.00;
var __IS_acc_Mercury = 3.70;
var __IS_acc_Venus = 8.88;
var __IS_acc_Earth = 9.81;
var __IS_acc_Moon = 1.63;

function _Next() {
	if (__IS_cur_planetID < 5) {
		// Animate background
		$("#background").animate({ "background-positionY": "-=100px" }, 1000);

		// Animate planet
		__IS_cur_planetID += 1;
		_Planets()
	}
}
function _Prev() {
	if (__IS_cur_planetID > 1) {
		// Animate background
		$("#background").animate({ "background-positionY": "+=100px" }, 1000);

		// Animate planet
		__IS_cur_planetID -= 1;
		_Planets()
	}
}


function _setWeigth() {
	var original = document.getElementById('weight').value;

	var weightSun = Math.round((__IS_acc_Sun / __IS_acc_Earth) * original * 100) / 100;
	var weightMercury = Math.round((__IS_acc_Mercury / __IS_acc_Earth) * original * 100) / 100;
	var weightVenus = Math.round((__IS_acc_Venus / __IS_acc_Earth) * original * 100) / 100;
	var weightMoon = Math.round((__IS_acc_Moon / __IS_acc_Earth) * original * 100) / 100;

	$("#sun .weight").text(weightSun);
	$("#mercury .weight").text(weightMercury);
	$("#venus .weight").text(weightVenus);
	$("#earth .weight").text(original);
	$("#moon .weight").text(weightMoon);

	$("#intro").hide();
}


function _Planets() {
	switch(__IS_cur_planetID) {
		case 1:
			$("#mercury").removeClass("current").addClass("next")

			$("#sun").removeClass("next").removeClass("prev").addClass("current")
			break;
		case 2:
			$("#sun").removeClass("current").addClass("prev")
			$("#venus").removeClass("current").addClass("next")

			$("#mercury").removeClass("next").removeClass("prev").addClass("current")
			break;
		case 3:
			$("#mercury").removeClass("current").addClass("prev")
			$("#earth").removeClass("current").addClass("next")

			$("#venus").removeClass("next").removeClass("prev").addClass("current")
			break;
		case 4:
			$("#venus").removeClass("current").addClass("prev")
			$("#moon").removeClass("current").addClass("next")

			$("#earth").removeClass("next").removeClass("prev").addClass("current")
			break;
		case 5:
			console.log('moon');
			$("#moon").removeClass("next").addClass("current")
			$("#earth").removeClass("current").addClass("prev")
			break;
	}
}