var __IS_cur_planetID = 4; // Earth
var __IS_cur_page = 0; // 0 = Intro; 1 = Planets; 2 = List
var __IS_planetNames = new Array(12, "sun", "mercury", "venus", "earth", "moon", "mars", "ceres", "jupiter", "saturn", "uranus", "neptune", "pluto");

$(document).ready(function() {
	// Listeners
	$('input').keypress(function() { return event.charCode == 46 || event.charCode >= 48 && event.charCode <= 57; });

	$('nav ul li.up').click(function() { _Prev(); });
	$('nav ul li.down').click(function() { _Next(); });
	$('nav ul li.grid').click(function() { _toggleGrid(); });

	$("#weight").keypress(function() { if (event.which == 13) { _initialLoad(); } });
	$("#explore").click(function() { _initialLoad(); });

	$('#planets .planet-info h2, #planets .planet-info p').double_click(function () {
		if (typeof __IS_cur_planetID == 'number' && __IS_cur_planetID > 0 && __IS_cur_planetID < 13) {
			$('#' + __IS_planetNames[__IS_cur_planetID] + ' p').toggleClass('hide');
			$('#' + __IS_planetNames[__IS_cur_planetID] + ' input').toggleClass('hide');
		}
	});
	$("#planets .planet-info .input").keypress(function() { if (event.which == 13) {
		_setWeight($('#planets #' + __IS_planetNames[__IS_cur_planetID] + ' .planet-info .input').val(),
			__IS_planetNames[__IS_cur_planetID]);

		$('#' + __IS_planetNames[__IS_cur_planetID] + ' p').removeClass('hide');
		$('#' + __IS_planetNames[__IS_cur_planetID] + ' input').addClass('hide');
		$('#planets #' + __IS_planetNames[__IS_cur_planetID] + ' .planet-info .input').val('');
	} });
	$('#planets .planet-info .go').click(function(){
		_setWeight($('#planets #' + __IS_planetNames[__IS_cur_planetID] + ' .planet-info .input').val(),
			__IS_planetNames[__IS_cur_planetID]);

		$('#' + __IS_planetNames[__IS_cur_planetID] + ' p').removeClass('hide');
		$('#' + __IS_planetNames[__IS_cur_planetID] + ' input').addClass('hide');
		$('#planets #' + __IS_planetNames[__IS_cur_planetID] + ' .planet-info .input').val('');
	});
	
	$('#btt-info').click(function(){
		$('#science').addClass('hide'); $('#info').removeClass('hide');
		$('#btt-info').addClass('disable'); $('#btt-science').removeClass('disable');
	});
	$('#btt-science').click(function(){
		$('#info').addClass('hide'); $('#science').removeClass('hide');
		$('#btt-science').addClass('disable'); $('#btt-info').removeClass('disable');
	});

	$('.tile').click(function(e) { _toggleGrid(); _setPlanets(parseInt(e.currentTarget.id)); });


	// Scroll through planets when the users scrolls over the page
	$('body').on('DOMMouseScroll mousewheel', function (event) {
		if (__IS_cur_page == 1) {
			if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) {
				_Next();
			} else {
				_Prev();
			}
		}
	});
});

function _initialLoad() {
	if (_setWeight(document.getElementById('weight').value, 'earth') != -1) {
		// Enable menu
		$("ul li.up").removeClass("disable");
		$("ul li.down").removeClass("disable");
		$("ul li.grid").removeClass("disable");

		// Hide intro
		$("#intro").addClass("hide");
		$("#earth").removeClass("intro-hide");
		$("#earth .planet-info").removeClass("hide");

		__IS_cur_page = 1; // Set current page
	} else {
		$("#weight").addClass("error"); // Make the text of the input red
	}
}
function _toggleGrid() {
	if (__IS_cur_page == 1) {
		$("#planets").addClass("hide");
		$("#menu").removeClass("hide");
		$("ul li.up").addClass("disable");
		$("ul li.down").addClass("disable");

		__IS_cur_page = 2;
	} else {
		$("#planets").removeClass("hide");
		$("#menu").addClass("hide");
		if (__IS_cur_planetID != 1) {
			$("ul li.up").removeClass("disable");
		}
		if (__IS_cur_planetID != 12) {
			$("ul li.down").removeClass("disable");
		}

		__IS_cur_page = 1;
	}
}

function _setWeight(nWeight, sBasePlanet) {
	var weight = new ISweight(nWeight);
	if (weight.success == true) {
		_IS_setBasePlanet(sBasePlanet); // Set base planet to convert weights FROM

		// Convert weights per planet
		$("#sun .weight").text(weight.toSun());
		$("#mercury .weight").text(weight.toMercury());
		$("#venus .weight").text(weight.toVenus());
		$("#earth .weight").text(weight.toEarth());
		$("#moon .weight").text(weight.toMoon());
		$("#mars .weight").text(weight.toMars());
		$("#ceres .weight").text(weight.toCeres());
		$("#jupiter .weight").text(weight.toJupiter());
		$("#saturn .weight").text(weight.toSaturn());
		$("#uranus .weight").text(weight.toUranus());
		$("#neptune .weight").text(weight.toNeptune());
		$("#pluto .weight").text(weight.toPluto());
	} else {
		return -1;
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

		// Hide current planet input
		$('#' + __IS_planetNames[__IS_cur_planetID] + ' p').removeClass('hide');
		$('#' + __IS_planetNames[__IS_cur_planetID] + ' input').addClass('hide');

		// Enable
		if (__IS_cur_planetID == 1) {
			$("nav ul li.up").removeClass("disable");
		} else if (__IS_cur_planetID == 12) {
			$("nav ul li.down").removeClass("disable");
		}

		// Show new planet
		switch(ID) {
			case 1: // Sun
				$("#mercury").removeClass("prev").addClass("next");

				$("#sun").removeClass("prev").addClass("current");
				$("nav ul li.up").addClass("disable");
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
				$("nav ul li.down").addClass("disable");
				break;
		}

		__IS_cur_planetID = ID
	}
}
function _Next() { if (__IS_cur_planetID < 12) { _setPlanets(__IS_cur_planetID + 1) } }
function _Prev() { if (__IS_cur_planetID > 1) { _setPlanets(__IS_cur_planetID - 1) } }


// Author:  Jacek Becela
// Source:  http://gist.github.com/399624
// License: MIT
jQuery.fn.double_click = function(double_click_callback, timeout) {
	return this.each(function(){
		var clicks = 0, self = this;
		jQuery(this).click(function(event){
			clicks++;
			if (clicks == 1) {
				setTimeout(function(){
					if(clicks != 1) {
						double_click_callback.call(self, event);
					}
					clicks = 0;
				}, timeout || 300);
			}
		});
	});
}