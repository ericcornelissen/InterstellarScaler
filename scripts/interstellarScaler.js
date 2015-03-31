/*	UDF Information:
	
	Name: InterstellarScaler.js
	Description: Convert what something weighs on one planet to what it will weigh on anohter planet.
					Science Alert: Note that, even though the UDF converts Kilograms correctly, it should
								   actually be used to convert Newtons since that is what actually changes
								   from planet to planet and not your mass...
	Author: Eric Cornelissen (https://github.com/ericcornelissen)
	Remarks:
	Requirements:
	Link: https://github.com/ericcornelissen/Prewritten-Code-by/tree/master/UDFs/JavaScript/InterstellarScaler

	*** Verison History ***
	[v1.2] - [31.03.2015]
		* The UDF will now parce weights it gets to be floats, if they refuse (value becomes NaN) the UDF
			will return an error.
		* Fixed a bug where your mass on uranus would be negative.

	[v1.1] - [30.03.2015]
		+ Added a special kind of object with this UDF, you can create a object as following: "var myWeight =
			new ISweight(50);" and use that object to calculate what it will weigh on ohter planets.
		+ Added a function to change the amount of decimal places that will be returned by the UDF.
		* Improved the system use to do calculations and get the planets you want from the system.

	[v1.0] - [28.03.2015]
		- First release of the UDF, one public function to convert weight from one planet to another planet.

*/


var _IS_Planets = { Sun: 274.00, Mercury: 3.70, Venus: 8.88, Earth: 9.81, Moon: 1.63, Mars: 3.70, Ceres: 0.20, Jupiter: 24.90, Saturn: 10.50, Uranus: 9.00, Neptune: 11.20, Pluto: 0.77 };
var _IS_basePlanet = _IS_Planets.Earth, _IS_decimalPlaces = 2;


function _IS_setBasePlanet(vPlanet) {
	var newAcc = __IS_getAcc(vPlanet);
	if (newAcc > 0) {
		_IS_basePlanet = newAcc;
	} else {
		console.error('_IS_setBasePlanet; Invalid planet:', 'We do not know the planet you selected...');
	}
}
function _IS_setDecimal(iAmount) {
	if (typeof iAmount == 'number' && iAmount >= 0) {
		_IS_decimalPlaces = Math.round(iAmount);
	} else {
		console.error('_IS_setDecimal; Invalid variable:', 'iAmount should be a number');
	}
}


function _IS_convertWeight(nWeight, vPlanetFrom, vPlanetTo) {
	if (typeof nWeight == 'object') {
		if (nWeight.w != 'undefined' && typeof nWeight.w == 'number') {
			weight = nWeight.w;
		} else {
			console.error('_IS_convertWeight; Invalid variable:', 'invalid object(object should be created with _IS_setBasePlanet())');
			return -1;
		}
	} else {
		weight = nWeight;
	}

	if (typeof weight == "number" && weight >= 0) {
		return __IS_convert(weight, vPlanetFrom, vPlanetTo);
	} else {
		console.error('_IS_convertWeight; Invalid variable:', 'something somewhere went wrong... (but I cant help you any further right now)');
		return -1;
	}
}

function ISweight(nWeight) {
	weight = parseFloat(nWeight);
	if (typeof weight == "number" && weight >= 0) {
		this.w = weight;
		this.success = true;

		this.toSun = function() { return __IS_convert(this.w, _IS_basePlanet, _IS_Planets.Sun); };
		this.toMercury = function() { return __IS_convert(this.w, _IS_basePlanet, _IS_Planets.Mercury); };
		this.toVenus = function() { return __IS_convert(this.w, _IS_basePlanet, _IS_Planets.Venus); };
		this.toEarth = function() { return __IS_convert(this.w, _IS_basePlanet, _IS_Planets.Earth); };
		this.toMoon = function() { return __IS_convert(this.w, _IS_basePlanet, _IS_Planets.Moon); };
		this.toMars = function() { return __IS_convert(this.w, _IS_basePlanet, _IS_Planets.Mars); };
		this.toCeres = function() { return __IS_convert(this.w, _IS_basePlanet, _IS_Planets.Ceres); };
		this.toJupiter = function() { return __IS_convert(this.w, _IS_basePlanet, _IS_Planets.Jupiter); };
		this.toSaturn = function() { return __IS_convert(this.w, _IS_basePlanet, _IS_Planets.Saturn); };
		this.toUranus = function() { return __IS_convert(this.w, _IS_basePlanet, _IS_Planets.Uranus); };
		this.toNeptune = function() { return  __IS_convert(this.w, _IS_basePlanet, _IS_Planets.Neptune); };
		this.toPluto = function() { return  __IS_convert(this.w, _IS_basePlanet, _IS_Planets.Pluto); };
	} else {
		console.error('ISweight; Invalid variable:', 'nWeight should be a number');
		this.success = false;
	}
}


function __IS_convert(nWeight, vPlanetFrom, vPlanetTo) {
	return Math.round((__IS_getAcc(vPlanetTo) / __IS_getAcc(vPlanetFrom)) * nWeight * Math.pow(10, _IS_decimalPlaces)) / Math.pow(10, _IS_decimalPlaces);
}
function __IS_getAcc(vPlanet) {
	if (typeof vPlanet == 'number') {
		return vPlanet;
	} else if (typeof vPlanet == 'undefined') {
		return -1;
	}

	switch (vPlanet.toLowerCase()) {
		case 'sun':
			return _IS_Planets.Sun;
			break;
		case 'mercury':
			return _IS_Planets.Mercury;
			break;
		case 'venus':
			return _IS_Planets.Venus;
			break;
		case 'earth':
			return _IS_Planets.Earth;
			break;
		case 'moon':
			return _IS_Planets.Moon;
			break;
		case 'mars':
			return _IS_Planets.Mars;
			break;
		case 'ceres':
			return _IS_Planets.Ceres;
			break;
		case 'jupiter':
			return _IS_Planets.Jupiter;
			break;
		case 'saturn':
			return _IS_Planets.Saturn;
			break;
		case 'uranus':
			return _IS_Planets.Uranus;
			break;
		case 'neptune':
			return _IS_Planets.Neptune;
			break;
		case 'pluto':
			return _IS_Planets.Pluto;
			break;
		default:
			console.error('unknown planet:', sPlanet);
			break;
	}
}