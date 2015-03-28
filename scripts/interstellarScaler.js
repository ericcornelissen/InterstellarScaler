/*	UDF Information:
	
	Name: InterstellarScaler.js
	Description: Convert what something weighs on one planet to what it will weigh on anohter planet.
	Author: Eric Cornelissen (https://github.com/ericcornelissen)
	Remarks:
	Requirements:
	Link: https://github.com/ericcornelissen/Prewritten-Code-by/tree/master/UDFs/JavaScript/InterstellarScaler

	*** Verison History ***
	[v1.0] - [28.03.2015]
		- First release of the UDF, one public function to convert weight from one planet to another planet.

*/

/* Public Variables */
var _IS_Planets =  { Sun: 274.00, Mercury: 3.70, Venus: 8.88, Earth: 9.81, Moon: 1.63, Mars: 3.70, Ceres: 0.20, Jupiter: 24.90, Saturn: 10.50, Uranus: 9.00, Neptune: 11.20, Pluto: 0.77 };
/* End Public Variables */

/* Public Function(s) */
function _IS_convertWeight(fWeight, vPlanetFrom, vPlanetTo) {
	if (typeof vPlanetFrom == "string") { iAccFrom = __IS_stringToAcc(vPlanetFrom); }
	if (typeof vPlanetTo == "string") { iAccTo = __IS_stringToAcc(vPlanetTo); }

	return(Math.round((iAccTo / iAccFrom) * fWeight * 100) / 100);
}
/* End Public Function(s) */

/* Internal Function(s) */
function __IS_stringToAcc(sPlanet) {
	switch (sPlanet.toLowerCase()) {
		case "sun":
			return _IS_Planets.Sun;
			break;
		case "mercury":
			return _IS_Planets.Mercury;
			break;
		case "venus":
			return _IS_Planets.Venus;
			break;
		case "earth":
			return _IS_Planets.Earth;
			break;
		case "moon":
			return _IS_Planets.Moon;
			break;
		case "mars":
			return _IS_Planets.Mars;
			break;
		case "ceres":
			return _IS_Planets.Ceres;
			break;
		case "jupiter":
			return _IS_Planets.Jupiter;
			break;
		case "saturn":
			return _IS_Planets.Saturn;
			break;
		case "uranus":
			return _IS_Planets.Uranus;
			break;
		case "neptune":
			return _IS_Planets.Neptune;
			break;
		case "pluto":
			return _IS_Planets.Pluto;
			break;
		default:
			console.error("unknown planet:", sPlanet);
			break;
	}
}
/* End Internal Function(s) */