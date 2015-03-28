var __IS_cur_planetID = 4; // Earth
var __IS_cur_page = 0; // 0 = Intro; 1 = Planets; 2 = List

$(document).ready(function() {
	// Use the enter key to select your weight in the intro screen
	$("#weight").keypress(function() { if (event.which == 13) { _setWeigth(); } });

	// Scroll through planets when the users scrolls over the page
	$("body").on("DOMMouseScroll mousewheel", function (event) {
		if (__IS_cur_page == 1) {
			if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) {
				_Next();
			} else {
				_Prev();
			}
		}
	});
});

function _toggleGrid() {
	if (__IS_cur_page == 1) {
		$("#planets").addClass("hide");
		$("#menu").removeClass("hide");
		$("ul li.up").addClass("disabled");
		$("ul li.down").addClass("disabled");

		__IS_cur_page = 2;
	} else {
		$("#planets").removeClass("hide");
		$("#menu").addClass("hide");
		if (__IS_cur_planetID != 1) {
			$("ul li.up").removeClass("disabled");
		}
		if (__IS_cur_planetID != 12) {
			$("ul li.down").removeClass("disabled");
		}

		__IS_cur_page = 1;
	}
}

function _setWeigth() {
	var iWeight = parseInt(document.getElementById("weight").value);
	if (isNaN(iWeight) == false) { // 'iWeight' is NaN when the value is invalid
		$("#sun .weight").text(_IS_convertWeight(iWeight, "earth", "sun"));
		$("#mercury .weight").text(_IS_convertWeight(iWeight, "earth", "mercury"));
		$("#venus .weight").text(_IS_convertWeight(iWeight, "earth", "venus"));
		$("#earth .weight").text(iWeight);
		$("#moon .weight").text(_IS_convertWeight(iWeight, "earth", "moon"));
		$("#mars .weight").text(_IS_convertWeight(iWeight, "earth", "mars"));
		$("#ceres .weight").text(_IS_convertWeight(iWeight, "earth", "ceres"));
		$("#jupiter .weight").text(_IS_convertWeight(iWeight, "earth", "jupiter"));
		$("#saturn .weight").text(_IS_convertWeight(iWeight, "earth", "saturn"));
		$("#uranus .weight").text(_IS_convertWeight(iWeight, "earth", "uranus"));
		$("#neptune .weight").text(_IS_convertWeight(iWeight, "earth", "neptune"));
		$("#pluto .weight").text(_IS_convertWeight(iWeight, "earth", "pluto"));

		$("ul li.up").removeClass("disabled");
		$("ul li.down").removeClass("disabled");
		$("ul li.grid").removeClass("disabled");

		$("#intro").addClass("hide");
		$("#earth").removeClass("intro-hide");
		$("#earth .planet-info").removeClass("hide");

		__IS_cur_page = 1;
	} else {
		$("#weight").addClass("error"); // Make the text of the input red
	}
}
function _setPlanets(ID) {
	if (ID != __IS_cur_planetID) {
		// Hide current planet
		if (ID > __IS_cur_planetID) {
			$(".current").removeClass("current").addClass("prev");
			$("body").stop().animate({ "background-positionY": "-=100px" }, 1000);
		} else if (ID < __IS_cur_planetID) {
			$(".current").removeClass("current").addClass("next");
			$("body").stop().animate({ "background-positionY": "+=100px" }, 1000);
		}

		// Enable
		if (__IS_cur_planetID == 1) {
			$("ul li.up").removeClass("disabled");
		} else if (__IS_cur_planetID == 12) {
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
				$("#ceres").removeClass("prev").addClass("next");

				$("#mars").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 7: // Ceres
				$("#mars").removeClass("next").addClass("prev");
				$("#jupiter").removeClass("prev").addClass("next");

				$("#ceres").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 8: // Jupiter
				$("#ceres").removeClass("next").addClass("prev");
				$("#saturn").removeClass("prev").addClass("next");

				$("#jupiter").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 9: // Saturn
				$("#jupiter").removeClass("next").addClass("prev");
				$("#uranus").removeClass("prev").addClass("next");

				$("#saturn").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 10: // Uranus
				$("#saturn").removeClass("next").addClass("prev");
				$("#neptune").removeClass("prev").addClass("next");

				$("#uranus").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 11: // Neptune
				$("#uranus").removeClass("next").addClass("prev");
				$("#pluto").removeClass("prev").addClass("next");

				$("#neptune").removeClass("next").removeClass("prev").addClass("current");
				break;
			case 12: // Pluto
				$("#neptune").removeClass("next").addClass("prev");

				$("#pluto").removeClass("next").addClass("current");
				$("ul li.down").addClass("disabled");
				break;
		}

		__IS_cur_planetID = ID
		$("#menu").removeClass("show");
	}
}
function _Next() { if (__IS_cur_planetID < 12) { _setPlanets(__IS_cur_planetID + 1) } }
function _Prev() { if (__IS_cur_planetID > 1) { _setPlanets(__IS_cur_planetID - 1) } }