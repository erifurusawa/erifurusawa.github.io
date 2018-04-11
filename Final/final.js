
var bfs;
var outlines = [];
var zones = [];

function setup(){
	createCanvas(1000, 1000);
	noStroke();
	noLoop();
	getPoly();
	getZone();
}

function preload(){
	bfs = loadJSON("Dissolve3_103.json");
}

function getPoly(){      // this function needs to be under setup()
	for (var i=0 ; i < bfs.features.length; i++){

		var allcoords = bfs.features[i].geometry.coordinates;
		var outlinegroups = [];
		for (var j = 0; j< allcoords.length; j++){
			var vertexes = allcoords[j];
			// console.log(vertexes);
			append(outlinegroups, vertexes);
		}
		append(outlines, outlinegroups);
	}
}

function getZone(){
	for (var i = 0; i < bfs.features.length; i++){
		var zone = bfs.features[i].properties.MAX_PFIRM1;
		// console.log(zone);
		append(zones, zone);
	}
}


function draw(){
	console.log(bfs.features.length);
	console.log(outlines.length);
	console.log(zones.length);

	background(255);

	// DRAW BUILDING FOOTPRINTS
	for (var i = 0; i < outlines.length; i++){

		// DETERMINE COLOR
		push();
		// console.log("hi");
		if (zones[i] == 1){
			fill("red");
		} else {
			fill("black");
		};

		beginShape();
		// console.log(outlines[1][0].length);
		for (var j = 0; j < outlines[i][0].length; j++){
			var point_x = map(outlines[i][0][j][0], 980000, 1000000, 0, 1000);
			var point_y = map(outlines[i][0][j][1], 190000, 210000, 0, 1000);
			vertex(point_x, height - point_y);
		}
		endShape(CLOSE);

		pop();
	}


}


