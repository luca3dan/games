// ***************************************
// Globali
var canvas = document.getElementById("gcanvas");
var canvas2 = document.getElementById("gcanvas2");
var canvas3 = document.getElementById("gcanvas3");
var ctx = canvas.getContext("2d");
var ctx2 = canvas2.getContext("2d");
var ctx3 = canvas3.getContext("2d");
var isPausa = false;
var isStop = false;
var keys = [];
var boundingBox = "";
var cloudsMap = new Map();
var nTotClouds = 0;
// ***************************************
// Immagine di Pausa
const ipsx = 7;
const ipsy = 0;
const ipsWidth = 194;
const ipsHeight = 211;
const ipdWidth = 60;
const ipdHeight = 60;
const ipdx = canvas.width / 2 - ipdWidth / 2;
const ipdy = canvas.height / 2 - ipdHeight / 2;
// ***************************************
// Immagine di Game over
const igosx = 7;
const igosy = 0;
const igosWidth = 194;
const igosHeight = 211;
const igodWidth = 60;
const igodHeight = 60;
const igodx = canvas.width / 2 - igodWidth / 2;
const igody = canvas.height / 2 - igodHeight / 2;
