// code for balloon clock
function drawBalloon(x, d, r, w, clr){
	// l = sqrt(d ** 2 - r ** 2)

	stroke(178, 177, 165);
	strokeWeight(w);
	strokeJoin(ROUND)
	line(x, 400, x, 400 - d + r);
	line(x, 400, x + r - 5, 400 - d);
	line(x, 400, x - r + 5, 400 - d);

	noStroke();
	fill(clr);
	ellipse(x, 400 - d, r * 2, r * 2);
}

var ball_x = [];
var ball_g = [];
var ball_b = [];

function setup(){
	createCanvas(800, 400);
	frameRate(1);
	// angleMode(DEGREES);
	var h  = hour();
	var m = minute();
	var s = second();
	//testing min state
	// var s = 0;
	// var m = 0;
	// var h = 0;

	// //testing max state
	// var s = 59;
	// var m = 59;
	// var h = 23;


	for (var i = 0; i < (24 - h); i ++){
		j = random(50, 750);
		// console.log(j);
		append(ball_x, j);
		append(ball_g, random(155));
		append(ball_b, random(155));
	}
	print(ball_x.length);
}

function draw(){
	// variables go inside the local function!
	var c = color(221, 50, 50);
	var b = color(197, 171, 137);
	var o = color(178, 177, 165);
	var h  = hour();
	var m = minute();
	var s = second();
	// //testing min state
	// var s = 0;
	// var m = 0;
	// var h = 0;

	// //testing max state
	// var s = 59;
	// var m = 59;
	// var h = 23;

	background("white");

	// draw normal balloons
	for (var i = 0; i < (24 - h - 1); i++){
		iro = color(230, ball_g[i], ball_b[i]);
		drawBalloon(ball_x[i], 100, 50, 1, iro);
	}

	// draw floating balloon
	var d = 100 + (1/12) * (m * 60 + s);
	var sw = 1 / (map((m * 60 + s), 0, 360, 0.1, 1));
	fill("yellow");
	drawBalloon(ball_x[(24-h-1)], d, 50, sw, c);
	console.log(ball_x[(23-h)]);
}