//beta.js creates a working prototype for the NYC opendata assignment
var whole;
var occurrences;

function preload(){
	whole = loadTable("whole.csv", "csv", "header");
	occurrences = loadTable("occurrences.csv", "csv", "header");
	// console.log("hi");

}

function setup(){
	createCanvas(750, 750);
	background (255);
	textSize(20);
	noLoop();
	noStroke();
}

function draw(){
	var rows = occurrences.getRows();
	console.log(rows[1,3])
	for (var r = 0; r < rows.length; r++){
		var long = rows[r].getNum("X_COORDINATE");
		var lat = rows[r].getNum("Y_COORDINATE");
		var count = rows[r].getNum("count");
		var resolution = rows[r].getString("resolution")

		var x = map(long, 955000, 1017000, 0, width);
		var y = map(lat, 188000, 270000, height, 0);

		//define size
		var dotradius = map(count, 1, 6, 5, 50);

		// define color
		if(resolution == "Graffiti is intentional"){
			var iro = color(236, 0, 140)
		} else {
			var iro = color(0, 43, 84,30)
		};

		// console.log(iro);
		fill(iro)
		ellipse(x, y, dotradius, dotradius)

		
	}

	// draw legend
	textFont("Impact");
	textSize(24);
	fill(0, 43, 84)
	text("Graffiti Reportings in Manhattan  (02/2017 - 02/2018)", 50, 50);

	textSize(16);
	textAlign(LEFT);
	text("'Intentional' graffiti", 50, 120);
	text("Reported once", 50, 150);
	text("Reported six times", 50,200);

	fill(236, 0, 140);
	ellipse(230, 120 - 5, map(1,1,6,5,50));


	fill(0, 43, 84,30)
	ellipse(230, 150 - 5, map(1, 1, 6, 5, 50));
	ellipse(230, 200 - 5, map(6, 1, 6, 5, 50));

	// console.log("hello")
	// add description
	// textFont("Georgia");
	textSize(12);
	fill(0, 43, 84, 100)
	var description = "'Intentional' graffiti refers to graffiti approved by the building owner, such as signage, murals, etc.";

	text(description, 50, 250, 240, 400)
}











