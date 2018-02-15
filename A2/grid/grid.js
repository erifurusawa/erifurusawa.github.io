// code for sound clock
var img1;
var img2;
var avenues = [];
var streets = [];


function preload(){
	img1 = loadImage('manhattan.png');
	img2 = loadImage('manhattan_white.png')
} 

function setup(){
	createCanvas(500, 1000);
	background('white');
	image(img1, 0, 0, 400, 600);
	frameRate(10);
	stroke(50);
	defStreets();
	defAvenues();
}

function drawAvenue(l, c){
	stroke(30);
	if(c == 0){
		strokeWeight(0.1);
	} else{
		strokeWeight(0.02);
	}

	for (var i = 0; i < l; i++){
		line(avenues[i], 50, avenues[i], 580);
	}
}
function drawStreets(l, c){
	stroke(50);
	if(c == 0){
		strokeWeight(0.05);
	} else{
		strokeWeight(0.02);
	}

	for (var i = 0; i < l; i++){
		line(144, streets[i], 237, streets[i]);
	}
}

function defAvenues(){
	// calculate avenue locations
	ave_west = 156;
	cp_west = 184;
	cp_east = 198;
	ave_east = 237;

	for (var i = 0; i < 4; i ++){
		j = (144 + (184-144) * i/4);
		append(avenues, j);
	}

	for (var i = 0; i < 3; i ++){
		j = 184 + (198-184) * i/3;
		append(avenues, j);
	}

	for (var i = 0; i < 5; i++){
		j = 198 + (237-198) * i/4;
		append(avenues, j);
	};
	console.log(avenues.length);

}

function defStreets(){
	//calculate street locations

	for (var i = 0; i < 300; i ++){
		j = (70 + (581-70) * i/300);
		append(streets, j);
		// console.log(j);
		// console.log(streets.length);
	}
}

function draw(){
	// variables go inside the local function!
	var c = color(221, 50, 50);
	var b = color(197, 171, 137);
	var o = color(178, 177, 165);
	var h = hour();
	var m = minute();
	var s = second();

	// // testing min state
	// var s = 0;
	// var m = 0;
	// var h = 0;

	// //testing max state
	// var s = 59;
	// var m = 59;
	// var h = 23;

	// print(avenues[11])
	if (h % 2 == 0){
		l = h/2;
		drawAvenue(l, 0);
	} else {
		l = (h-1)/2;
		drawAvenue(l, 0);
		drawAvenue(l + 1, 1);
	}

	// draw streets
	secs = m * 60 + s;
	strts_map = floor(map(secs, 0, 3600, 0, 300));
	// console.log(strts_map);

	if (strts_map % 2 == 0){
		strts = strts_map/2;
		drawStreets(strts_map, 0);
		// print(strts);
	} else {
		strts = (strts_map-1)/2;
		drawStreets(strts_map, 0);
		drawStreets(strts_map + 1, 1);
		// print(strts);
	}

	// fill("red");
	// textSize(24);
	// text(mouseY, mouseX, mouseY);

	// white overlay
	image(img2, 0, 0, 400, 600);
}