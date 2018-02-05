// code for apple clock

function setup(){
	createCanvas(600, 600);
	angleMode(DEGREES);
}

function draw(){
	// variables go inside the local function!
	var c = color(221, 50, 50);
	var b = color(197, 171, 137);
	var o = color(178, 177, 165);
	var h = hour();
	var m = minute();
	var s = second();

	//testing min state
	// var s = 0;
	// var m = 0;
	// var h = 0;

	// //testing max state
	// var s = 60;
	// var m = 60;
	// var h = 24;

	var deg = map (m * 60 + s, 0, 3600, 0, 360);
	var lyr = map(24 - h, 0, 24, 0, 500);
	var inr = map(23 - h, 0, 24, 0, 500)


	background("white");
	// ellipse(300, 300, 200, 200);
	// console.log(deg);

	//draw outline
	stroke(o);
	noFill();
	ellipse(300, 300, 500, 500);

	noStroke();
	// draw leaves
	fill(b);
	rect(295, 5, 8, 290)

	// draw larger arc (bottom)
	fill(c);
	ellipse(300, 300, lyr, lyr);
	// console.log(deg + HALF_PI * 3);
	fill("white");
	arc(300, 300, lyr, lyr, -90, deg - 90 , PIE);

	//draw smaller arc
	fill(c);
	ellipse(300, 300, inr, inr);

}