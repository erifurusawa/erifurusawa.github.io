//alpha.js creates a working prototype for the NYC opendata assignment, interactive version

var occurrences;
var dots = {};
var days = {};
var state; // weekday > 0, weekend = 0
var dotxy = {};

function preload(){
	dayssum = loadTable("dayssum.csv", "csv", "header");
	occurrences = loadTable("occurrences.csv", "csv", "header");
	// console.log("hi");
}

function setup(){
	loadData();
	frameRate(10);
	createCanvas(750, 750);
	background (255);
	textSize(20);
	noStroke();
	// noLoop();
}

function loadData(){

	// code days object
	var dayofweek = dayssum.getColumn("dow");
	var daycount = dayssum.getColumn("daycount");

	for (var i = 0; i < dayofweek.length; i++){
		days[dayofweek[i]] = [daycount[i]];
		// console.log(daycount[i]);
	}

	// code dots object
	var latlong = occurrences.getColumn("latlong");
	var long = occurrences.getColumn("X_COORDINATE");
	var lat = occurrences.getColumn("Y_COORDINATE");
	var count = occurrences.getColumn("count");
	var dows = occurrences.getColumn("dow");
	var resolution = occurrences.getColumn("resolution");
	var weekday = occurrences.getColumn("weekday")

	for (var i = 0; i < long.length; i++){
		dots[latlong[i]] = [long[i], lat[i], count[i], dows[i], resolution[i], weekday[i]];
	}
	// console.log(dots[lat[1]]);
}



function draw(){
	background(255);
	var location = Object.keys(dots);
	var i = 0;
	// console.log(dots[lat[1]]);
	// draw map /////////////////////////////////////////////////////////
	for (var r = 0; r < location.length; r++){
		// console.log(dots[location[r]][0]);

		var x = map(dots[location[r]][0], 955000, 1017000, 0, width);
		// console.log(x);
		var y = map(dots[location[r]][1], 188000, 270000, height, 0);

		// define dotID if it isn't defined already
		if (!dotxy[location[r]]){
			dotxy[location[r]] = [x, y, dots[location[r]][5]];
		}

		//define shade
		var shade = map(dots[location[r]][2], 1, 6, 40, 100);

		

		// define color
		if(dots[location[r]][5] == 0){
			fill(236, 0, 140, shade);
		} else {
			fill(0, 43, 84, shade);
		};

		// fill("black");
		ellipse(x, y, 4, 4);	

		// define color based on state;
		if (state == 0){
			// console.log(dots[location[r]][5]);
			// draw weekend mode
			if(dots[location[r]][5] == 0){
				fill(236, 0, 140, shade);
			} else {
				fill(255);
				strokeWeight(0.2);
				stroke(240);
			};
			ellipse(x, y, 4, 4, shade);
		};

		if (state > 0){
			// console.log(state);
			if(dots[location[r]][5] > 0){
				fill(0, 43, 84, shade);
			} else {
				fill(255);
				strokeWeight(0.2);
				stroke(240);
			};
			ellipse(x, y, 4, 4, shade);
		};

		if (state == -1){
			noStroke();
			if(dots[location[r]][5] == 0){
			fill(236, 0, 140, shade);
			} else {
			fill(0, 43, 84, shade);
			};
			ellipse(x, y, 4, 4);
		}	
	}
	// draw resolution ////////////////////////////////////////////////
	for (var i = 0; i < location.length; i++){
		var x = map(dots[location[i]][0], 955000, 1017000, 0, width);
		// console.log(x);
		var y = map(dots[location[i]][1], 188000, 270000, height, 0);
		
		if (mouseOnDot(x, y)){
			var descr = dots[location[i]][4];
			if (dots[location[i]][5] == 0){
				fill(236, 0, 140);
			} else {
				fill(0, 43, 84);
			}
			textSize(10);
			text(descr, mouseX + 10, mouseY, 80, 80);
			break;
		};
	}


	// draw bar chart ///////////////////////////////////////////////
	var uniqueday = Object.keys(days);
	var upperX = 50;
	var upperY = 300;
	var bwidth = 15;
	var bmargin = 10;

	var iro = [color(0, 43, 84), color(236, 0, 140)];
	// console.log(iro[0]);

	for (var i = 0; i < uniqueday.length; i ++){
		// console.log(days[uniqueday[i]]);
		// console.log(uniqueday[i]);

		push();
		if (uniqueday[i] == "Saturday" || uniqueday[i] == "Sunday"){
			fill(iro[1]);
		} else {
			fill(iro[0]);
		}
		
		translate(upperX, upperY + i * (bwidth + bmargin));
		// draw rectangles
		var blength = map(days[uniqueday[i]], 0, 700, 0, 300);
		rect(0, 0, blength, bwidth);

		// write number of occurrences
		text(days[uniqueday[i]], blength + 10, bwidth/2 + 3)

		// write day of week
		
		fill(255);
		textSize(10);
		strokeWeight(0.5);
		text(uniqueday[i], 5, bwidth/2 + 3);
	

		// fill(0, 43, 84);
		

		pop();

	}

	// draw legend///////////////////////////////////////////////////
	textFont("Impact");
	textSize(24);
	fill(0, 43, 84)
	text("Graffiti Reportings in Manhattan  (02/2017 - 02/2018)", 50, 50);

	textSize(16);
	textAlign(LEFT);
	text("Reported on a weekend", 50, 120);
	text("Reported on a weekday", 50, 150);
	// text("Reported six times", 50,200);

	fill(236, 0, 140);
	ellipse(230, 120 - 5, map(1,1,6,5,50));


	fill(0, 43, 84);
	ellipse(230, 150 - 5, map(1, 1, 6, 5, 50));
	// ellipse(230, 200 - 5, map(1, 1, 6, 5, 50));

	// add description

	textSize(12);
	fill(0, 43, 84);
	var description = "The darker dots indicate larger numbers of reportings per location. \
	The average number of reportings are higher on weekdays than on weekends.";

	var instruction = "click on dot to isolate weekends / weekdays";

	text(description, 50, 200, 240, 400);
	text(instruction, 50, 600, 240, 400);

}

function mouseOnDot(x, y){
	return((mouseX - x)**2 + (mouseY-y)**2 < 2**2);
}


// return whether state is weekday or weekend
function mousePressed(){
	for (var i in dotxy){
		var x1 = dotxy[i][0];
		var x2 = dotxy[i][1];
		var weekday = dotxy[i][2];
		if (mouseOnDot(x1, x2)){
			state = weekday;
			// console.log(state);
			break;
		} else {
			state = -1;
		}
	}
	return false;
}









