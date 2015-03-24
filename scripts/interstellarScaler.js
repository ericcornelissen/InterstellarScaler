/* Gravitational accelerations */

var __IS_acc_Sun = 274.00;
var __IS_acc_Mercury = 3.70;
var __IS_acc_Venus = 8.88;
var __IS_acc_Earth = 9.81;
var __IS_acc_Moon = 1.63;
var __IS_acc_Mars = 3.7;
var __IS_acc_Ceres = 0.20;
var __IS_acc_Jupiter = 24.90;
var __IS_acc_Saturn = 10.50;
var __IS_acc_Uranus = 9.00;
var __IS_acc_Neptune = 11.20;
var __IS_acc_Pluto = 0.77;

/* Public functions */

function _IS_convertWeight(fWeight, iAccOriginal, iAccNew) {
	return(Math.round((iAccNew / iAccOriginal) * fWeight * 100) / 100);
}