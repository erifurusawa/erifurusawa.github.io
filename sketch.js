var pg;

function setup() {
	createCanvas(800, 400);
	pg = createGraphics(400, 250)
}

function draw(){
	// background(255);
	fill(0, 12);
	// rect(0, 0, 150, 400, 0);
	fill(0,145,156);
	noStroke();
	ellipse(mouseX, mouseY, 60, 60);


	pg.background(255);
	pg.noFill(255);
	pg.stroke(255);
	pg.ellipse(mouseX, mouseY, 40, 40);
	pg.fill(255);
	pg.text ('Hi', mouseX, mouseY);

	image(pg, 200, 75);
	text ('Hi', mouseX, mouseY, 100);

	fill(246,139,105);
	text(mouseX, 400, 200);
}

