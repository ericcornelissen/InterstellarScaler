var __IS_cur_planetID = -1;

var __IS_acc_Sun = 274.00;
var __IS_acc_Mercury = 3.70;
var __IS_acc_Venus = 8.88;
var __IS_acc_Earth = 9.81;
var __IS_acc_Moon = 1.63;
var __IS_acc_Mars = 3.7;
var __IS_acc_Jupiter = 24.9;
var __IS_acc_Saturn = 10.50;
var __IS_acc_Uranus = 9.00;
var __IS_acc_Neptune = 11.20;
var __IS_acc_Pluto = 0.77;


$(document).ready(function() {
	$("body").on("DOMMouseScroll mousewheel", function (event) {
		if (__IS_cur_planetID != -1) {
			if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) {
				_Next()
			} else {
				_Prev()
			}
		}
	});
});


function _setWeigth() {
	var original = document.getElementById('weight').value;

	var weightSun = Math.round((__IS_acc_Sun / __IS_acc_Earth) * original * 100) / 100;
	var weightMercury = Math.round((__IS_acc_Mercury / __IS_acc_Earth) * original * 100) / 100;
	var weightVenus = Math.round((__IS_acc_Venus / __IS_acc_Earth) * original * 100) / 100;
	var weightMoon = Math.round((__IS_acc_Moon / __IS_acc_Earth) * original * 100) / 100;
	var weightMars = Math.round((__IS_acc_Mars / __IS_acc_Earth) * original * 100) / 100;
	var weightJupiter = Math.round((__IS_acc_Jupiter / __IS_acc_Earth) * original * 100) / 100;
	var weightSaturn = Math.round((__IS_acc_Saturn / __IS_acc_Earth) * original * 100) / 100;
	var weightUranus = Math.round((__IS_acc_Uranus / __IS_acc_Earth) * original * 100) / 100;
	var weightNeptune = Math.round((__IS_acc_Neptune / __IS_acc_Earth) * original * 100) / 100;
	var weightPluto = Math.round((__IS_acc_Pluto / __IS_acc_Earth) * original * 100) / 100;

	$("#sun .weight").text(weightSun);
	$("#mercury .weight").text(weightMercury);
	$("#venus .weight").text(weightVenus);
	$("#earth .weight").text(original);
	$("#moon .weight").text(weightMoon);
	$("#mars .weight").text(weightMars);
	$("#jupiter .weight").text(weightJupiter);
	$("#saturn .weight").text(weightSaturn);
	$("#uranus .weight").text(weightUranus);
	$("#neptune .weight").text(weightNeptune);
	$("#pluto .weight").text(weightPluto);

	$("ul li.up").removeClass("disabled");
	$("ul li.down").removeClass("disabled");
	$("ul li.menu").removeClass("disabled");
	$("ul li.grid").removeClass("disabled");


	$("#intro").addClass("hide");
	$("#earth .planet-info").removeClass("hide");

	__IS_cur_planetID = 4;
}

function _Next() {
	if (__IS_cur_planetID < 11) {
		// Animate background

		// Animate planet
		_setPlanets(__IS_cur_planetID + 1)
	}
}
function _Prev() {
	if (__IS_cur_planetID > 1) {
		// Animate background

		// Animate planet
		_setPlanets(__IS_cur_planetID - 1)
	}
}

function _setPlanets(ID) {
	if (ID != __IS_cur_planetID) {
		// Hide current planet
		if (ID > __IS_cur_planetID) {
			$(".current").removeClass("current").addClass("prev");
		$("#background").stop().animate({ "background-positionY": "-=100px" }, 1000);
		} else if (ID < __IS_cur_planetID) {
			$(".current").removeClass("current").addClass("next");
		$("#background").stop().animate({ "background-positionY": "+=100px" }, 1000);
		}

		// Enable 
		if (__IS_cur_planetID == 1) {
			$("ul li.up").removeClass("disabled");
		} else if (__IS_cur_planetID == 11) {
			$("ul li.down").removeClass("disabled");
		}

		// Show new planet
		switch(ID) {
			case 1: // Sun
				$("#mercury").removeClass("prev").addClass("next");

				$("#sun").removeClass("prev").addClass("current");
				$("ul li.up").addClass("disabled");
				break;
			case 2: // Mercury
				$("#sun").removeClass("next").addClass("prev");
				$("#venus").removeClass("prev").addClass("next");

				$("#mercury").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 3: // Venus
				$("#mercury").removeClass("next").addClass("prev");
				$("#earth").removeClass("prev").addClass("next");

				$("#venus").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 4: // Earth
				$("#venus").removeClass("next").addClass("prev");
				$("#moon").removeClass("prev").addClass("next");

				$("#earth").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 5: // Moon
				$("#earth").removeClass("next").addClass("prev");
				$("#mars").removeClass("prev").addClass("next");

				$("#moon").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 6: // Mars
				$("#moon").removeClass("next").addClass("prev");
				$("#jupiter").removeClass("prev").addClass("next");

				$("#mars").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 7: // Jupiter
				$("#mars").removeClass("next").addClass("prev");
				$("#saturn").removeClass("prev").addClass("next");

				$("#jupiter").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 8: // Saturn
				$("#jupiter").removeClass("next").addClass("prev");
				$("#uranus").removeClass("prev").addClass("next");

				$("#saturn").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 9: // Uranus
				$("#saturn").removeClass("next").addClass("prev");
				$("#neptune").removeClass("prev").addClass("next");

				$("#uranus").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 10: // Neptune
				$("#uranus").removeClass("next").addClass("prev");
				$("#pluto").removeClass("prev").addClass("next");

				$("#neptune").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 11: // Pluto
				$("#neptune").removeClass("next").addClass("prev");

				$("#pluto").removeClass("next").addClass("current");
				$("ul li.down").addClass("disabled");
				break;
		}

		__IS_cur_planetID = ID
		$("#menu").removeClass("show");
	}
}