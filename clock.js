
function setup() {
	createCanvas(480, 480);
}

function draw(){
	background('white');
	fill(255);
	noStroke();

	var h = map(hour(), 0, 24, 5, 100);
	var s = map(second(), 0, 60, 5, 100);
	var m = map(minute(), 0, 60, 5, 100);

	fill(221, 50, 50, h);
	rect(0, 0, 480, 160);

	fill(221, 50, 50, s);
	rect(0, 160, 480, 160);

	fill(221, 50, 50, m);
	rect(0, 320, 480, 160);


}

